import React, { useState, useEffect, useRef } from 'react';
import {
  features,
  navigation,
  faqs,
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
  const pricingSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#pricing') {
      setHowItWorksCompleted(true);
      setTimeout(() => {
        if (pricingSectionRef.current) {
          pricingSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  const handlePricingClick = () => {
    setHowItWorksCompleted(true);
    setTimeout(() => {
      const pricingSection = document.getElementById('pricing-section');
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  
  return (
    <div className='bg-white dark:bg-boxdark-2 no-scrollbar '>
      <Header navigation={navigation} onPricingClick={handlePricingClick} />

      <main className='isolate dark:bg-boxdark-2 overflow-x-hidden'>
        <Hero onPricingClick={handlePricingClick}/>
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
            <div className="bg-rl_wave bg-top bg-cover bg-no-repeat text-white text-center py-20 md:py-30 rounded-lg -mb-2 -mx-2">
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-normal mb-6" style={{ lineHeight: 1.2 }}>Stop Wasting Time <br></br> Chasing Customers</h2>
              <p className="text-xl md:text-3xl tracking-wider px-6 md:px-0" style={{ lineHeight: 1.2 }}>Let Raffle Leader bring them to you</p>
              <div className='mt-10 flex items-center justify-center gap-x-6'>
                <a
                  href='#pricing'
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    handlePricingClick();
                  }}
                  className='rounded-lg px-8 md:px-17 py-4 text-base font-semibold bg-white text-raffleleader ring-1 ring-inset ring-gray-200 hover:ring-2 hover:ring-gray-200 hover:bg-gray-200 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-white'
                >
                  Get Raffle Leader
                </a>
              </div>
            </div>
            <Footer />
          </>
        )}
      </main>
    </div>
  );
}
