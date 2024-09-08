import React, { useEffect, useState } from 'react';

interface Stat {
  name: string;
  img: string;
  description: string;
}

interface StatsProps {
  stats: Stat[];
}

const Stats: React.FC<StatsProps> = ({ stats }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseEnter = (position: string) => {
    if(isMobile) return;
    document.querySelectorAll(`.stat-box`).forEach((box) => {
      box.classList.remove(
        'grow',
        'push-right',
        'push-down',
        'push-left',
        'push-down-right',
        'push-up',
        'push-up-right',
        'push-up-left',
        'push-down-left',
        'inverted'
      );
    });

    const currentBox = document.querySelector(`.${position}`) as HTMLElement;
    if (currentBox) {
      currentBox.classList.add('inverted');
    }

    switch (position) {
      case 'top-left':
        document.querySelector('.bottom-left')?.classList.add('push-down');
        document.querySelector('.top-right')?.classList.add('push-right');
        document.querySelector('.bottom-right')?.classList.add('push-down-right');
        break;
      case 'top-right':
        document.querySelector('.bottom-right')?.classList.add('push-down');
        document.querySelector('.top-left')?.classList.add('push-left');
        document.querySelector('.bottom-left')?.classList.add('push-down-left');
        break;
      case 'bottom-left':
        document.querySelector('.top-left')?.classList.add('push-up');
        document.querySelector('.bottom-right')?.classList.add('push-right');
        document.querySelector('.top-right')?.classList.add('push-up-right');
        break;
      case 'bottom-right':
        document.querySelector('.top-right')?.classList.add('push-up');
        document.querySelector('.bottom-left')?.classList.add('push-left');
        document.querySelector('.top-left')?.classList.add('push-up-left');
        break;
      default:
        break;
    }
  };

  const handleMouseLeave = () => {
    document.querySelectorAll(`.stat-box`).forEach((box) => {
      box.classList.remove(
        'grow',
        'push-right',
        'push-down',
        'push-left',
        'push-down-right',
        'push-up',
        'push-up-right',
        'push-up-left',
        'push-down-left',
        'inverted'
      );
    });
  };

  return (
    <div id='stats' className='mx-auto max-w-7xl sm:px-6 lg:px-8 mt-48'>
      <div className='mx-auto max-w-2xl text-center'>
        <p className='mt-2 text-3xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white'>
          Supercharged Results
        </p>
      </div>
      <div className='flex justify-center items-center w-full mt-20 lg:mt-24'>
        <dl className='w-60 md:w-full max-w-2xl grid grid-cols-1 gap-x-12 gap-y-12 lg:max-w-4xl lg:grid-cols-2'>
          {stats.map((stat, index) => (
            <div
              key={stat.name}
              className={`stat-box relative p-4 lg:p-14 border-slate-600 border-2 rounded-3xl transition-all duration-300 ${
                index === 0 ? 'top-left' : ''
              } ${index === 1 ? 'top-right' : ''} ${index === 2 ? 'bottom-left' : ''} ${
                index === 3 ? 'bottom-right' : ''
              }`}
              onMouseEnter={() =>
                handleMouseEnter(
                  index === 0
                    ? 'top-left'
                    : index === 1
                    ? 'top-right'
                    : index === 2
                    ? 'bottom-left'
                    : 'bottom-right'
                )
              }
              onMouseLeave={handleMouseLeave}
            >
              <dt className='flex justify-center text-base'>
                <img src={stat.img} alt={stat.name} className='w-auto h-auto rounded-lg shadow-lg py-4 shadow-none transition-all duration-300' />
              </dt>
              <dd className='mt-2 text-base leading-7 text-black transition-all duration-300'>{stat.description}</dd>
            </div>
          ))}
        </dl>
      </div>
      <style>{`
        .stat-box {
          background-color: white;
          color: black;
        }
        .stat-box.inverted {
          background-color: #1501FE;
          color: white;
        }
        .stat-box.inverted img {
          filter: brightness(0) invert(1);
        }
        .stat-box.inverted dd, 
          .stat-box.inverted dt {
          color: white; /* Ensures both description and title text are white */
        }
        .push-right { transform: translateX(10px); }
        .push-down { transform: translateY(10px); }
        .push-left { transform: translateX(-10px); }
        .push-down-right { transform: translate(10px, 10px); }
        .push-up { transform: translateY(-10px); }
        .push-up-right { transform: translate(10px, -10px); }
        .push-up-left { transform: translate(-10px, -10px); }
        .push-down-left { transform: translate(-10px, 10px); }
      `}</style>
    </div>
  );
};

export default Stats;