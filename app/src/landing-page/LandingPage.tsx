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
import LandingPrices from './components/LandingPrices';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function LandingPage() {
  const [howItWorksCompleted, setHowItWorksCompleted] = useState(false);

  return (
    <div className='bg-white dark:text-white dark:bg-boxdark-2 no-scrollbar overflow-y-auto'>
      <Header navigation={navigation} />

      <main className='isolate dark:bg-boxdark-2 overflow-x-hidden'>
        <Hero />
        <Features features={features} onHowItWorksComplete={() => setHowItWorksCompleted(true)} />
        {howItWorksCompleted && (
          <>
            {/* Stats section */}
            <div className='-mx-6 sm:-mx-6 lg:-mx-8'>
              <Stats stats={stats} />
            </div>

            {/* Landing page price secion */}
            <LandingPrices />

            {/* FAQ */}
            <FAQ faqs={faqs}/>

            {/* Closing */}
            <div className="bg-rl_wave bg-top bg-cover bg-no-repeat text-white text-center py-60 rounded-lg">
              <h2 className="leading-tight lg:leading-loose text-5xl lg:text-7xl font-normal mb-8 lg:mb-0">Try <span className="font-semibold tracking-widest">Raffle Leader</span></h2>
              <p className="leading-tight lg:leading-loose text-3xl lg:text-5xl mb-8 lg:mb-4">Risk Free For 14 Days</p>
              <p className="leading-8 lg:leading-loose text-2xl tracking-wider mb-8 lg:mb-4">And spend more time converting leads, not finding them.</p>
              <div className='mt-10 flex items-center justify-center gap-x-6'>
                <a
                  href={'/pricing'}
                  className='rounded-lg px-17 py-4 text-xl font-semibold bg-white text-raffleleader ring-1 ring-inset ring-gray-200 hover:ring-2 hover:ring-gray-200 hover:bg-gray-200 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-white'
                >
                  Get Started
                </a>
              </div>
            </div>
            <Footer footerNavigation={footerNavigation} />
          </>
        )}
      </main>
    </div>
  );
}
