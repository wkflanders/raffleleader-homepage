import React from 'react';
import Footer from './Footer';

const AffiliateLandingPage: React.FC = () => {
  return (
    <div>
        <div className="flex justify-center mt-44 mb-44 bg-white text-white">
      <div className="text-center flex flex-col px-4">
        <h1 className="text-6xl text-raffleleader font-bold mb-6">
          Get paid when you sleep <br></br>with affiliate commissions
        </h1>
        <p className="text-xl text-slate-900 mb-8">
          Join our affiliate program and earn 50% commissions for every customer you refer.
        </p>
        <div className="border-2 border-gray-600 rounded-lg p-6 mb-8 w-1/2 mx-auto ">
          <div className="text-left">
            <div className="mb-3 flex text-slate-900 items-center">
              <span className="text-raffleleader mr-2">✓</span>
              <span>50% of all payments for 12 months</span>
            </div>
            <div className="mb-3 flex text-slate-900 items-center">
              <span className="text-raffleleader mr-2">✓</span>
              <span>Includes recurring subscriptions</span>
            </div>
            <div className="flex text-slate-900 items-center">
              <span className="text-raffleleader mr-2">✓</span>
              <span>60-day cookie duration</span>
            </div>
          </div>
        </div>
        <a href='https://forms.gle/1jwbSj1yMYoJVjEw9' target="_blank" className="bg-raffleleader text-white py-3 w-1/2 mx-auto rounded-lg text-xl hover:bg-white hover:text-raffleleader hover:border-raffleleader border-2 border-clear transition-colors">
          Become an affiliate
        </a>
      </div>
    </div>
    <Footer />
    </div>
    
  );
};

export default AffiliateLandingPage;