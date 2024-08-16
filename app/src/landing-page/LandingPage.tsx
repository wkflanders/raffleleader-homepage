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
import Stats from './components/Stats'
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
        {howItWorksCompleted && (
          <>
            {/* Stats section */}
            <div className='-mx-6 sm:-mx-6 lg:-mx-8'>
              <Stats stats={stats} />
            </div>

            {/* FAQ */}
            <FAQ faqs={faqs}/>

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
