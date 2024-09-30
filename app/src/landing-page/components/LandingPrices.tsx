import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AiFillCheckCircle } from 'react-icons/ai';
import { PaymentPlanId, prettyPaymentPlanName } from '../../payment/plans';
import { cn } from '../../client/cn';
import { useAuth } from 'wasp/client/auth';
import { generateStripeCheckoutSession, getCouponData } from 'wasp/client/operations';
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
        price: '$157',
        description: '$257',
        features: ['3 Sites', 'Pre-Built Templates', 'Customizeable Giveaways', 'Email and Social Media Integrations'],
    },
    [PaymentPlanId.Lifetime]: {
        name: prettyPaymentPlanName(PaymentPlanId.Lifetime),
        price: '$457',
        description: '$557',
        features: ['Unlimited Sites', 'Pre-Built Templates', 'Customizeable Giveaways', 'Email and Social Media Integrations', 'Lifetime Updates', 'Lifetime Support', 'One-Time Payment'],
    },
};

export default function LandingPrices() {
    const [isStripePaymentLoading, setIsStripePaymentLoading] = useState<boolean | string>(false);
    const { data: user, isLoading: isUserLoading } = useAuth();
    const history = useHistory();
    const [redemptionsLeft, setRedemptionsLeft] = useState<number | null>(null);

    useEffect(() => {
        fetchCouponData();
    }, []);
    
    const fetchCouponData = async () => {
        try {
            const couponData = await getCouponData({ planId: PaymentPlanId.Yearly });
            if (couponData?.max_redemptions != null && couponData?.times_redeemed != null) {
                const remainingRedemptions = couponData.max_redemptions - couponData.times_redeemed;
                setRedemptionsLeft(remainingRedemptions);
            }
        } catch (error) {
            console.error('Error fetching coupon data:', error);
            setRedemptionsLeft(null); // Reset in case of error
        }
    };
    
    useEffect(() => {
    }, [redemptionsLeft]);

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
        <div id="pricing-section" className="lg:bg-rl_price lg:bg-contain bg-center relative overflow-hidden mt-16 lg:mt-48">
            <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8 lg:py-16">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="font-overpass mt-2 text-3xl lg:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        Pricing
                    </p>
                    <p className="font-overpass mt-6 text-base lg:text-lg font-semibold text-gray-800 dark:text-gray-300">
                        {/* Store icon with color oscillation effect */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor" // Use currentColor here
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="inline w-6 h-6 mr-2 text-raffleleader animate-bounce"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                            />
                        </svg>
                        <span className="text-raffleleader">$100 off</span> for the first 100 customers ({redemptionsLeft} left)
                    </p>
                </div>
                <div className="mx-auto max-w-3xl w-full grid grid-cols-1 gap-y-8 lg:grid-cols-2 mt-12 lg:mt-20 lg:mt-24">
                    {Object.values(PaymentPlanId).map((planId) => (
                        <div
                            key={planId}
                            className={cn(
                                'relative flex flex-col grow justify-between rounded-xl bg-white overflow-hidden border-2 border-gray-600 shadow-xl',
                                {
                                    '': planId === bestDealPaymentPlanId,
                                    'lg:border-r-0 lg:my-20': planId !== bestDealPaymentPlanId,
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
                                            'mt-8 block rounded-lg py-3 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-raffleleader transition-colors duration-200',
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
                                            'mt-8 block rounded-lg py-3 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-raffleleader transition-colors duration-200',
                                            planId === bestDealPaymentPlanId
                                                ? 'bg-raffleleader border border-raffleleader text-white hover:bg-white/90 hover:text-raffleleader hover:border-raffleleader'
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