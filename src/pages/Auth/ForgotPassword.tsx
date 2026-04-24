import React, { useState } from 'react';
import { forgotPassword } from '../../api/requests';

import { MdEmail } from 'react-icons/md';
import { FaArrowLeft } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'motion/react';


const ForgotPassword = ():React.JSX.Element => {
    const [email, setEmail] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [statusMessage, setStatusMessage] = useState<string>('');

    async function onSubmit(e: React.FormEvent){
        e.preventDefault()
        if (isSubmitting) return;

        const normalizedEmail = email.trim().toLowerCase();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        try{
            setErrorMessage('');
            setStatusMessage('');

            if(!normalizedEmail){
                setErrorMessage('Email is required.');
                return;
            }

            if(!emailPattern.test(normalizedEmail)){
                setErrorMessage('Please enter a valid email address.');
                return;
            }

            setIsSubmitting(true);
            await forgotPassword(normalizedEmail);
            setStatusMessage('If an account exists for this email, we sent a password reset link. Check your inbox or spam folder in 1–2 minutes.');
            toast.success('Check your email for reset instructions.');
        }catch(e){
            console.error('error sending email ', e)
            setErrorMessage('We could not send the reset email right now. Please try again.');
        }finally{
            setIsSubmitting(false);
        }
    }

    return (
        <div className='bg-void min-h-screen flex justify-center items-center text-ghost font-sans selection:bg-neon selection:text-void px-4'>
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className='w-full max-w-md flex flex-col gap-8'
            >
                <div className='text-center'>
                    <h1 className='text-4xl font-bold text-white mb-3 tracking-tight'>Reset your password</h1>
                    <p className='text-slate text-lg'>Enter your email and we'll send you a link to get back into your account.</p>
                </div>
                
                <form onSubmit={onSubmit} className='flex flex-col gap-5'>
                    <div className='relative group'>
                        <MdEmail className='absolute top-1/2 left-4 -translate-y-1/2 text-slate group-focus-within:text-white transition-colors' size={20} />
                        <input
                            id='email'
                            value={email}
                            onChange={e=> setEmail(e.target.value)}
                            type='email'
                            placeholder='Email address'
                            autoComplete='email'
                            disabled={isSubmitting}
                            aria-invalid={Boolean(errorMessage)}
                            className='w-full py-4 pl-12 pr-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all disabled:opacity-50'
                        />
                    </div>

                    {errorMessage && (
                        <p className='text-sm font-medium text-red-400 -mt-2 ml-1' role='alert' aria-live='assertive'>
                            {errorMessage}
                        </p>
                    )}

                    {statusMessage && (
                        <p className='text-sm font-medium text-neon -mt-2 ml-1 leading-relaxed' role='status' aria-live='polite'>
                            {statusMessage}
                        </p>
                    )}

                    <button 
                        disabled={isSubmitting} 
                        className='w-full bg-white text-void font-bold py-4 rounded-2xl hover:scale-[1.02] transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed mt-2' 
                        type='submit'
                    >
                        {isSubmitting ? 'Sending Link...' : 'Send Reset Link'}
                    </button>
                    
                    <NavLink to="/login" className="flex gap-2 items-center justify-center text-slate font-medium hover:text-white transition-colors mt-4">
                        <FaArrowLeft size={14} /> Back to Sign In
                    </NavLink>
                </form>
            </motion.div>
        </div>
    );
}

export default ForgotPassword;
