import React, { useState } from 'react';

//icons
import { MdEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb"; 
import { MdNavigateNext } from "react-icons/md";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FaUser, FaDumbbell } from "react-icons/fa";
import { createOwner } from '../../api/requests';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router';
import { Activity } from 'lucide-react';


const Signup = (): React.JSX.Element => {
    const [name ,setName] = useState<string>('');
    const [gymName, setGymName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const navigate = useNavigate()

    function validateForm(){
        if(!name.trim()) return "name is required"
        if(!gymName.trim()) return "gym name is required"
        if(!email.trim()) return "email is required"
        if(!password.trim()) return "password is required"
        if(!passwordConfirm.trim()) return "please confirm your password"
    }


    async function onSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault()
        const error = validateForm()

        if(error) return toast.error(error)
        try{
            await createOwner({
                owner: {
                    name,
                    email,
                    password,
                    passwordConfirm,
                },
                gymName,
                
            })
            toast.success('signed up successfully');
            navigate('/')
            
        }catch(e){
            console.error('error signing up', e)

            if(e instanceof Error) toast.error(e.message)
        }
    }
    return (
        <div className='flex items-center justify-center bg-black min-h-screen text-white px-4 py-10'>
            <div className='w-full max-w-md flex flex-col gap-6'>
                {/* Header */}
                <div className='text-center space-y-2'>
                    <div className='flex items-center justify-center gap-2 mb-4'>
                        <Activity className='text-neon' size={24} />
                        <span className='font-bold text-xl'>MEMBER<span className='text-neon'>LY</span></span>
                    </div>
                    <h1 className='font-bold text-2xl sm:text-3xl'>Create your account</h1>
                    <p className='text-gray-400 text-sm'>Start managing your gym like a pro</p>
                </div>

                {/* Form */}
                <form onSubmit={onSubmit} className='flex flex-col gap-4'>
                    <div className='relative'>
                        <FaUser className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500' size={14} />
                        <input
                            autoComplete='full-name'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            type='text'
                            placeholder='Full Name'
                            className='w-full py-2.5 pl-10 pr-4 rounded-lg bg-white/5 border border-white/10 text-sm placeholder:text-gray-500 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/30 transition-colors'
                        />
                    </div>
                    <div className='relative'>
                        <FaDumbbell className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500' size={14} />
                        <input
                            value={gymName}
                            onChange={e => setGymName(e.target.value)}
                            type='text'
                            placeholder='Gym Name'
                            className='w-full py-2.5 pl-10 pr-4 rounded-lg bg-white/5 border border-white/10 text-sm placeholder:text-gray-500 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/30 transition-colors'
                        />
                    </div>
                    <div className='relative'>
                        <MdEmail className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500' size={16} />
                        <input
                            autoComplete='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type='email'
                            placeholder='Email address'
                            className='w-full py-2.5 pl-10 pr-4 rounded-lg bg-white/5 border border-white/10 text-sm placeholder:text-gray-500 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/30 transition-colors'
                        />
                    </div>
                    <div className='relative'>
                        <TbLockPassword className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500' size={16} />
                        <input
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Password'
                            className='w-full py-2.5 pl-10 pr-10 rounded-lg bg-white/5 border border-white/10 text-sm placeholder:text-gray-500 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/30 transition-colors'
                        />
                        <button
                            type='button'
                            onClick={() => setShowPassword((prev) => !prev)}
                            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors'
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
                        </button>
                    </div>
                    <div className='relative'>
                        <TbLockPassword className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500' size={16} />
                        <input
                            value={passwordConfirm}
                            onChange={e => setPasswordConfirm(e.target.value)}
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder='Confirm Password'
                            className='w-full py-2.5 pl-10 pr-10 rounded-lg bg-white/5 border border-white/10 text-sm placeholder:text-gray-500 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/30 transition-colors'
                        />
                        <button
                            type='button'
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors'
                            aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                        >
                            {showConfirmPassword ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
                        </button>
                    </div>

                    <button
                        className='flex gap-2 justify-center items-center w-full py-2.5 mt-2 rounded-lg bg-neon text-black font-semibold text-sm hover:brightness-110 transition-all'
                        type='submit'
                    >
                        Create Account <MdNavigateNext size={20}/>
                    </button>
                </form>

                <p className='text-center text-sm text-gray-400'>
                    Already have an account? <Link to='/login' className='text-neon hover:underline'>Log in</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
