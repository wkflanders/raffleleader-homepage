import { requireNodeEnvVar } from '../server/utils';

export type SubscriptionStatus = 'past_due' | 'cancel_at_period_end' | 'active' | 'deleted';

export enum PaymentPlanId {
  Yearly = 'yearly',
  Lifetime = 'lifetime',
}

export interface PaymentPlan {
  getStripePriceId: () => string;
  effect: PaymentPlanEffect;
}

export type PaymentPlanEffect = { kind: 'subscription' };

export const paymentPlans: Record<PaymentPlanId, PaymentPlan> = {
  [PaymentPlanId.Yearly]: {
    getStripePriceId: () => requireNodeEnvVar('STRIPE_YEARLY_SUBSCRIPTION_PRICE_ID'),
    effect: { kind: 'subscription' },
  },
  [PaymentPlanId.Lifetime]: {
    getStripePriceId: () => requireNodeEnvVar('STRIPE_LIFETIME_SUBSCRIPTION_PRICE_ID'),
    effect: { kind: 'subscription' },
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
  return Object.values(PaymentPlanId).filter((planId) => paymentPlans[planId].effect.kind === 'subscription');
}
