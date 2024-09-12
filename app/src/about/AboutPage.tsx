import React from 'react';
import Footer from "../landing-page/components/Footer";
import { Link } from 'react-router-dom';

export default function AboutPage() {
    return (
        <div className='font-overpass bg-white dark:bg-boxdark-2 no-scrollbar mt-28'>
            <div className="relative text-center pb-28 shadow-xl shadow-bottom z-10">
                <h1 className="text-6xl font-bold text-raffleleader">Hey!</h1>
                <p className="mt-8 text-lg text-black px-48 text-left">
                    Raffle Leader is the easiest-to-use and most powerful giveaway plugin on WordPress. Giveaways are a fun and extremely effective way to get new leads and followers, and our fully customizable prebuilt no-code templates make it so anybody can run a beautiful giveaway.
                </p>
            </div>
            <div className="bg-gradient-to-b from-raffleleader to-rlpurple h-full text-white pt-48 pb-48">
                <h2 className="text-6xl font-bold text-center pb-12">TEAM</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-20">
                    {[
                        {
                            name: "Stephen Flanders",
                            role: "CEO & Founder",
                            description: "is the co-founder and CEO of Raffle Leader. Outside of Raffle Leader, he’s a leading writer in the tech space. With regular contributions to TLDR, Homescreen, SMB Dealhunter, and WorkWeek, his work is read by millions of people every week. In his free time, Stephen writes his personal blog, Stove Top.",
                            image: "https://raffleleader.s3.us-east-2.amazonaws.com/STEPHEN_.png"
                        },
                        {
                            name: "William Flanders",
                            role: "CTO & Founder",
                            description: "is the co-founder and CTO of Raffle Leader. He is earning a degree in Mechanical Engineering at Penn. William studied Astrophysics at Haverford College, interned at JPMorganChase as an AI/ML analyst, and, of course, is relentlessly improving Raffle Leader.",
                            image: "https://raffleleader.s3.us-east-2.amazonaws.com/WILLIAM_.png"
                        },
                        {
                            name: "Addison Devine",
                            role: "Creative Director",
                            description: "is the Creative Director at Raffle Leader. A full-time visual designer, Addison graduated summa cum laude from Drexel’s graphic design program and has worked with clients ranging from sports marketing agencies to NFT collections.",
                            image: "https://raffleleader.s3.us-east-2.amazonaws.com/ADDISON.png"
                        },
                    ].map((member, index) => (
                        <div key={index} className="px-20 py-20 transition-transform duration-300 ease-in-out hover:scale-110">
                            <div className="text-black">
                                <img src={member.image} alt={member.name} className="w-full rounded-lg mb-4 border-2 border-white" style={{ borderRadius: 40 }} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold">{member.name}</h3>
                                <p className="text-white text-xl font-medium">{member.role}</p>
                                <p className="mt-2 text-base">{member.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="relative text-center pt-28 mb-48 z-10 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)]">
                <h1 className="text-6xl font-bold text-raffleleader leading-loose">CONTACT US</h1>
                <p className="mt-8 font-bold text-2xl text-slate-900 px-48 text-center">
                    Email us at <a href="mailto:stephen@raffleleader.com" className="text-raffleleader underline">stephen@raffleleader.com</a>

                </p>
            </div>        
            {/* Closing */}
            <div className="bg-rl_wave bg-top bg-cover bg-no-repeat text-white text-center py-20 md:py-30 rounded-lg -mb-2 -mx-2">
                <h2 className="text-3xl md:text-5xl lg:text-7xl font-normal mb-6" style={{ lineHeight: 1.2 }}>Stop Wasting Time <br></br> Chasing Customers</h2>
                <p className="text-xl md:text-3xl tracking-wider px-6 md:px-0" style={{ lineHeight: 1.2 }}>Let Raffle Leader bring them to you</p>
                <div className='mt-10 flex items-center justify-center gap-x-6'>
                    <a
                        href="/#pricing"
                        className='rounded-lg px-8 md:px-17 py-4 text-base font-semibold bg-white text-raffleleader ring-1 ring-inset ring-gray-200 hover:ring-2 hover:ring-gray-200 hover:bg-gray-200 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-white'
                    >
                        Get Raffle Leader
                    </a>
                </div>
            </div>
            <Footer />
        </div>

    );
}