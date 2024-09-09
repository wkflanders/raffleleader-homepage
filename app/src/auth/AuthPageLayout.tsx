import React, { ReactNode } from 'react';
import banner from '../client/static/LOGIN-BANNER.svg';

export function AuthPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center md:justify-start flex-col md:flex-row h-screen">
      {/* Login form - centered both vertically and horizontally */}
      <div className="w-full md:w-1/3 flex items-center justify-center bg-white p-4 md:p-8 lg:p-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>

      {/* Image - hidden on mobile, visible on md screens and up */}
      <div className="hidden md:block md:w-2/3 bg-gray-100 overflow-hidden">
        <img 
          className="w-full h-full object-cover" 
          src={banner} 
          alt="Raffle Leader" 
        />
      </div>
    </div>
  );
}