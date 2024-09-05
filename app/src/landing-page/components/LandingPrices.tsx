import React, { useState, useRef } from 'react';
import { useAuth } from 'wasp/client/auth';
import { PaymentPlanId, paymentPlans, prettyPaymentPlanName } from '../../payment/plans';
import { AiFillCheckCircle } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { cn } from '../../client/cn';

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

export default function LandingPrices() {

    const history = useHistory();

    async function handleLandingPriceClick() {
        history.push('/pricing');
        return;
    }

    return (
        <div className='mx-auto max-w-5xl w-75 lg:w-full sm:px-6 lg:px-8 mt-60 grid grid-cols-1 gap-y-8 lg:gap-x-8 lg:grid-cols-2'>
            {Object.values(PaymentPlanId).map((planId) => (
                <div
                    key={planId}
                    className={cn(
                        'relative flex flex-col grow justify-between rounded-3xl ring-gray-900/10 dark:ring-gray-100/10 overflow-hidden p-8 xl:p-10  border-slate-700 border-2',
                        {
                            'ring-2': planId === bestDealPaymentPlanId,
                            'ring-1 lg:my-6': planId !== bestDealPaymentPlanId,
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
                        <p className='font-bold mt-4 text-3xl text-gray-600 dark:text-white'>
                            <span className='text-4xl font-bold tracking-tight text-gray-900 dark:text-white'>
                                {paymentPlanCards[planId].price}
                            </span>
                            <span className='text-sm font-semibold leading-6 text-gray-600 dark:text-white'>
                                {paymentPlanCards[planId].name != 'LIFETIME' && '/yr'}
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
                    {(
                        <button
                            onClick={() => handleLandingPriceClick()}
                            aria-describedby={planId}
                            className={cn(
                                {
                                    'bg-raffleleader text-white hover:text-white shadow-sm hover:bg-raffleleader':
                                        planId === bestDealPaymentPlanId,
                                    'text-gray-600  ring-1 ring-inset ring-raffleleader hover:text-white hover:bg-raffleleader':
                                        planId !== bestDealPaymentPlanId,
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
    );
}
