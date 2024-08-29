import type { SubscriptionStatus } from '../plans';
import { PaymentPlanId } from '../plans';
import { PrismaClient } from '@prisma/client';
import { HttpError } from 'wasp/server';

type UserStripePaymentDetails = {
  userStripeId: string;
  subscriptionPlan?: PaymentPlanId;
  subscriptionStatus?: SubscriptionStatus;
  numOfCreditsPurchased?: number;
  datePaid?: Date;
};

export const updateUserStripePaymentDetails = async (
  { userStripeId, subscriptionPlan, subscriptionStatus, datePaid }: UserStripePaymentDetails,
  userDelegate: PrismaClient['user']
) => {
  const user = await userDelegate.findUnique({
    where: { stripeId: userStripeId },
  });

  if (!user){
    throw new HttpError(404, `User with stripeId ${userStripeId} not found`);
  }

  if(subscriptionPlan === 'lifetime'){
    subscriptionStatus = 'active';
  }

  // Just have lifetime supercede any other plan if the user already has lifetime and for whatever reason brought another plan
  if(user.subscriptionPlan === 'lifetime'){
    subscriptionPlan = PaymentPlanId.Lifetime;
  }

  return userDelegate.update({
    where: {
      stripeId: userStripeId,
    },
    data: {
      subscriptionPlan,
      subscriptionStatus,
      datePaid,
    },
  });
};
