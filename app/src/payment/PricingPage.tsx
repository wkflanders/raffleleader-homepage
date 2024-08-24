import { useAuth } from 'wasp/client/auth';
import { generateStripeCheckoutSession } from 'wasp/client/operations';
import { PaymentPlanId, paymentPlans, prettyPaymentPlanName } from './plans';
import { AiFillCheckCircle } from 'react-icons/ai';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { cn } from '../client/cn';
import { z } from 'zod';

const bestDealPaymentPlanId: PaymentPlanId = PaymentPlanId.Lifetime;

interface PaymentPlanCard {
  name: string;
  price: string;
  description: string;
  features: string[];
};

export const paymentPlanCards: Record<PaymentPlanId, PaymentPlanCard> = {
  [PaymentPlanId.Yearly]: {
    name: prettyPaymentPlanName(PaymentPlanId.Yearly),
    price: '$97',
    description: '$197',
    features: ['Unlimited Sites', 'Pre-Built Templates', 'Customizeable Giveaways', 'Email and Social Media Integrations', '14-day Money-Back Guarantee'],
  },
  [PaymentPlanId.Lifetime]: {
    name: prettyPaymentPlanName(PaymentPlanId.Lifetime),
    price: '$397',
    description: '$497',
    features: ['Unlimited Sites', 'Lifetime Updates', 'Lifetime Support', 'One-Time Payment', 'No Raffle Leader Branding'],
  },
};

const PricingPage = () => {
  const [isStripePaymentLoading, setIsStripePaymentLoading] = useState<boolean | string>(false);

  const { data: user, isLoading: isUserLoading } = useAuth();

  const history = useHistory();

  async function handleBuyNowClick(paymentPlanId: PaymentPlanId) {
    if (!user) {
      history.push('/login');
      return;
    }
    try {
      setIsStripePaymentLoading(paymentPlanId);
      let stripeResults = await generateStripeCheckoutSession(paymentPlanId);

      if (stripeResults?.sessionUrl) {
        window.open(stripeResults.sessionUrl, '_self');
      }
    } catch (error: any) {
      console.error(error?.message ?? 'Something went wrong.');
    } finally {
      setIsStripePaymentLoading(false);
    }
  }

  const handleCustomerPortalClick = () => {
    if (!user) {
      history.push('/login');
      return;
    }
    try {
      const schema = z.string().url();
      const customerPortalUrl = schema.parse(import.meta.env.REACT_APP_STRIPE_CUSTOMER_PORTAL);
      window.open(customerPortalUrl, '_blank');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div id='pricing' className='mx-auto max-w-4xl text-center'>
          <h2 className='mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white'>
            Get <span className='text-raffleleader'>Raffle Leader</span> Now
          </h2>
        </div>
        <p className='mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600 dark:text-white'>
          Stripe subscriptions and secure webhooks are built-in. Just add your Stripe Product IDs! Try it out below with
          test credit card number{' '}
          <span className='px-2 py-1 bg-gray-100 rounded-md text-gray-500'>4242 4242 4242 4242 4242</span>
        </p>
        <div className='isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 lg:gap-x-8 sm:mt-10 lg:mx-0 lg:max-w-none lg:grid-cols-2'>
          {Object.values(PaymentPlanId).map((planId) => (
            <div
              key={planId}
              className={cn(
                'relative flex flex-col grow justify-between rounded-3xl ring-gray-900/10 dark:ring-gray-100/10 overflow-hidden p-8 xl:p-10 border-slate-700 border-2',
                {
                  'ring-2': planId === bestDealPaymentPlanId,
                  'ring-1 lg:mt-8': planId !== bestDealPaymentPlanId,
                }
              )}
            >
              {planId === bestDealPaymentPlanId && (
                <div className='absolute top-0 right-0 -z-10 w-full h-full transform-gpu blur-3xl' aria-hidden='true'>
                  <div
                    className='absolute w-full h-full bg-gradient-to-b from-raffleleader to-violet-400 opacity-15'
                    style={{
                      clipPath: 'circle(670% at 50% 50%)',
                    }}
                  />
                </div>
              )}
              <div className='mb-8'>
                <div className='flex items-center justify-between gap-x-4'>
                  <h3 id={planId} className='text-center text-gray-900 text-2xl font-semibold leading-8 dark:text-white'>
                    {paymentPlanCards[planId].name}
                  </h3>
                </div>
                <p className='font-bold mt-4 text-3xl text-gray-600 dark:text-white'>
                    <s>{paymentPlanCards[planId].description}</s>
                    <span className='text-sm font-semibold leading-6 text-gray-600 dark:text-white'>
                        {paymentPlanCards[planId].name != 'LIFETIME' && '/yr'}
                    </span>
                </p>
                <p className='mt-6 flex items-baseline gap-x-1 dark:text-white'>
                  <span className='text-4xl font-bold tracking-tight text-gray-900 dark:text-white'>
                    {paymentPlanCards[planId].price}
                  </span>
                  <span className='text-sm font-semibold leading-6 text-gray-600 dark:text-white'>
                    {paymentPlanCards[planId].name != PaymentPlanId.Yearly && '/yr'}
                  </span>
                </p>
                <ul role='list' className='mt-8 space-y-3 text-sm leading-6 text-gray-600 dark:text-white'>
                  {paymentPlanCards[planId].features.map((feature) => (
                    <li key={feature} className='flex gap-x-3'>
                      <AiFillCheckCircle className='h-6 w-5 flex-none text-raffleleader' aria-hidden='true' />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              {!!user && !!user.subscriptionStatus ? (
                <button
                  onClick={handleCustomerPortalClick}
                  aria-describedby='manage-subscription'
                  className={cn(
                    'mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-yellow-400',
                    {
                      'bg-raffleleader text-white hover:text-white shadow-sm hover:bg-raffleleader':
                        planId === bestDealPaymentPlanId,
                      'text-gray-600 ring-1 ring-inset ring-raffleleader hover:ring-raffleleader':
                        planId !== bestDealPaymentPlanId,
                    }
                  )}
                >
                  Manage Subscription
                </button>
              ) : (
                <button
                  onClick={() => handleBuyNowClick(planId)}
                  aria-describedby={planId}
                  className={cn(
                    {
                      'bg-raffleleader text-white hover:text-white shadow-sm hover:bg-raffleleader':
                        planId === bestDealPaymentPlanId,
                      'text-gray-600  ring-1 ring-inset ring-raffleleader hover:text-white hover:bg-raffleleader':
                        planId !== bestDealPaymentPlanId,
                    },
                    {
                      'opacity-50 cursor-wait cursor-not-allowed': isStripePaymentLoading === planId,
                    },
                    'mt-8 block rounded-md py-2 px-3 text-center text-sm dark:text-white font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-raffleleader'
                  )}
                >
                  Get Now
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
