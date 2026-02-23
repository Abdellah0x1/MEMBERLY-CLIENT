import React from 'react';

import { MdEmail } from 'react-icons/md';
import { FaArrowLeft } from "react-icons/fa6";

import { NavLink } from 'react-router';



const ForgotPassword = ():React.JSX.Element => {
    return (
        <div className='bg-black h-screen flex  justify-center items-center text-white'>
            <div className='flex flex-col gap-5 md:w-[20%]'>
                <div>
                <h1 className='text-center mb-5 text-secondary font-bold text-2xl'>MEMBERLY</h1>
                <p className='text-xl font-bold text-center'>Forgot your password ?</p>
                <p className='text-gray-300'>A link will be send to your email to help reset password </p>
                </div>
            <form className='flex flex-col gap-4 '>
                <div className='relative'>
                    <input type='email' placeholder='email' className='w-full py-1 pl-8 pr-4 rounded-md border border-white focus:border-secondary'>
                    </input>
                    <MdEmail className='absolute top-1/2 left-2 -translate-y-1/2'/>
                </div>
                <button className='btn bg-secondary w-full' type='submit'>Confrim</button>
            </form>
            <NavLink to="/login" className="flex gap-2 items-center justify-center text-gray-200 hover:text-gray-100"><FaArrowLeft/> Back to login</NavLink>
            </div>
        </div>
    );
}

export default ForgotPassword;
