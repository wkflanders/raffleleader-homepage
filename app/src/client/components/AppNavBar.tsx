import { Link, routes } from 'wasp/client/router';
import { useAuth } from 'wasp/client/auth';
import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { BiLogIn } from 'react-icons/bi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { HiBars3 } from 'react-icons/hi2';
import logo from '../static/TEXT-LOGO.svg';
import DropdownUser from '../../user/DropdownUser';
import { UserMenuItems } from '../../user/UserMenuItems';
import { DocsUrl, BlogUrl } from '../../shared/common';

const navigation = [
  { name: 'Pricing', href: '#pricing' },
  { name: 'Blog', href: BlogUrl },
  { name: 'Documentation', href: DocsUrl },
  // { name: 'About', href: routes.AboutPageRoute.build() },
];

const NavLogo = () => <img className='h-15 w-30' src={logo} alt='Raffle Leader' />;

export default function AppNavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: user, isLoading: isUserLoading } = useAuth();

  const handleNavClick = (href: string) => {
    if (href === '#pricing') {
      const pricingSection = document.getElementById('pricing-section');
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#pricing') {
        const pricingSection = document.getElementById('pricing-section');
        if (pricingSection) {
          pricingSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <header className='inset-x-0 top-0 z-50 sticky shadow-lg bg-white bg-opacity-50 backdrop-blur-lg backdrop-filter dark:border dark:border-gray-100/10 dark:bg-boxdark-2'>
      <nav className='flex items-center justify-between p-2 lg:px-8' aria-label='Global'>
        <div className='flex items-center lg:flex-1'>
          <a
            href='/'
            className='flex items-center -m-1.5 p-1.5 text-gray-900 duration-300 ease-in-out hover:text-raffleleader'
          >
            <NavLogo />
          </a>
        </div>
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-white'
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className='sr-only'>Open main menu</span>
            <HiBars3 className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
        <div className='hidden lg:flex lg:gap-x-12'>
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => {
                if (item.href.startsWith('#')) {
                  e.preventDefault();
                  handleNavClick(item.href);
                }
              }}
              className='text-sm font-medium leading-6 text-gray-900 duration-300 ease-in-out hover:text-raffleleader dark:text-white'
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end lg:align-end'>
          <div className='flex items-center gap-3 2xsm:gap-7'>
            <ul className='flex justify-center items-center gap-2 2xsm:gap-4'>
            </ul>
            {isUserLoading ? null : !user ? (
              <Link to='/login'>
                <div className='flex justify-end items-center duration-300 ease-in-out text-gray-900 hover:text-raffleleader dark:text-white'>
                  Log in <BiLogIn size='1.1rem' className='ml-1' />
                </div>
              </Link>
            ) : (
              <DropdownUser user={user} />
            )}
          </div>
        </div>
      </nav>
      <Dialog as='div' className='lg:hidden' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className='fixed inset-0 z-50' />
        <Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:text-white dark:bg-boxdark px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          <div className='flex items-center justify-between'>
            <a href='/' className='-m-1.5 p-1.5'>
              <span className='sr-only'>Your SaaS</span>
              <NavLogo />
            </a>
            <button
              type='button'
              className='-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-50'
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className='sr-only'>Close menu</span>
              <AiFillCloseCircle className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-gray-500/10'>
              <div className='space-y-2 py-6'>
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      if (item.href.startsWith('#')) {
                        e.preventDefault();
                        handleNavClick(item.href);
                      } else {
                        setMobileMenuOpen(false);
                      }
                    }}
                    className='-mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-gray-900 hover:text-raffleleader dark:text-white dark:hover:bg-boxdark-2'
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className='py-6'>
                {isUserLoading ? null : !user ? (
                  <Link to='/login'>
                    <div className='flex justify-end items-center duration-300 ease-in-out text-gray-900 hover:text-raffleleader dark:text-white'>
                      Log in <BiLogIn size='1.1rem' className='ml-1' />
                    </div>
                  </Link>
                ) : (
                  <UserMenuItems user={user} setMobileMenuOpen={setMobileMenuOpen} />
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}