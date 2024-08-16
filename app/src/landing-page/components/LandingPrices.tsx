import React, { useState, useRef } from 'react';

export default function LandingPrices() {
  return (
    <div className='mx-auto max-w-4xl sm:px-6 lg:px-8 mt-60 grid grid-cols-1 gap-y-8 lg:gap-x-8 lg:grid-cols-2'>
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className={cn(
                    'relative flex flex-col grow justify-between rounded-3xl ring-gray-900/10 dark:ring-gray-100/10 overflow-hidden p-8 xl:p-10  border-slate-700 border-2',
                    {
                      'ring-2': tier.bestDeal,
                      'ring-1 lg:my-6': !tier.bestDeal,
                    }
                  )}
                >
                  {tier.bestDeal && (
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
                      <h3 id={tier.id} className='text-center text-gray-900 text-2xl font-semibold leading-8 dark:text-white'>
                        {tier.name}
                      </h3>
                    </div>
                    <p className='font-bold mt-4 text-3xl text-gray-600 dark:text-white'><s>{tier.description}</s></p>
                    <p className='mt-6 flex items-baseline gap-x-1 dark:text-white'>
                      <span className='text-4xl font-bold tracking-tight text-gray-900 dark:text-white'>{tier.price}</span>
                      <span className='text-sm font-semibold leading-6 text-gray-600 dark:text-white'>
                        {tier.id !== TierIds.LIFETIME && '/yr'}
                      </span>
                    </p>
                    <ul role='list' className='mt-8 space-y-3 text-sm leading-6 text-gray-600 dark:text-white'>
                      {tier.features.map((feature) => (
                        <li key={feature} className='flex gap-x-3'>
                          <AiFillCheckCircle className='h-6 w-5 flex-none text-raffleleader' aria-hidden='true' />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {!!user && user.hasPaid ? (
                    <a
                      href={'/pricing'}
                      aria-describedby='manage-subscription'
                      className={cn(
                        'mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-raffleleader',
                        {
                          'bg-raffleleader text-white hover:text-white shadow-sm hover:bg-raffleleader': tier.bestDeal,
                          'text-gray-600 ring-1 ring-inset ring-raffleleader hover:ring-raffleleader': !tier.bestDeal,
                        }
                      )}
                    >
                      Manage Subscription
                    </a>
                  ) : (
                    <button
                      onClick={handlePricingClick}
                      aria-describedby={tier.id}
                      className={cn(
                        {
                          'bg-raffleleader text-white hover:text-white shadow-sm hover:bg-raffleleader': tier.bestDeal,
                          'text-gray-600  ring-1 ring-inset ring-raffleleader hover:text-white hover:bg-raffleleader': !tier.bestDeal,
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
  )
}
