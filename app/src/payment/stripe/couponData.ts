import { stripe } from './stripeClient';
import { HttpError } from 'wasp/server';
import { requireNodeEnvVar } from '../../server/utils';

const PLAN_TO_COUPON_MAP: Record<string, () => string> = {
    'yearly': () => requireNodeEnvVar('STRIPE_FIRST_100_COUPON_CODE_ID')
};

interface GetCouponDataArgs {
    planId: string; 
}

export const getCouponData = async ({ planId }: GetCouponDataArgs) => {
    try {
        const couponId = PLAN_TO_COUPON_MAP[planId]?.();
        if (!couponId) {
            throw new Error('Invalid plan ID');
        }

        const coupon = await stripe.coupons.retrieve(couponId);

        return {
            max_redemptions: coupon.max_redemptions,
            times_redeemed: coupon.times_redeemed
        };

    } catch (error) {
        console.error('Error fetching coupon data:', error);
        throw new HttpError(400, 'Failed to fetch coupon data');
    }
}