import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb"; 
import { FaArrowLeft } from "react-icons/fa6";
import { motion } from 'motion/react';
import { resetPassword } from '../../api/requests';

const ResetPassword = ():React.JSX.Element => {
    const [newPassword, setNewPassword] = useState<string>('')
    const [newPasswordConfirm, setNewPassowrdConfirm] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [statusMessage, setStatusMessage] = useState<string>('');

    const { token } = useParams<{ token: string }>();

    async function onSubmit(e: React.FormEvent){
        e.preventDefault()
        if (isSubmitting) return;

        const trimmedPassword = newPassword.trim();
        const trimmedConfirm = newPasswordConfirm.trim();

        try{
            setErrorMessage('');
            setStatusMessage('');

            if (!token) {
                setErrorMessage('Reset token is missing or invalid. Please request a new reset link.');
                return;
            }

            if(!trimmedPassword){
                setErrorMessage('New password is required.');
                return;
            }

            if(trimmedPassword.length < 8){
                setErrorMessage('Password must be at least 8 characters long.');
                return;
            }

            if(!trimmedConfirm){
                setErrorMessage('Please confirm your new password.');
                return;
            }

            if(trimmedPassword !== trimmedConfirm){
                setErrorMessage('Passwords do not match.');
                return;
            }

            setIsSubmitting(true);
            await resetPassword(token, trimmedPassword, trimmedConfirm);
            setStatusMessage('Your password has been updated. You can now sign in with your new password.');
            toast.success('Password reset successful.');
        }catch(e){
            console.log(e)
            setErrorMessage('We could not reset your password right now. Please try again.');
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
                    <h1 className='text-4xl font-bold text-white mb-3 tracking-tight'>Set a new password</h1>
                    <p className='text-slate text-lg'>Secure your account with a strong, new password.</p>
                </div>

                <form onSubmit={onSubmit} className='flex flex-col gap-5'>
                    <div className='relative group'>
                        <TbLockPassword className='absolute top-1/2 left-4 -translate-y-1/2 text-slate group-focus-within:text-white transition-colors' size={20} />
                        <input
                            id='newPassword'
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            placeholder='New password'
                            autoComplete='new-password'
                            disabled={isSubmitting}
                            aria-invalid={Boolean(errorMessage)}
                            className='w-full py-4 pl-12 pr-12 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all disabled:opacity-50'
                        />
                        <button
                            type='button'
                            onClick={() => setShowPassword((prev) => !prev)}
                            className='absolute right-4 top-1/2 -translate-y-1/2 text-slate hover:text-white transition-colors'
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                        </button>
                    </div>

                    <div className='relative group'>
                        <TbLockPassword className='absolute top-1/2 left-4 -translate-y-1/2 text-slate group-focus-within:text-white transition-colors' size={20} />
                        <input
                            id='confirmPassword'
                            value={newPasswordConfirm}
                            onChange={e=> setNewPassowrdConfirm(e.target.value)}
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder='Confirm new password'
                            autoComplete='new-password'
                            disabled={isSubmitting}
                            aria-invalid={Boolean(errorMessage)}
                            className='w-full py-4 pl-12 pr-12 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all disabled:opacity-50'
                        />
                        <button
                            type='button'
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className='absolute right-4 top-1/2 -translate-y-1/2 text-slate hover:text-white transition-colors'
                            aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                        >
                            {showConfirmPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                        </button>
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
                        {isSubmitting ? 'Updating...' : 'Update Password'}
                    </button>
                </form>

                <NavLink to="/login" className="flex gap-2 items-center justify-center text-slate font-medium hover:text-white transition-colors mt-2">
                    <FaArrowLeft size={14} /> Back to Sign In
                </NavLink>
            </motion.div>
        </div>
    );
}

export default ResetPassword;
