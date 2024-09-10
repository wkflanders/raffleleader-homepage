import { stripe } from './stripeClient';
import { HttpError } from 'wasp/server';
import { requireNodeEnvVar } from '../../server/utils';

const PLAN_TO_COUPON_MAP = {
    'yearly': () => requireNodeEnvVar('STRIPE_FIRST_100_COUPON_CODE_ID')
}

export const getCouponData = async ({ planId }) => {
    try {
        const couponId = PLAN_TO_COUPON_MAP[planId]?.();
        if (!couponId) {
            throw new Error('Invalid plan ID');
        }

        const coupon = await stripe.coupons.retrieve(couponId);
        console.log(coupon);
        return {
            max_redemptions: coupon.max_redemptions,
            times_redeemed: coupon.times_redeemed
        };

    } catch (error) {
        console.error('Error fetching coupon data:', error);
        throw new HttpError(400, 'Failed to fetch coupon data');
    }
}