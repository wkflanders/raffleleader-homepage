import { type GenerateStripeCheckoutSession } from 'wasp/server/operations';
import { HttpError } from 'wasp/server';
import { PaymentPlanId, paymentPlans, type PaymentPlanEffect } from '../payment/plans';
import { fetchStripeCustomer, createStripeCheckoutSession, type StripeMode } from './stripe/checkoutUtils';
import Stripe from 'stripe';

export type StripeCheckoutSession = {
  sessionUrl: string | null;
  sessionId: string;
};

export const generateStripeCheckoutSession: GenerateStripeCheckoutSession<
  PaymentPlanId,
  StripeCheckoutSession
> = async (paymentPlanId, context) => {
  const paymentPlan = paymentPlans[paymentPlanId];

  let stripeCustomerId: string | undefined;
  if(context.user) {
    const user = await context.entities.User.findUnique({
      where: {
        id: context.user.id,
      },
    });
    if(user){
      if(user.stripeId){
        stripeCustomerId = user.stripeId;
      } else {
        const stripeCustomer = await fetchStripeCustomer(user.email);
        stripeCustomerId = stripeCustomer.id;

        await context.entities.User.update({
          where: {
            id: context.user.id,
          },
          data: {
            stripeId: stripeCustomerId,
          }
        });
        }
      } else {
        throw new HttpError(500, 'User not found');
      }
    }
  let session: Stripe.Checkout.Session;
  try{
    session = await createStripeCheckoutSession({
      priceId: paymentPlan.getStripePriceId(),
      mode: paymentPlanEffectToStripeMode(paymentPlan.effect),
      customerId: stripeCustomerId || undefined,
    });
  } catch (error: any){
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || 'Internal server error';
    console.log(errorMessage);
    throw new HttpError(statusCode, errorMessage)
  }

  return {
    sessionUrl: session.url,
    sessionId: session.id,
  };
};

function paymentPlanEffectToStripeMode(planEffect: PaymentPlanEffect): StripeMode {
  const effectToMode: Record<PaymentPlanEffect['kind'], StripeMode> = {
    subscription: 'subscription',
  };
  return effectToMode[planEffect.kind];
}
