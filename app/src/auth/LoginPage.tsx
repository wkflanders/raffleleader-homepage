import React from 'react';
import { Link } from 'react-router-dom';
import { LoginForm } from 'wasp/client/auth';
import { AuthPageLayout } from './AuthPageLayout';
import type { CustomizationOptions } from "wasp/client/auth";
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
      <div className="space-y-6">
        <LoginForm 
          appearance={AuthAppearance}
          logo={Logo}
        />
        <div className="text-center space-y-2">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-900">
            Don't have an account yet?{' '}
            <Link to="/pricing" className="underline">
              Get now!
            </Link>
          </p>
          {/* Uncomment if you want to include the password reset link
          <p className="text-sm font-medium text-gray-900">
            Forgot your password?{' '}
            <Link to="/request-password-reset" className="underline">
              Reset it
            </Link>
          </p>
          */}
        </div>
      </div>
    </AuthPageLayout>
  );
}