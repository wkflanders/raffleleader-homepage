import { Link } from 'react-router-dom';
import { LoginForm } from 'wasp/client/auth';
import { AuthPageLayout } from './AuthPageLayout';
import type {CustomizationOptions} from "wasp/client/auth";
import Logo from '../client/static/BANNER-LOGO.svg';

export default function Login() {

  const AuthAppearance: CustomizationOptions['appearance'] = {
    colors: {
      brand: '#1501FE',
      brandAccent: '#1605E1',
      submitButtonText: 'white',
    }
  }

  return (
    <AuthPageLayout>
      <LoginForm 
      appearance={AuthAppearance}
      logo={Logo}
      />
      <br />
      <span className='text-sm font-medium text-gray-900 dark:text-gray-900'>
        Don't have an account yet?{' '}
        <Link to='/pricing' className='underline'>
          Get now!
        </Link>
      </span>
      <br />
      {/* <span className='text-sm font-medium text-gray-900'>
        Forgot your password?{' '}
        <Link to='/request-password-reset' className='underline'>
          reset it
        </Link>
        .
      </span> */}
    </AuthPageLayout>
  );
}
