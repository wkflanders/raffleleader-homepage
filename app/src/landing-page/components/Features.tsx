import React, { useState, useEffect, useRef } from 'react';
import HowItWorksComponent from './HowItWorks';
import LazyVideo from './LazyVideo';

interface Feature {
  name: string;
  img: string;
  description: string;
  backgroundColor: string;
}

interface FeaturesProps {
  features: Feature[];
  onHowItWorksComplete: () => void;
}

const Features: React.FC<FeaturesProps> = ({ features, onHowItWorksComplete }) => {
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const howItWorksRef = useRef<HTMLDivElement | null>(null);

  const [activeBg, setActiveBg] = useState(() => features[0].backgroundColor);

  const hexToRgb = (hex: string) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  const interpolateColor = (color1: string, color2: string, factor: number) => {
    const [r1, g1, b1] = hexToRgb(color1);
    const [r2, g2, b2] = hexToRgb(color2);
    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);
    return rgbToHex(r, g, b);
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    let isFeatureFound = false;

    featureRefs.current.forEach((featureRef, i) => {
      if (featureRef && !isFeatureFound) {
        const rect = featureRef.getBoundingClientRect();
        const featureTop = rect.top + window.scrollY;
        const featureBottom = rect.bottom + window.scrollY;

        if (scrollPosition >= featureTop && scrollPosition <= featureBottom) {
          const nextFeatureIndex = Math.min(i + 1, featureRefs.current.length - 1);
          const nextFeatureRef = featureRefs.current[nextFeatureIndex];
          const nextFeatureColor = nextFeatureRef ? features[nextFeatureIndex].backgroundColor : features[i].backgroundColor;
          const progress = (scrollPosition - featureTop) / (featureBottom - featureTop);
          setActiveBg(interpolateColor(features[i].backgroundColor, nextFeatureColor, Math.max(0, Math.min(1, progress))));
          isFeatureFound = true;
        }
      }
    });

    if (!isFeatureFound && howItWorksRef.current) {
      const rect = howItWorksRef.current.getBoundingClientRect();
      const componentTop = rect.top + window.scrollY;
      if (scrollPosition >= componentTop) {
        setActiveBg(features[features.length - 1].backgroundColor);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [features.length]);

  return (
    <div style={{ backgroundColor: activeBg, transition: 'background-color 0.5s ease' }} className="relative w-full overflow-hidden snap-y snap-mandatory">
      {features.map((feature, index) => (
        <div
          ref={(el) => (featureRefs.current[index] = el)}
          key={feature.name}
          className={`snap-start mt-75 mb-70 h-100 flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center justify-between gap-y-4 gap-x-4`}
        >
          <div className={`flex-[2] flex justify-center items-center rounded-lg order-2 md:order-1 px-0 p-20`}>
            <LazyVideo videoSrc={feature.img} className="w-full max-w-full rounded-lg shadow-lg"/>
          </div>
          <div className={`flex-[1] flex justify-center items-center order-1 md:order-2 ${index % 2 !== 0 ? 'md:pr-20' : 'md:pl-20'}`}>
            <div className="text-center max-w-md">
              <h2 className="text-2xl font-light text-white sm:text-4xl lg:text-6xl pb-4 text-left">
                {feature.name} 
              </h2>
              <p className="text-base font-light text-white sm:text-lg lg:text-xl text-left">
                {feature.description}
              </p>
            </div>
          </div>
        </div>
      ))}
      <div ref={howItWorksRef}>
        <HowItWorksComponent onCompletion={onHowItWorksComplete} />
      </div>
    </div>
  );
};

export default Features;
