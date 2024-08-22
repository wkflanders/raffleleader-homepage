import React, { useEffect, useRef, useState } from 'react';

interface HowItWorksProps {
  onCompletion: () => void;
}

const HowItWorksComponent: React.FC<HowItWorksProps> = ({ onCompletion }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [fillProgress, setFillProgress] = useState([0, 0, 0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Load completion state from local storage and check if component should be marked as completed on load
    const isCompleted = localStorage.getItem('howItWorksCompleted') === 'true';
    if (isCompleted) {
      setFillProgress([100, 100, 100]);
      onCompletion();
    } else {
      const handleScroll = (event: WheelEvent) => {
        if (event.deltaY > 0) {
          if (currentIndex < fillProgress.length && fillProgress[currentIndex] < 100) {
            event.preventDefault();
            const updatedProgress = [...fillProgress];
            updatedProgress[currentIndex] = 100;
            setFillProgress(updatedProgress);
            setTimeout(() => {
              if (updatedProgress.every(progress => progress === 100)) {
                onCompletion();
                localStorage.setItem('howItWorksCompleted', 'true');
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
    }
  }, [fillProgress, currentIndex, onCompletion]);

  useEffect(() => {
    boxRefs.current.forEach((box, index) => {
      if (box) {
        const fillElement = box.querySelector('.fill-animation') as HTMLElement;
        fillElement.style.height = `${fillProgress[index]}%`;
        fillElement.style.transition = 'height 1s';
        const textElements = box.querySelectorAll('.text-content') as NodeListOf<HTMLElement>;
        textElements.forEach(textElement => {
          if (fillProgress[index] > 50) {
            textElement.classList.add('text-background-color');
          } else {
            textElement.classList.remove('text-background-color');
          }
        });
      }
    });
  }, [fillProgress]);

  return (
    <div ref={componentRef} className="md:py-30 py-10 text-center text-white">
      <h2 className="font-overpass text-xl font-light text-white sm:text-3xl lg:text-5xl mb-5 md:mb-15">How It Works</h2>
      <div className="flex flex-col md:flex-row justify-between items-stretch mx-auto gap-5 md:gap-10 px-5" style={{ maxWidth: '1200px' }}>
        <div ref={el => boxRefs.current[0] = el} className="fill-container flex flex-col justify-start items-center mx-auto bg-translucent text-white p-5 md:pt-25 rounded-3xl border border-white w-full md:w-1/3 h-80" style={{ flex: 1 }}>
          <div className="fill-animation"></div>
          <h3 className="md:text-3xl text-lg text-left font-semibold text-content md:mb-4">Create a Giveaway</h3>
          <p className="lg:text-md md:text-md text-sm text-left text-content">Pick a template and customize it exactly to your liking.</p>
        </div>
        <div ref={el => boxRefs.current[1] = el} className="fill-container flex flex-col justify-start items-center mx-auto bg-translucent text-white p-5 md:pt-25 rounded-3xl border border-white w-full md:w-1/3 h-80" style={{ flex: 1 }}>
          <div className="fill-animation"></div>
          <h3 className="md:text-3xl text-lg text-left font-semibold text-content md:mb-4">Share Your Giveaway</h3>
          <p className="lg:text-md md:text-md text-sm text-left text-content">Post your giveaway on your website and social media pages and immediately start gaining new leads and followers.</p>
        </div>
        <div ref={el => boxRefs.current[2] = el} className="fill-container flex flex-col justify-start items-center mx-auto bg-translucent text-white p-5 md:pt-25 rounded-3xl border border-white w-full md:w-1/3 h-80" style={{ flex: 1 }}>
          <div className="fill-animation"></div>
          <h3 className="md:text-3xl text-lg text-left font-semibold text-content md:mb-4">Analyze Your Results</h3>
          <p className="lg:text-md md:text-md text-sm text-left text-content">Raffle Leader's AI tools help you pick a winner and sift through your new leads.</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksComponent;