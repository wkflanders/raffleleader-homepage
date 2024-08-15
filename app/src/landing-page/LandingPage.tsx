import { useState } from 'react';
import {
  features,
  navigation,
  faqs,
  footerNavigation,
  stats
} from './contentSections';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function LandingPage() {
  const [howItWorksCompleted, setHowItWorksCompleted] = useState(false);

  return (
    <div className='bg-white dark:text-white dark:bg-boxdark-2'>
      <Header navigation={navigation} />

      <main className='isolate dark:bg-boxdark-2'>
        <Hero />
        <Features features={features} onHowItWorksComplete={() => setHowItWorksCompleted(true)} />
        howItWorksCompleted && (
          <>
            {/* Stats section */}
            <div className='-mx-6 sm:-mx-6 lg:-mx-8'>
              <Stats stats={stats} />
            </div>
            
            {/* Pricing section */}
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

            {/* FAQ */}
            <FAQComponent />

            {/* Closing */}
            <div className="bg-rl_wave bg-top bg-cover bg-no-repeat text-white text-center py-60 rounded-lg">
              <h2 className="leading-loose text-xl md:text-4xl lg:text-7xl font-normal mb-4">Try <span className="font-semibold tracking-widest">Raffle Leader</span></h2>
              <p className="leading-loose md:text-3xl lg:text-6xl mb-4">Risk Free For 14 Days</p>
              <p className="leading-loose text-3xl mb-6 tracking-wider">And spend more time converting leads, not finding them.</p>
              <div className='mt-10 flex items-center justify-center gap-x-6'>
                <a
                  href={'/pricing'}
                  className='rounded-lg px-17 py-4 text-xl font-semibold bg-white text-raffleleader ring-1 ring-inset ring-gray-200 hover:ring-2 hover:ring-gray-200 hover:bg-gray-200 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-white'
                >
                  Get Started
                </a>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer footerNavigation={footerNavigation} />
    </div>
  );
}
