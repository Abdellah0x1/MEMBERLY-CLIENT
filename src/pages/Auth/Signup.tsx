import React, { useState } from 'react';

//icons
import { MdEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb"; 
import { MdNavigateNext } from "react-icons/md";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FaUser, FaDumbbell } from "react-icons/fa";
import { createOwner } from '../../api/requests';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import hero from "../../assets/hero.jpg";

const Signup = (): React.JSX.Element => {
    const [name ,setName] = useState<string>('');
    const [gymName, setGymName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const navigate = useNavigate();

    function validateForm(){
        if(!name.trim()) return "Name is required";
        if(!gymName.trim()) return "Gym name is required";
        if(!email.trim()) return "Email is required";
        if(!password.trim()) return "Password is required";
        if(!passwordConfirm.trim()) return "Please confirm your password";
    }

    async function onSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const error = validateForm();

        if(error) {
            toast.error(error);
            return;
        }
        
        try{
            await createOwner({
                owner: {
                    name,
                    email,
                    password,
                    passwordConfirm,
                },
                gymName,
            });
            toast.success('Signed up successfully');
            navigate('/');
        }catch(e: any){
            console.error('error signing up', e);
            if(e instanceof Error) toast.error(e.message);
            else toast.error("An error occurred during signup.");
        }
    }

    return (
        <div className='flex justify-between bg-void h-screen text-ghost font-sans selection:bg-neon selection:text-void'>
            <div className='w-full md:w-[45%] flex flex-col justify-center items-center px-6 md:px-16 py-10 h-full relative z-10 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-md mx-auto my-auto py-10"
                >
                    <div className='text-left mb-10'>
                        <h1 className='font-bold text-4xl tracking-tight text-white mb-3'>
                            Join the elite.
                        </h1>
                        <p className='text-slate text-lg'>Create your Memberly account to start managing your gym like a pro.</p>
                    </div>

                    <form onSubmit={onSubmit} className='flex flex-col gap-4'>
                        <div className='relative group'>
                            <FaUser className='absolute top-1/2 left-4 -translate-y-1/2 text-slate group-focus-within:text-white transition-colors' size={18} />
                            <input
                                autoComplete='name'
                                value={name}
                                onChange={e => setName(e.target.value)}
                                type='text'
                                placeholder='Full Name'
                                className='w-full py-4 pl-12 pr-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all'
                            />
                        </div>

                        <div className='relative group'>
                            <FaDumbbell className='absolute top-1/2 left-4 -translate-y-1/2 text-slate group-focus-within:text-white transition-colors' size={18} />
                            <input
                                value={gymName}
                                onChange={e => setGymName(e.target.value)}
                                type='text'
                                placeholder='Gym Name'
                                className='w-full py-4 pl-12 pr-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all'
                            />
                        </div>

                        <div className='relative group'>
                            <MdEmail className='absolute top-1/2 left-4 -translate-y-1/2 text-slate group-focus-within:text-white transition-colors' size={20} />
                            <input
                                autoComplete='email'
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
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Password'
                                className='w-full py-4 pl-12 pr-12 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all'
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
                                value={passwordConfirm}
                                onChange={e => setPasswordConfirm(e.target.value)}
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder='Confirm Password'
                                className='w-full py-4 pl-12 pr-12 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all'
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

                        <button
                            className='w-full flex justify-center items-center gap-2 bg-white text-void font-bold py-4 rounded-2xl hover:scale-[1.02] transition-transform duration-300 mt-4 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]'
                            type='submit'
                        >
                            Create Account <MdNavigateNext size={22} className="-mr-1" />
                        </button>
                    </form>

                    <div className='text-center mt-12 text-slate text-sm'>
                        Already have an account? <Link to='/login' className='text-white hover:text-neon transition-colors font-medium ml-1'>Log in</Link>
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
                <img src={hero} alt="Gym Hero" className='w-full h-full object-cover grayscale opacity-70 scale-105' />
                
                {/* Premium text overlay on the image */}
                <div className="absolute bottom-20 right-20 z-30 text-right">
                    <p className="text-3xl text-white font-bold tracking-tight mb-3">Maximize your potential.</p>
                    <p className="text-lg text-slate max-w-md ml-auto">Simplify growth, streamline operations, and provide the ultimate experience to your members.</p>
                </div>
            </motion.div>
        </div>
    );
}

export default Signup;
