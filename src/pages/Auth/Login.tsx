import React, { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import google from '../../assets/google.png'
import { MdEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import LogIn from "../../assets/login.jpg"
import { login } from "../../api/requests"
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'motion/react';

const Login = (): React.JSX.Element => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] =  useState<string>('');
    const navigate = useNavigate();
    const {reload} = useAuth();

    function validateForm(){
        if(!email.trim()) return "email is required";
        if(!password.trim()) return "password is required";
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const error = validateForm();
        
        if(error) {
            toast.error(error);
            return;
        }

        try {
            await login({email, password});
            toast.success('Log in successful');
            await reload();
            navigate('/dashboard');
        } catch(e: any){
            console.error('Error while trying to log in', e);
            if(e instanceof Error) toast.error(e.message);
            else toast.error("An error occurred during login.");
        }
    }

    function googleLogin(){
        window.location.href ="http://localhost:3000/api/auth/google";
    }

    return (
        <div className='flex justify-between bg-void h-screen text-ghost font-sans selection:bg-neon selection:text-void'>
            <div className='w-full md:w-[45%] flex flex-col justify-center items-center px-6 md:px-16 py-20 h-full relative z-10'>
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-md mx-auto"
                >
                    <div className='text-left mb-10'>
                        <h1 className='font-bold text-4xl tracking-tight text-white mb-3'>
                            Welcome back.
                        </h1>
                        <p className='text-slate text-lg'>Sign in to your Memberly account.</p>
                    </div>

                    <form onSubmit={onSubmit} className='flex flex-col gap-5'>
                        <div className='relative group'>
                            <MdEmail className='absolute top-1/2 left-4 -translate-y-1/2 text-slate group-focus-within:text-white transition-colors' size={20} />
                            <input 
                                autoComplete="email" 
                                value={email} 
                                onChange={e => setEmail(e.target.value)} 
                                type='email' 
                                placeholder='Email address' 
                                className='w-full py-4 pl-12 pr-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all'
                            />
                        </div>
                        
                        <div className='relative group'>
                            <TbLockPassword className='absolute top-1/2 left-4 -translate-y-1/2 text-slate group-focus-within:text-white transition-colors' size={20} />
                            <input 
                                autoComplete='current-password' 
                                value={password} 
                                onChange={e=> setPassword(e.target.value)} 
                                type='password' 
                                placeholder='Password' 
                                className='w-full py-4 pl-12 pr-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all'
                            />
                        </div>
                        
                        <div className="flex justify-end -mt-2">
                            <NavLink to="/forgotPassword" className="text-sm font-medium text-slate hover:text-white transition-colors">
                                Forgot password?
                            </NavLink>
                        </div>
                        
                        <button 
                            className='w-full bg-white text-void font-bold py-4 rounded-2xl hover:scale-[1.02] transition-transform duration-300 mt-4 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]' 
                            type='submit'
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="flex items-center gap-4 my-8">
                        <div className="h-px bg-white/10 flex-1"></div>
                        <span className="text-xs font-bold text-slate uppercase tracking-wider">Or</span>
                        <div className="h-px bg-white/10 flex-1"></div>
                    </div>

                    <button 
                        onClick={googleLogin} 
                        className='w-full bg-transparent border border-white/10 hover:bg-white/5 py-4 rounded-2xl flex justify-center items-center gap-3 transition-all text-white font-medium hover:border-white/20'
                    >
                        <img src={google} alt="Google" className='h-5' />
                        Continue with Google
                    </button>

                    <div className='text-center mt-12 text-slate text-sm'>
                        Don't have an account? <Link className='text-white hover:text-neon transition-colors font-medium ml-1' to="/signup">Sign up</Link>
                    </div>
                </motion.div>
            </div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className='hidden md:block w-[55%] h-screen relative overflow-hidden'
            >
                <div className="absolute inset-0 bg-void/30 mix-blend-multiply z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-void via-void/50 to-transparent z-20" />
                <img src={LogIn} alt="Gym" className='w-full h-full object-cover grayscale opacity-70 scale-105' />
                
                {/* Premium text overlay on the image */}
                <div className="absolute bottom-20 right-20 z-30 text-right">
                    <p className="text-3xl text-white font-bold tracking-tight mb-3">Run your gym like a pro.</p>
                    <p className="text-lg text-slate max-w-md ml-auto">Join the elite fitness clubs that trust Memberly for effortless management and unparalleled performance.</p>
                </div>
            </motion.div>
        </div>
    );
}

export default Login;
