import React, { useEffect, useRef, useState } from 'react';

interface HowItWorksProps {
  onCompletion: () => void;
}

const HowItWorksComponent: React.FC<HowItWorksProps> = ({ onCompletion }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [fillProgress, setFillProgress] = useState([0, 0, 0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
  
    checkMobile();
    window.addEventListener('resize', checkMobile);
  
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setFillProgress([100, 100, 100]);
      onCompletion();
    }
  }, [isMobile, onCompletion]);
  
  useEffect(() => {
    if (isMobile) return;
    const handleScroll = (event: WheelEvent) => {
      if (event.deltaY > 0) {
        if (currentIndex < fillProgress.length && fillProgress[currentIndex] < 100) {
          event.preventDefault();
          const updatedProgress = [...fillProgress];
          updatedProgress[currentIndex] = 100;
          setFillProgress(updatedProgress);
          setTimeout(() => {
            if (updatedProgress.every(progress => progress >= 100)) {
              onCompletion();
            } else {
              setCurrentIndex(prevIndex => prevIndex + 1);
            }
          }, 500);
        }
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
  }, [fillProgress, currentIndex, onCompletion, isMobile]);

  useEffect(() => {
    boxRefs.current.forEach((box, index) => {
      if (box) {
        const fillElement = box.querySelector('.fill-animation') as HTMLElement;
        fillElement.style.height = `${fillProgress[index]}%`;
        const textElements = box.querySelectorAll('.text-content') as NodeListOf<HTMLElement>;
        textElements.forEach(textElement => {
          textElement.classList.toggle('text-background-color', fillProgress[index] > 50);
        });
      }
    });
  }, [fillProgress]);

  return (
    <div ref={componentRef} className="py-8 md:py-16 mb-38 text-center text-white">
      <h2 className="font-overpass text-2xl md:text-3xl lg:text-5xl font-light text-white mb-6 md:mb-10">How It Works</h2>
      <div className="flex flex-col md:flex-row justify-between items-stretch gap-6 md:gap-8 w-full px-4 md:px-8 lg:px-16">
        {['Create a Giveaway', 'Share Your Giveaway', 'Analyze Your Results'].map((title, index) => (
          <div key={index} ref={el => boxRefs.current[index] = el} className="fill-container flex flex-col justify-start items-center bg-translucent text-white p-4 md:p-6 lg:p-10 lg:py-40 rounded-2xl border border-white w-full md:w-1/3">
            <div className="fill-animation"></div>
            <div className="text-content z-10 flex flex-col justify-start w-full h-full">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">{title}</h3>
              <p className="text-sm md:text-base text-center lg:text-lg">
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