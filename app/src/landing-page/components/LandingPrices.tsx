import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AiFillCheckCircle } from 'react-icons/ai';
import { PaymentPlanId, prettyPaymentPlanName } from '../../payment/plans';
import { cn } from '../../client/cn';
import { useAuth } from 'wasp/client/auth';
import { generateStripeCheckoutSession } from 'wasp/client/operations';
import { z } from 'zod';

const bestDealPaymentPlanId: PaymentPlanId = PaymentPlanId.Lifetime;

interface PaymentPlanCard {
    name: string;
    price: string;
    description: string;
    features: string[];
}

export const paymentPlanCards: Record<PaymentPlanId, PaymentPlanCard> = {
    [PaymentPlanId.Yearly]: {
        name: prettyPaymentPlanName(PaymentPlanId.Yearly),
        price: '$147',
        description: '$247',
        features: ['3 Sites', 'Pre-Built Templates', 'Customizeable Giveaways', 'Email and Social Media Integrations'],
    },
    [PaymentPlanId.Lifetime]: {
        name: prettyPaymentPlanName(PaymentPlanId.Lifetime),
        price: '$447',
        description: '$547',
        features: ['Unlimited Sites', 'Pre-Built Templates', 'Customizeable Giveaways', 'Email and Social Media Integrations', 'Lifetime Updates', 'Lifetime Support', 'One-Time Payment'],
    },
};

export default function LandingPrices() {
    const [isStripePaymentLoading, setIsStripePaymentLoading] = useState<boolean | string>(false);
    const { data: user, isLoading: isUserLoading } = useAuth();
    const history = useHistory();

    async function handleBuyNowClick(paymentPlanId: PaymentPlanId) {
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
        <div id="pricing-section" className="bg-rl_price md:bg-contain bg-center relative overflow-hidden mt-48">
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="mt-2 text-3xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
                        Pricing
                    </p>
                </div>
                <div className="mx-auto max-w-3xl w-full grid grid-cols-1 gap-y-8 lg:grid-cols-2 mt-20 lg:mt-24">
                    {Object.values(PaymentPlanId).map((planId) => (
                        <div
                            key={planId}
                            className={cn(
                                'relative flex flex-col grow justify-between rounded-xl bg-white overflow-hidden border-2 border-gray-600 shadow-xl',
                                {
                                    '': planId === bestDealPaymentPlanId,
                                    'border-r-0 lg:my-20': planId !== bestDealPaymentPlanId,
                                }
                            )}
                        >
                            {/* Name Section */}
                            <div
                                className={cn(
                                    'flex items-center justify-center py-6 border-b-2 border-slate-200',
                                    {
                                        'bg-raffleleader text-white': planId === bestDealPaymentPlanId,
                                    }
                                )}
                            >
                                <h3 id={planId} className="text-2xl font-black leading-8 dark:text-white">
                                    {paymentPlanCards[planId].name}
                                </h3>
                            </div>

                            {/* Content Section */}
                            <div className="p-8 xl:p-10 flex-grow flex flex-col">
                                {/* Pricing Section */}
                                <p className="font-bold mt-4 text-1xl text-gray-500 text-center dark:text-gray-300">
                                <s>{paymentPlanCards[planId].description}</s>
                                <span className="text-sm font-bold leading-6 text-gray-500 dark:text-gray-400">
                                    {paymentPlanCards[planId].name !== 'LIFETIME' && '/yr'}
                                </span>
                                </p>
                                <p className="mt-4 text-3xl text-gray-600 text-center dark:text-gray-300">
                                <span className="text-4xl font-overpass font-black tracking-tight text-raffleleader">
                                    {paymentPlanCards[planId].price}
                                </span>
                                <span className="text-sm font-black leading-6 text-gray-900 dark:text-gray-400">
                                    {paymentPlanCards[planId].name !== 'LIFETIME' && '/yr'}
                                </span>
                                </p>

                                {/* "FOR LIFE!" for the best plan */}
                                {planId === bestDealPaymentPlanId && (
                                <p className="text-xl font-black text-center text-black">
                                    FOR LIFE!
                                </p>
                                )}

                                {/* Features Section */}
                                <ul
                                role="list"
                                className={cn(
                                    'mt-8 text-sm leading-6 text-gray-600 font-bold',
                                    {
                                    'space-y-5': planId === bestDealPaymentPlanId,
                                    'space-y-3': planId !== bestDealPaymentPlanId,
                                    }
                                )}
                                >
                                {paymentPlanCards[planId].features.map((feature) => (
                                    <li key={feature} className="flex gap-x-3">
                                    <AiFillCheckCircle className="h-6 w-5 flex-none text-raffleleader" aria-hidden="true" />
                                    {feature}
                                    </li>
                                ))}
                                </ul>

                                {/* Button Section */}
                                {!!user && !!user.subscriptionStatus ? (
                                    <button
                                        onClick={handleCustomerPortalClick}
                                        className={cn(
                                            'mt-8 block rounded-md py-3 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-raffleleader transition-colors duration-200',
                                            planId === bestDealPaymentPlanId
                                                ? 'bg-raffleleader text-white hover:bg-white/90 hover:text-raffleleader hover:border-2 hover:border-raffleleader'
                                                : 'bg-white text-raffleleader hover:bg-gray-200 border border-raffleleader'
                                        )}
                                    >
                                        Manage Subscription
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleBuyNowClick(planId)}
                                        className={cn(
                                            'mt-8 block rounded-md py-3 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-raffleleader transition-colors duration-200',
                                            planId === bestDealPaymentPlanId
                                                ? 'bg-raffleleader text-white hover:bg-white/90 hover:text-raffleleader hover:border-2 hover:border-raffleleader'
                                                : 'bg-white text-raffleleader hover:bg-gray-200 border border-raffleleader',
                                            {
                                                'opacity-50 cursor-wait cursor-not-allowed': isStripePaymentLoading === planId,
                                            }
                                        )}
                                        disabled={isStripePaymentLoading === planId}
                                    >
                                        {isStripePaymentLoading === planId ? 'Processing...' : 'Get Raffle Leader'}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}