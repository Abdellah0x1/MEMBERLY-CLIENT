import React from 'react';
import hero from "../assets/hero.jpg"

//icons
import { MdManageAccounts } from "react-icons/md";
import { FaTag,FaHistory } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import Pricing from '../components/Pricing';
import { NavLink } from 'react-router';

const testimonials = [
    {
        name: 'Aarav Mehta',
        role: 'Gym Owner, PulseFit Studio',
        quote: 'Renewals used to take hours every week. Now everything is tracked in one place and my team saves so much time.'
    },
    {
        name: 'Neha Kapoor',
        role: 'Operations Manager, IronCore Gym',
        quote: 'The payment history and reminders are exactly what we needed. Members pay on time and follow-ups are almost zero.'
    },
    {
        name: 'Rohit Singh',
        role: 'Founder, FitZone',
        quote: 'Clean UI, fast setup, and easy for staff to use. We moved from spreadsheets in a day without confusion.'
    }
]



const Home = (): React.JSX.Element => {
    return (
        <>
        <div className='px-6 sm:px-12 md:px-20 lg:px-30 h-screen bg-cover bg-center bg-no-repeat' style={{backgroundImage: `url(${hero})`}}>
            <div id='home' className='h-full flex items-center'>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                <div className='flex z-10 flex-col items-start w-full sm:w-[85%] md:w-[70%] gap-6 sm:gap-10'>
                    <p className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'>
                    Run your gym subscriptions, payments, and renewals from one clean dashboard.
                    </p>
                    <NavLink to='/dashboard' className='btn rounded-full bg-neon text-black font-bold px-8 sm:px-10 hover:scale-105 transition-transform'>Get Started</NavLink>
                </div>
            </div>
        </div>

        {/* features  */}
        <div id='features' className='px-6 sm:px-12 md:px-20 py-16 sm:py-20 md:py-30'>
                <h2 className='text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-10 sm:mb-16 md:mb-20'>Features</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10'>
                    <div className='flex gap-4 p-5 sm:p-6 rounded-xl border border-white/10 bg-white/5 hover:border-neon/30 transition-colors flex-1'>
                        <MdManageAccounts className='text-secondary shrink-0' size={50}/>
                        <div className='flex flex-col gap-2'>
                            <h3 className='font-bold text-lg sm:text-xl'>Member Profiles</h3>
                            <p className='text-sm text-gray-300'>Everything about a member in one profile.</p>
                        </div>
                    </div>
                    
                    <div className='flex gap-4 p-5 sm:p-6 rounded-xl border border-white/10 bg-white/5 hover:border-neon/30 transition-colors flex-1'>
                        <FaTag className='text-secondary shrink-0' size={50}/>
                        <div className='flex flex-col gap-2'>
                            <h3 className='font-bold text-lg sm:text-xl'>Subscription Plans</h3>
                            <p className='text-sm text-gray-300'>Flexible monthly & yearly plans.</p>
                        </div>
                    </div>

                    <div className='flex gap-4 p-5 sm:p-6 rounded-xl border border-white/10 bg-white/5 hover:border-neon/30 transition-colors flex-1'>
                        <FaHistory className='text-secondary shrink-0' size={50}/>
                        <div className='flex flex-col gap-2'>
                            <h3 className='font-bold text-lg sm:text-xl'>Payment History</h3>
                            <p className='text-sm text-gray-300'>Track payments with receipts.</p>
                        </div>
                    </div>

                    <div className='flex gap-4 p-5 sm:p-6 rounded-xl border border-white/10 bg-white/5 hover:border-neon/30 transition-colors flex-1'>
                        <IoIosNotifications className='text-secondary shrink-0' size={50}/>
                        <div className='flex flex-col gap-2'>
                            <h3 className='font-bold text-lg sm:text-xl'>Expiry Reminders</h3>
                            <p className='text-sm text-gray-300'>Never miss renewals.</p>
                        </div>
                    </div>
                </div>
                <Pricing/>

                {/* testimonials */}
                <div className='py-16 sm:py-20 md:py-30'>
                    <h2 className='text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-10 sm:mb-16 md:mb-20'>Reviews</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8'>
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.name} className='p-6 border border-white/10 rounded-xl bg-white/5 hover:border-neon/20 transition-colors'>
                                <p className='text-3xl text-secondary mb-4'>&ldquo;</p>
                                <p className='mb-6 text-gray-200 text-sm sm:text-base'>{testimonial.quote}</p>
                                <h3 className='font-bold text-lg'>{testimonial.name}</h3>
                                <p className='text-sm text-gray-400'>{testimonial.role}</p>
                            </div>
                        ))}
                    </div>
                </div>

                
        </div>

        <footer className='px-6 sm:px-12 md:px-20 py-12 border-t border-white/10'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10'>
                <div>
                    <h3 className='font-bold text-xl mb-3 text-neon'>MEMBERLY</h3>
                    <p className='text-gray-300 text-sm sm:text-base'>Run subscriptions, payments, and renewals in one place.</p>
                </div>
                <div>
                    <h4 className='font-semibold mb-3'>Quick Links</h4>
                    <ul className='space-y-2 text-gray-300 text-sm sm:text-base'>
                        <li><a href='#features' className='hover:text-neon transition-colors'>Features</a></li>
                        <li><a href='#access' className='hover:text-neon transition-colors'>Subscription Plans</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className='font-semibold mb-3'>Contact</h4>
                    <p className='text-gray-300 text-sm sm:text-base'>support@memberly.com</p>
                    <p className='text-gray-300 text-sm sm:text-base'>+212 619230516</p>
                </div>
            </div>

            <div className='mt-10 pt-6 border-t border-white/10 text-xs sm:text-sm text-gray-400 text-center'>
                © {new Date().getFullYear()} MEMBERLY. All rights reserved.
            </div>
        </footer>
        </>
    );
}

export default Home;
