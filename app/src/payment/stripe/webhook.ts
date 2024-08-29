import { type MiddlewareConfigFn, HttpError } from 'wasp/server';
import { type StripeWebhook } from 'wasp/server/api';
import { PrismaClient } from '@prisma/client';
import {
  findAuthIdentity,
  createProviderId,
  sanitizeAndSerializeProviderData,
  createUser,
} from 'wasp/server/auth'
import crypto from 'crypto';
import express from 'express';
import { Stripe } from 'stripe';
import { stripe } from './stripeClient';
import { paymentPlans, PaymentPlanId, SubscriptionStatus } from '../plans';
import { updateUserStripePaymentDetails } from './paymentDetails';
import { emailSender } from 'wasp/server/email';
import { assertUnreachable } from '../../shared/utils';
import { requireNodeEnvVar } from '../../server/utils';
import { z } from 'zod';

export const stripeWebhook: StripeWebhook = async (request, response, context) => {
  const secret = requireNodeEnvVar('STRIPE_WEBHOOK_SECRET');
  const sig = request.headers['stripe-signature'];
  if (!sig) {
    throw new HttpError(405, 'Stripe Webhook Signature Not Provided');
  }
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, secret);
  } catch (err) {
    throw new HttpError(403, 'Error Constructing Stripe Webhook Event');
  }
  const prismaUserDelegate = context.entities.User;
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutSessionCompleted(session, prismaUserDelegate);
      break;
    case 'invoice.paid':
      const invoice = event.data.object as Stripe.Invoice;
      await handleInvoicePaid(invoice, prismaUserDelegate);
      break;
    case 'customer.subscription.updated':
      const updatedSubscription = event.data.object as Stripe.Subscription;
      await handleCustomerSubscriptionUpdated(updatedSubscription, prismaUserDelegate);
      break;
    case 'customer.subscription.deleted':
      const deletedSubscription = event.data.object as Stripe.Subscription;
      await handleCustomerSubscriptionDeleted(deletedSubscription, prismaUserDelegate);
      break;
    default:
      // If you'd like to handle more events, you can add more cases above.
      // When deploying your app, you configure your webhook in the Stripe dashboard to only send the events that you're
      // handling above and that are necessary for the functioning of your app. See: https://docs.opensaas.sh/guides/deploying/#setting-up-your-stripe-webhook 
      // In development, it is likely that you will receive other events that you are not handling, and that's fine. These can be ignored without any issues.
      console.error('Unhandled event type: ', event.type);
  }
  response.json({ received: true }); // Stripe expects a 200 response to acknowledge receipt of the webhook
};

// This allows us to override Wasp's defaults and parse the raw body of the request from Stripe to verify the signature
export const stripeMiddlewareFn: MiddlewareConfigFn = (middlewareConfig) => {
  middlewareConfig.delete('express.json');
  middlewareConfig.set('express.raw', express.raw({ type: 'application/json' }));
  return middlewareConfig;
};

const LineItemsPriceSchema = z.object({
  data: z.array(
    z.object({
      price: z.object({
        id: z.string(),
      }),
    })
  ),
});

export async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
  prismaUserDelegate: PrismaClient["user"]
) {
  let userStripeId = validateUserStripeIdOrThrow(session.customer);
  
  const customerEmail = session.customer_details?.email;
  if (!customerEmail){
    throw new HttpError(412, 'No customer email found in session');
  }

  const customerFirstName = session.customer_details?.name;
  if (!customerFirstName){
    throw new HttpError(412, 'No customer name found in session');
  }

  const { line_items } = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ['line_items'],
  });
  const result = LineItemsPriceSchema.safeParse(line_items);
  if (!result.success) {
    throw new HttpError(406, 'No price id in line item');
  }
  if (result.data.data.length > 1) {
    throw new HttpError(410, 'More than one line item in session');
  }
  const lineItemPriceId =  result.data.data[0].price.id;

  const planId = Object.values(PaymentPlanId).find(
    (planId) => paymentPlans[planId].getStripePriceId() === lineItemPriceId
  );
  if (!planId) {
    throw new Error(`No plan with stripe price id ${lineItemPriceId}`);
  }
  const plan = paymentPlans[planId];

  let subscriptionPlan: PaymentPlanId;
  switch (plan.effect.kind) {
    case 'subscription':
      subscriptionPlan = planId;
      break;
    case 'payment':
      subscriptionPlan = planId;
      break;
  }

  const user = await handleGuessStripeSignup({
    email: customerEmail,
    customerName: customerFirstName,
    stripeCustomerId: userStripeId,
    prismaUserDelegate
  });

  if(!user.stripeId){
    throw new HttpError(500, 'Missing stripe id link in fetched customer');
  }

  userStripeId = user.stripeId;

  return updateUserStripePaymentDetails(
    { userStripeId, subscriptionPlan, datePaid: new Date() },
    prismaUserDelegate
  );
}

export async function handleInvoicePaid(invoice: Stripe.Invoice, prismaUserDelegate: PrismaClient["user"]) {
  const userStripeId = validateUserStripeIdOrThrow(invoice.customer);
  const datePaid = new Date(invoice.period_start * 1000);
  return updateUserStripePaymentDetails({ userStripeId, datePaid }, prismaUserDelegate);
}

export async function handleCustomerSubscriptionUpdated(
  subscription: Stripe.Subscription,
  prismaUserDelegate: PrismaClient["user"]
) {
  const userStripeId = validateUserStripeIdOrThrow(subscription.customer);
  let subscriptionStatus: SubscriptionStatus | undefined;

  // There are other subscription statuses, such as `trialing` that we are not handling and simply ignore
  // If you'd like to handle more statuses, you can add more cases above. Make sure to update the `SubscriptionStatus` type in `payment/plans.ts` as well
  if (subscription.status === 'active') {
    subscriptionStatus = subscription.cancel_at_period_end ? 'cancel_at_period_end' : 'active';
  } else if (subscription.status === 'past_due') {
    subscriptionStatus = 'past_due';
  } 
  if (subscriptionStatus) {
    const user = await updateUserStripePaymentDetails({ userStripeId, subscriptionStatus }, prismaUserDelegate);
    if (subscription.cancel_at_period_end) {
      if (user.email) {
        // await emailSender.send({
        //   to: user.email,
        //   subject: 'We hate to see you go :(',
        //   text: 'We hate to see you go. Here is a sweet offer...',
        //   html: 'We hate to see you go. Here is a sweet offer...',
        // });
      }
    }
    return user;
  }
}

export async function handleCustomerSubscriptionDeleted(
  subscription: Stripe.Subscription,
  prismaUserDelegate: PrismaClient["user"]
) {
  const userStripeId = validateUserStripeIdOrThrow(subscription.customer);
  return updateUserStripePaymentDetails({ userStripeId, subscriptionStatus: 'deleted' }, prismaUserDelegate);
}

function validateUserStripeIdOrThrow(userStripeId: Stripe.Checkout.Session['customer']): string {
  if (!userStripeId) throw new HttpError(400, 'No customer id');
  if (typeof userStripeId !== 'string') throw new HttpError(400, 'Customer id is not a string');
  return userStripeId;
}

export async function handleGuessStripeSignup({
  email,
  customerName,
  stripeCustomerId,
}: {
  email: string;
  customerName: string;
  stripeCustomerId: string;
  prismaUserDelegate: PrismaClient['user'];
}) {
  const prisma = new PrismaClient();
  try{

    const providerId = createProviderId('email', email);
    const existingAuthIdentity = await findAuthIdentity(providerId);

    if (existingAuthIdentity) {
      const authProfile = await prisma.auth.findUnique({
        where: { id: existingAuthIdentity.authId }
      });
  
      if (!authProfile) {
        throw new Error('Auth profile not found');
      }
  
      // Directly access userId assuming it must exist.
      const user = await prisma.user.findUnique({
        where: { id: authProfile.userId as string }
      });
  
      if (!user) {
        throw new Error('User not found');
      }
  
      return user;
    }

    const password = crypto.randomBytes(8).toString('hex');

    const user = await prisma.$transaction(async (prisma) => {
      const newUserData = await sanitizeAndSerializeProviderData<'email'>({
        hashedPassword: password,
        isEmailVerified: true,
        emailVerificationSentAt: null,
        passwordResetSentAt: null,
      });

      const user = await createUser(
        providerId,
        newUserData,
        {},
      );

      return await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          stripeId: stripeCustomerId,
          email: email,
          username: customerName,
        }
      })
    });

    try {
      await emailSender.send({
        from: {
          name: "Raffle Leader",
          email: "noreply.raffleleader@gmail.com",
        },
        to: email,
        subject: "Welcome to Raffle Leader!",
        text: `Welcome to Raffle Leader! Congratulations, you now have access to the best giveaway and contest plugin on WordPress!`,
        html: `
             <!DOCTYPE html>
            <html>
            <head>
            <style>
                body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
                .email-wrapper { max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc; }
                .header { background-color: #1501FE; padding: 10px; }
                .footer { background-color: #f3f3f3; padding: 10px; text-align: center; font-size: 12px; }
            </style>
            </head>
            <body>
            <div class="email-wrapper">
                <div class="header">
                    <img src="https://raffleleader.s3.us-east-2.amazonaws.com/BANNER-LOGO.png" alt="Raffle Leader Logo" title="Raffle Leader Logo" style="width: 100%;">
                </div>
                <br></br>
                <p>Welcome to Raffle Leader, ${customerName}!</p>
                <br></br>
                <p>Congratulations, you now have access to the best giveaway and contest plugin on WordPress.</p>
                <br></br>
                <p>Here is your login information:
                <br></br>
                <br></br>
                <p>Email: <strong>${email}</strong></p>
                <p>Password: <strong>${password}</strong></p>
                <br></br>
                <p>To change your password after logging in for the first time, <a href="https://raffleleader.com/reset-password/">go here</a>.</p>
                <br></br>
                <p>For additional information on how to install and use the plugin, <a href="https://raffleleader.com/documentation/">visit our docuemntation page</a>.
                <br></br>
                <p>If you have any questions or concerns, please contact us at stephen@raffleleader.com</p>
                <div class="footer">
                    <p>Thank you for joining Raffle Leader!</p>
                    <p>Follow us on <a href="https://x.com/RaffleLeader">Twitter</a> | <a href="https://www.instagram.com/raffleleader/">Instagram</a></p>
                    <p>&copy; 2024 Raffle Leader. All rights reserved.</p>
                </div>
            </div>
            </body>
            </html>
        `,
      });
    } catch (error) {
      throw new HttpError(500, 'Failed to send Stripe signup email');
    }
    return user;

  } catch (error: any) {
    throw new HttpError(500, 'Error creating user with Stripe details:', error);
  }
}