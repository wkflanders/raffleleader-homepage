import raffleLeaderBanner from '../../client/static/hero-image.png';
import { DocsUrl } from '../../shared/common';

export default function Hero() {
  return (
    <div className='shado-xl mx-auto max-w-7xl sm:px-6 lg:px-8 relative pt-14 w-full'>
          <div
            className='absolute top-0 right-0 -z-10 transform-gpu overflow-hidden w-full blur-3xl sm:top-0 '
            aria-hidden='true'
          >
            <div
              className='aspect-[1020/880] w-[55rem] flex-none sm:right-1/4 sm:translate-x-1/2 dark:hidden bg-gradient-to-tr from-white to-raffleleader opacity-20'
              style={{
                clipPath: 'polygon(80% 20%, 90% 55%, 50% 100%, 70% 30%, 20% 50%, 50% 0)',
              }}
            />
          </div>
          <div
            className='absolute inset-x-0 top-[calc(100%-40rem)] sm:top-[calc(100%-65rem)] -z-10 transform-gpu overflow-hidden blur-3xl'
            aria-hidden='true'
          >
            <div
              className='relative aspect-[1020/880] sm:-left-3/4 sm:translate-x-1/4 dark:hidden bg-gradient-to-br from-white to-raffleleader  opacity-30 w-[72.1875rem]'
              style={{
                clipPath: 'ellipse(80% 30% at 80% 50%)',
              }}
            />
          </div>
          <div className='sm:pb-48 sm:pt-24'>
            <div className='mx-auto max-w-8xl px-6 lg:px-8'>
              <div className='lg:mb-18 mx-auto max-w-3xl text-center'>
                <h1 className='font-overpass text-5xl sm:text-6xl font-medium text-gray-900 dark:text-white'>
                  Get leads at <br>
                  </br>light speed
                </h1>
                <p className='mt-6 mx-auto max-w-2xl text-lg leading-8 text-gray-600 dark:text-white'>
                  Put your <span className='text-raffleleader'>growth on autopilot</span> with customizable<br>
                  </br> viral giveaways and contests in WordPress
                </p>
                <div className='mt-10 flex items-center justify-center gap-x-6'>
                  <a
                    href={'/pricing'}
                    className='rounded-lg px-17 py-4 text-sm font-semibold bg-raffleleader text-white ring-1 ring-inset ring-gray-200 hover:ring-2 hover:ring-gray-200 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-white'
                  >
                    Get Started
                  </a>
                </div>
              </div>
              <div className='mt-14 flow-root sm:mt-14 '>
                <div className='-m-2 rounded-xl  lg:-m-4 lg:rounded-2xl lg:p-4'>
                  <img
                    src={raffleLeaderBanner}
                    alt='App screenshot'
                    width={2432}
                    height={1442}
                    className='w-full h-auto rounded-lg shadow-xl ring-1 ring-gray-900/10 border border-slate-300'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}
