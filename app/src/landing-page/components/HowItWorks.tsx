import React, { useEffect, useRef, useState } from 'react';

interface HowItWorksProps {
  onCompletion: () => void;
}

const HowItWorksComponent: React.FC<HowItWorksProps> = ({ onCompletion }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [fillProgress, setFillProgress] = useState([0, 0, 0]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Adjust this breakpoint as needed
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setFillProgress([100, 100, 100]);
      setTimeout(() => {
        onCompletion();
      }, 500);
    }
  }, [isMobile, onCompletion]);

  useEffect(() => {
    if (isMobile) return; // Skip desktop-specific logic on mobile

    const handleScroll = (event: WheelEvent) => {
      if (event.deltaY > 0 && fillProgress.some(progress => progress < 100)) {
        event.preventDefault();
        setFillProgress([100, 100, 100]);
        setTimeout(() => {
          onCompletion();
        }, 500);
      }
    };

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry.isIntersecting && entry.intersectionRatio >= 0.75 && fillProgress.some(progress => progress < 100)) {
          window.addEventListener('wheel', handleScroll, { passive: false });
        } else {
          window.removeEventListener('wheel', handleScroll);
        }
      },
      { threshold: [0.75] }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('wheel', handleScroll);
    };
  }, [fillProgress, onCompletion, isMobile]);

  useEffect(() => {
    boxRefs.current.forEach((box, index) => {
      if (box) {
        const fillElement = box.querySelector('.fill-animation') as HTMLElement;
        fillElement.style.height = `${fillProgress[index]}%`;
      }
    });
  }, [fillProgress]);

  return (
    <div ref={componentRef} className="py-8 md:py-16 mb-40 text-center text-white">
      <div className='mx-auto max-w-2xl text-center'>
        <p className='mt-2 text-3xl md:text-5xl font-medium tracking-tight text-white'>
          How It Works
        </p>
      </div>      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full px-4 md:px-8 lg:px-16 mt-20 lg:mt-24">
        {['Create a Giveaway', 'Share Your Giveaway', 'Analyze Your Results'].map((title, index) => (
          <div key={index} ref={el => boxRefs.current[index] = el} className="relative aspect-square bg-opacity-20 bg-white text-white p-4 md:p-6 rounded-2xl border border-white overflow-hidden">
            <div className="fill-animation absolute bottom-0 left-0 w-full bg-white bg-opacity-20 transition-all duration-500 ease-in-out"></div>
            <div className={`relative z-10 flex flex-col justify-center items-center w-full h-full pt-2 pb-4 md:pt-4 md:pb-8 ${fillProgress[index] > 50 ? 'text-background-color' : ''}`}>
              <h3 className="text-xl md:text-2xl lg:text-4xl font-semibold text-center mb-2 md:mb-4">{title}</h3>
              <p className="text-md text-center">
                {index === 0 && "Pick a template and customize it exactly to your liking."}
                {index === 1 && "Post your giveaway on your website and social media pages and immediately start gaining new leads and followers."}
                {index === 2 && "Raffle Leader's AI tools help you pick a winner and sift through your new leads."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorksComponent;