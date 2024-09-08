import raffleLeaderBanner from '../../client/static/hero-image.png';

// className="absolute -right-3 -bottom-3"

const CursorIcon = () => (
  <svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="56" height="56" className="absolute -right-1 -bottom-6">
    <path fill="#ffffff" d="M13.9,19.85c-0.05,0-0.1,0-0.2-0.05c-0.1-0.05-0.2-0.15-0.3-0.25l-1.85-4.3l-2.25,2.1c-0.05,0.05-0.15,0.1-0.3,0.1c-0.05,0-0.15,0-0.2-0.05C8.65,17.4,8.5,17.2,8.5,17l0-11c0-0.2,0.1-0.4,0.3-0.45C8.85,5.5,8.95,5.5,9,5.5c0.1,0,0.25,0.05,0.35,0.15l8,7.5c0.15,0.15,0.2,0.35,0.15,0.55c-0.05,0.2-0.25,0.3-0.45,0.35l-3.15,0.3l1.95,4.25c0.05,0.1,0.05,0.25,0,0.4c-0.05,0.1-0.15,0.25-0.25,0.3l-1.45,0.65C14.05,19.85,13.95,19.85,13.9,19.85z"/>
    <path fill="#000000" d="M9,6l8,7.5l-3.85,0.35l2.25,4.9l-1.45,0.65l-2.15-4.95L9,17L9,6 M9,5c-0.15,0-0.25,0.05-0.4,0.1C8.15,5.25,7.9,5.6,7.9,6l0,11c0,0.4,0.25,0.75,0.6,0.9C8.75,18,8.9,18,9,18c0.25,0,0.5-0.1,0.7-0.25l1.7-1.6l1.55,3.65c0.1,0.25,0.3,0.45,0.55,0.55c0.1,0.05,0.25,0.05,0.35,0.05c0.15,0,0.25-0.05,0.4-0.1l1.45-0.65c0.25-0.1,0.45-0.3,0.55-0.55c0.1-0.25,0.1-0.55,0-0.75l-1.65-3.6l2.45-0.2c0.4-0.05,0.75-0.3,0.85-0.65c0.15-0.35,0.05-0.8-0.25-1.05l-8-7.5C9.5,5.1,9.25,5,9,5L9,5z"/>
  </svg>
);


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
                className='rounded-lg px-17 py-4 text-sm font-semibold bg-raffleleader text-white ring-1 ring-inset ring-gray-200 hover:ring-2 hover:ring-gray-200 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 relative'
              >
                Get Raffle Leader
                <CursorIcon />
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
