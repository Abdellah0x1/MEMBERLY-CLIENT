import React, { useState } from 'react';
import { forgotPassword } from '../../api/requests';

import { MdEmail } from 'react-icons/md';
import { FaArrowLeft } from "react-icons/fa6";
import { NavLink } from 'react-router';
import { toast } from 'react-toastify';



const ForgotPassword = ():React.JSX.Element => {
    const [email, setEmail] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [statusMessage, setStatusMessage] = useState<string>('');

    async function onSubmit(e: React.SubmitEvent){
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
        <div className='bg-black min-h-screen flex justify-center items-center text-white px-4'>
            <div className='w-full max-w-md border border-white rounded-xl p-6 md:p-8 flex flex-col gap-5'>
                <div>
                <h1 className='text-center mb-5 text-secondary font-bold text-2xl'>MEMBERLY</h1>
                <p className='text-xl font-bold text-center'>Forgot your password?</p>
                <p className='text-gray-300 text-center'>A reset link will be sent to your email to help you set a new password.</p>
                </div>
            <form onSubmit={onSubmit} className='flex flex-col gap-4 '>
                <label htmlFor='email' className='text-sm font-medium text-gray-200'>Email address</label>
                <div className='relative'>
                    <input
                        id='email'
                        value={email}
                        onChange={e=> setEmail(e.target.value)}
                        type='email'
                        placeholder='you@example.com'
                        autoComplete='email'
                        disabled={isSubmitting}
                        aria-invalid={Boolean(errorMessage)}
                        className='w-full py-2 pl-8 pr-4 rounded-md border border-white focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary disabled:opacity-70'
                    >
                    </input>
                    <MdEmail className='absolute top-1/2 left-2 -translate-y-1/2'/>
                </div>

                <p className='text-xs text-gray-400'>Use the email linked to your account.</p>

                {errorMessage && (
                    <p className='text-sm text-red-400' role='alert' aria-live='assertive'>
                        {errorMessage}
                    </p>
                )}

                {statusMessage && (
                    <p className='text-sm text-secondary' role='status' aria-live='polite'>
                        {statusMessage}
                    </p>
                )}

                <button disabled={isSubmitting} className='btn bg-secondary w-full disabled:opacity-70 disabled:cursor-not-allowed' type='submit'>
                    {isSubmitting ? 'Sending...' : 'Confirm'}
                </button>
            </form>
            <NavLink to="/login" className="flex gap-2 items-center justify-center text-gray-200 hover:text-gray-100"><FaArrowLeft/> Back to login</NavLink>
            </div>
        </div>
    );
}

export default ForgotPassword;
