import Stripe from 'stripe';
import { stripe } from './stripeClient';
import { HttpError } from 'wasp/server'

// WASP_WEB_CLIENT_URL will be set up by Wasp when deploying to production: https://wasp-lang.dev/docs/deploying
const DOMAIN = process.env.WASP_WEB_CLIENT_URL || 'http://localhost:3000';

export async function fetchStripeCustomer(customerEmail: string | undefined | null) {
  if(!customerEmail){
    throw new HttpError(500, 'Email is required to fetch or create a Stripe customer');
  }
  
  let customer: Stripe.Customer;
  try {
    const stripeCustomers = await stripe.customers.list({
      email: customerEmail,
    });
    if (!stripeCustomers.data.length) {
      console.log('creating customer');
      customer = await stripe.customers.create({
        email: customerEmail,
      });
    } else {
      console.log('using existing customer');
      customer = stripeCustomers.data[0];
    }
    return customer;
  } catch (error) {
    console.log(error);
    throw new HttpError(500, 'Error fetching or creating Stripe customer');
  }
}

export type StripeMode = 'subscription' | 'payment';

export async function createStripeCheckoutSession({
  priceId,
  mode,
  customerId,
  couponId,
}: {
  priceId: string;
  mode: StripeMode;
  customerId?: string;
  couponId?: string;
}) {
  try {
    // Setup options for the checkout session
    const sessionOptions: Stripe.Checkout.SessionCreateParams = {
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      mode: mode,
      success_url: `${DOMAIN}/checkout?success=true`,
      cancel_url: `${DOMAIN}/checkout?canceled=true`,
      automatic_tax: { enabled: true },
    };

    if (couponId){
      sessionOptions.discounts = [{ promotion_code: couponId }]
    }

    // If customerId is not provided, set customer_creation to 'always' to ensure a customer is created
    if (!customerId && mode === 'payment') {
      sessionOptions.customer_creation = 'always';
    } else {
      sessionOptions.customer = customerId;
    }

    return await stripe.checkout.sessions.create(sessionOptions);
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    throw error;
  }
}
