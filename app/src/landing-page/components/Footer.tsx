interface NavigationItem {
  name: string;
  href: string;
};

export default function Footer({ footerNavigation }: {
  footerNavigation: {
    app: NavigationItem[]
    company: NavigationItem[]
  }
}) {
  return (
    <div className='-mt-2 mx-auto dark:bg-boxdark-2'>
      <footer
          aria-labelledby='footer-heading'
          className='relative bg-rldark py-24'
        >
          <h2 id='footer-heading' className='sr-only'>
            Footer
          </h2>
          <div className='flex items-start justify-start ml-10 mt-10 gap-20'>
            <div>
              <h3 className='text-sm font-semibold leading-6 text-gray-300'>App</h3>
              <ul role='list' className='mt-6 space-y-4'>
                {footerNavigation.app.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className='text-sm leading-6 text-white hover:text-gray-300'>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className='text-sm font-semibold leading-6 text-gray-300'>©2024 RAFFLE LEADER, INC.</h3>
              <ul role='list' className='mt-6 space-y-4'>
                {footerNavigation.company.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className='text-sm leading-6 text-white hover:text-gray-300'>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </footer>
    </div>
  )
}
