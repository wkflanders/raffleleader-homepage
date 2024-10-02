import React from 'react';
import Footer from './Footer';

const AffiliateLandingPage: React.FC = () => {
    return (
        <div>
            <div className="flex justify-center mt-24 md:mt-40 mb-30 md:mb-40 bg-white text-white">
                <div className="text-center flex flex-col px-4">
                    <h1 className="text-2xl md:text-5xl lg:text-7xl text-raffleleader font-bold mb-6 md:leading-relaxed lg:leading-normal">
                        Get paid when you sleep <br></br>with affiliate commissions
                    </h1>
                    <p className="text-sm md:text-lg lg:text-xl text-slate-900 lg:mb-8">
                        Join our affiliate program and earn 50% commissions for every customer you refer.
                    </p>
                    <div className="border-gray-600 rounded-lg px-10 py-10 mb-2 lg:mb-8 w-full md:w-1/2 mx-auto ">
                        <div className="text-xs md:text-md lg:text-lg">
                            <div className="mb-4 flex text-slate-900 items-center">
                                <span className="text-raffleleader mr-2">✓</span>
                                <span>50% of all payments for 12 months</span>
                            </div>
                            <div className="mb-4 flex text-slate-900 items-center">
                                <span className="text-raffleleader mr-2">✓</span>
                                <span>Includes recurring subscriptions</span>
                            </div>
                            <div className="flex text-slate-900 items-center">
                                <span className="text-raffleleader mr-2">✓</span>
                                <span>60-day cookie duration</span>
                            </div>
                        </div>
                    </div>
                    <a href='https://forms.gle/1jwbSj1yMYoJVjEw9' target="_blank" className="bg-raffleleader text-white px-3 lg:px-0 py-4 lg:py-3 w-1/2 mx-auto rounded-lg text-sm lg:text-xl hover:bg-white hover:text-raffleleader hover:border-raffleleader border-2 border-clear transition-colors">
                        Become an affiliate
                    </a>
                </div>
            </div>
            <Footer />
        </div>

    );
};

export default AffiliateLandingPage;