import React, { useState } from 'react';

import { NavLink, useNavigate ,Link} from 'react-router';
import google from '../../assets/google.png'
import { MdEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import LogIn from "../../assets/login.jpg"

import {  login} from "../../api/requests"
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';



const Login = (): React.JSX.Element => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] =  useState<string>('');
    const navigate = useNavigate();
    const {reload} = useAuth()

    function validateForm(){
        if(!email.trim()) return "email is required";
        if(!password.trim()) return "password is required"
    }

    async function onSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();
        const error = validateForm();
        
        if(error) toast.error(error)

        try {
            await login({email, password})
            toast.success('log in successful')
            await reload()
            navigate('/dashboard')
        }catch(e){
            console.error('error while trying to log in', e)
            if(e instanceof Error) toast.error(e.message)
        }
    }

    function googleLogin(){
        window.location.href ="http://localhost:3000/api/auth/google"
    }

    
    

    return (
        <div className='flex justify-between bg-black h-screen text-white'>
            <div className='w-full flex flex-col gap-4 justify-center items-center px-5 md:px-30 py-20 h-full'>
                <div className='text-center'>
                    <h1 className='font-bold text-xl'>Welcome Back to <span className='text-neon'>MEMBERLY</span></h1>
                    <p className='text-gray-200'>Run Your Gym Like a Pro</p>
                </div>
                <form onSubmit={onSubmit} className='flex flex-col w-full  gap-4   p-4 rounded-md'>
                <div className='relative'>
                    <input autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='email' className='w-full py-1 pl-8 pr-4 rounded-md border border-white focus:border-secondary'>
                    </input>
                    <MdEmail className='absolute top-1/2 left-2 -translate-y-1/2'/>
                </div>
                <div className='relative'>
                    <input autoComplete='password' value={password} onChange={e=> setPassword(e.target.value)} type='password' placeholder='Password' className='w-full  py-1 pl-8 pr-4 rounded-md border border-white'>
                    </input>
                    <TbLockPassword className='absolute left-2 top-1/2 -translate-y-1/2'/>
                </div>
                <NavLink to="/forgotPassword" className="text-secondary">Forgot password?</NavLink>
                <button className='btn bg-secondary w-full' type='submit'>Login</button>
                </form>
                <button onClick={()=> googleLogin()} className=' bg-gray-500 btn px-17  border-none flex gap-3 justify-center items-center'>
                    <img src={google} className='h-5'></img>
                    Continue With Google
                    </button>
                    <div>
                        Don't have an account ? <Link className='text-neon' to="/signup">Sign Up</Link>
                    </div>
            </div>
                <img src={LogIn} className='hidden md:block w-[60%] h-screen object-cover'></img> 
        </div>
    );
}

export default Login;
