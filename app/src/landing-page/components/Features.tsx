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
  const [activeBg, setActiveBg] = useState(features[0].backgroundColor);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    for (let i = 0; i < featureRefs.current.length; i++) {
      const featureRef = featureRefs.current[i];
      if (featureRef) {
        const rect = featureRef.getBoundingClientRect();
        const featureTop = rect.top + window.scrollY;
        const featureBottom = rect.bottom + window.scrollY;
        const featureCenter = featureTop + (featureBottom - featureTop) / 2;

        if (scrollPosition >= featureTop && scrollPosition <= featureBottom) {
          const nextFeatureIndex = Math.min(i + 1, featureRefs.current.length - 1);
          const nextFeatureRef = featureRefs.current[nextFeatureIndex];

          if (nextFeatureRef) {
            const nextRect = nextFeatureRef.getBoundingClientRect();
            const nextFeatureTop = nextRect.top + window.scrollY;
            const nextFeatureBottom = nextRect.bottom + window.scrollY;
            const nextFeatureCenter = nextFeatureTop + (nextFeatureBottom - nextFeatureTop) / 2;

            let progress = (scrollPosition - featureTop) / (featureBottom - featureTop);

            if (scrollPosition > featureCenter) {
              progress = (scrollPosition - featureCenter) / (nextFeatureCenter - featureCenter);
            }

            const interpolatedColor = interpolateColor(features[i].backgroundColor, features[nextFeatureIndex].backgroundColor, Math.max(0, Math.min(1, progress)));
            setActiveBg(interpolatedColor);
          } else {
            setActiveBg(features[i].backgroundColor);
          }
          break;
        }
      }
    }
  };

  useEffect(() => {
    featureRefs.current = featureRefs.current.slice(0, features.length);
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
          data-feature={feature.name}
          key={feature.name}
          className={`snap-start md:h-screen mt-40 flex flex-col md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} items-center justify-between gap-y-4 gap-x-4 sm:gap-x-6 md:gap-x-8`}
        >
          <div className={`flex-1 flex justify-center items-center rounded-lg order-2 md:order-1 px-0 ${index % 2 !== 0 ? 'md:pr-20' : 'md:pl-20'}`}>
            <LazyVideo videoSrc={feature.img} className="w-full max-w-full rounded-lg shadow-lg"/>
          </div>
          <div className="flex-1 flex justify-center items-center order-1 md:order-2 p-5">
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
      <div style={{  marginTop: '100px', marginBottom: '50px' }}>
        <HowItWorksComponent onCompletion={onHowItWorksComplete} />
      </div>
    </div>
  );
};

export default Features;
