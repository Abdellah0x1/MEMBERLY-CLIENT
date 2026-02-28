import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb"; 
import { FaArrowLeft } from "react-icons/fa6";

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

    async function onSubmit(e: React.SubmitEvent){
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
        <div className='bg-black min-h-screen flex justify-center items-center text-white px-4'>
            <div className='w-full max-w-md border border-white rounded-xl p-6 md:p-8 flex flex-col gap-5'>
                <div>
                    <h1 className='text-center mb-5 text-secondary font-bold text-2xl'>MEMBERLY</h1>
                    <h2 className='text-center text-xl font-bold'>Set a new password</h2>
                    <p className='text-gray-300 text-center'>Create a secure password with at least 8 characters.</p>
                </div>

                <form onSubmit={onSubmit} className='flex flex-col gap-4'>
                    <label htmlFor='newPassword' className='text-sm font-medium text-gray-200'>New password</label>
                    <div className='relative'>
                        <input
                            id='newPassword'
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Enter new password'
                            autoComplete='new-password'
                            disabled={isSubmitting}
                            aria-invalid={Boolean(errorMessage)}
                            className='w-full py-2 pl-8 pr-10 rounded-md border border-white focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary disabled:opacity-70'
                        >
                        </input>
                        <TbLockPassword className='absolute left-2 top-1/2 -translate-y-1/2'/>
                        <button
                            type='button'
                            onClick={() => setShowPassword((prev) => !prev)}
                            className='absolute right-2 top-1/2 -translate-y-1/2'
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                        </button>
                    </div>

                    <label htmlFor='confirmPassword' className='text-sm font-medium text-gray-200'>Confirm password</label>
                    <div className='relative'>
                        <input
                            id='confirmPassword'
                            value={newPasswordConfirm}
                            onChange={e=> setNewPassowrdConfirm(e.target.value)}
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder='Confirm new password'
                            autoComplete='new-password'
                            disabled={isSubmitting}
                            aria-invalid={Boolean(errorMessage)}
                            className='w-full py-2 pl-8 pr-10 rounded-md border border-white focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary disabled:opacity-70'
                        >
                        </input>
                        <TbLockPassword className='absolute left-2 top-1/2 -translate-y-1/2'/>
                        <button
                            type='button'
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className='absolute right-2 top-1/2 -translate-y-1/2'
                            aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                        >
                            {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
                        </button>
                    </div>

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

                    <button disabled={isSubmitting} className='flex gap-2 justify-center items-center btn bg-secondary w-full disabled:opacity-70 disabled:cursor-not-allowed' type='submit'>
                        {isSubmitting ? 'Updating...' : 'Update password'}
                    </button>
                </form>

                <NavLink to="/login" className="flex gap-2 items-center justify-center text-gray-200 hover:text-gray-100"><FaArrowLeft/> Back to login</NavLink>
            </div>
        </div>
    );
}

export default ResetPassword;
