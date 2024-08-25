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
}: {
  priceId: string;
  mode: StripeMode;
  customerId?: string;
}) {
  try {
    return await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: mode,
      success_url: `${DOMAIN}/checkout?success=true`,
      cancel_url: `${DOMAIN}/checkout?canceled=true`,
      automatic_tax: { enabled: true },
      customer: customerId,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
