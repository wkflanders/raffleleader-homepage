import { requireNodeEnvVar } from '../server/utils';

export type SubscriptionStatus = 'past_due' | 'cancel_at_period_end' | 'active' | 'deleted';

export enum PaymentPlanId {
  Yearly = 'yearly',
  Lifetime = 'lifetime',
}

export interface PaymentPlan {
  getStripePriceId: () => string;
  effect: PaymentPlanEffect;
  coupon?: CouponCode
}

export type PaymentPlanEffect = { kind: 'subscription' | 'payment' };

export interface CouponCode {
  code: string;
  stripePromotionCodeId: () => string;
  discountAmount: number;
  currency: string;
  maxRedemptions: number;
}

const FIRST100: CouponCode = {
  code: 'FIRST100',
  stripePromotionCodeId: () => requireNodeEnvVar('STRIPE_FIRST_100_PROMO_CODE_ID'),
  discountAmount: 89,
  currency: 'usd',
  maxRedemptions: 100,
}

export const paymentPlans: Record<PaymentPlanId, PaymentPlan> = {
  [PaymentPlanId.Yearly]: {
    getStripePriceId: () => requireNodeEnvVar('STRIPE_YEARLY_SUBSCRIPTION_PRICE_ID'),
    effect: { kind: 'subscription' },
    coupon: FIRST100,
  },
  [PaymentPlanId.Lifetime]: {
    getStripePriceId: () => requireNodeEnvVar('STRIPE_LIFETIME_SUBSCRIPTION_PRICE_ID'),
    effect: { kind: 'payment' },
    coupon: FIRST100,
  },
};


export function prettyPaymentPlanName(planId: PaymentPlanId): string {
  const planToName: Record<PaymentPlanId, string> = {
    [PaymentPlanId.Yearly]: 'YEARLY',
    [PaymentPlanId.Lifetime]: 'LIFETIME',
  };
  return planToName[planId];
}

export function parsePaymentPlanId(planId: string): PaymentPlanId {
  if ((Object.values(PaymentPlanId) as string[]).includes(planId)) {
    return planId as PaymentPlanId;
  } else {
    throw new Error(`Invalid PaymentPlanId: ${planId}`);
  }
}

export function getSubscriptionPaymentPlanIds(): PaymentPlanId[] {
  return Object.values(PaymentPlanId).filter((planId) => paymentPlans[planId].effect.kind === 'subscription' || paymentPlans[planId].effect.kind === 'payment');
}

export function getCouponForPlan(planId: PaymentPlanId): CouponCode | undefined {
  return paymentPlans[planId].coupon;
}