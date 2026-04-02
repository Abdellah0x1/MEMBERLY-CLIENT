import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { previewGym, addMember } from '../../api/requests';
import Spinner from '../../components/Spinner';

import { type Gym } from '../../types/gym';
import { toast } from 'react-toastify';
import { Activity, User, Mail, Lock, MapPin, Building2, Clock } from 'lucide-react';

const JoinGym = ():React.JSX.Element => {
    const {code} = useParams<string>();
    const [gym, setGym]= useState<Gym | null>(null);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSubmetting, setIsSubmetting] = useState<boolean>(false)
    const navigate = useNavigate();
   

    

    useEffect(()=> {
        async function getGym(){
            try{
                setIsLoading(true)
                const res = await previewGym(code);
                setGym(res.data.data.gym)
                setIsLoading(false)

            }catch(e){
                console.log('could not fetch gym data',e)
            }finally{
                setIsLoading(false)
            }
        }
        getGym();
    },[code])
    
    
    



    async function onSubmit(e: React.SubmitEvent){
        e.preventDefault();
        setIsSubmetting(true);

        try{
            if(!code) {
                toast.error('invalid invite link')
                return
            }
            const res = await addMember({
                name,
                email,
                password,
                passwordConfirm
            },code)
            toast.success("member created")
            navigate(res.data.redirectTo)
            
        }catch(e){
            console.log('error creating member',e)

        }finally{
            setIsSubmetting(false)
        }
    }

    if (isLoading) {
        return (
            <div className='bg-[#0a0a0f] dark:bg-[#0a0a0f] min-h-screen text-gray-100 flex items-center justify-center'>
                <div className='flex items-center gap-3'>
                    <Spinner />
                    <p className='text-gray-300'>Loading gym details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='bg-gradient-to-br from-[#0a0a0f] via-[#0f0f18] to-[#0a0a0f] dark:from-[#0a0a0f] dark:via-[#0f0f18] dark:to-[#0a0a0f] min-h-screen text-gray-100 px-4 py-8 sm:px-6 sm:py-12 flex items-center justify-center'>
                <div className='w-full max-w-md'>
                    {/* Gym info card */}
                    <div className='bg-[#12121a] border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)]'>
                        {/* Logo and header */}
                        <div className='flex flex-col items-center mb-8'>
                            <div className='w-16 h-16 bg-gradient-to-br from-neon to-neon/60 rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_20px_-3px_rgba(34,211,238,0.4)]'>
                                <Activity size={32} className='text-[#0a0a0f]' />
                            </div>
                            <h1 className='text-center text-2xl sm:text-3xl font-bold mb-2'>Welcome to <span className='text-neon'>{gym?.name || 'Memberly'}</span></h1>
                            <p className='text-center text-sm text-gray-400'>Join our community and start your fitness journey</p>
                        </div>

                        {/* Gym details preview */}
                        {gym && (
                            <div className='mb-8 p-4 bg-[#0a0a0f]/50 rounded-xl border border-gray-800/50'>
                                <div className='flex items-start gap-3 mb-3'>
                                    <MapPin size={16} className='text-neon shrink-0 mt-0.5' />
                                    <div>
                                        <p className='text-xs text-gray-400 uppercase tracking-wide mb-1'>Location</p>
                                        <p className='text-sm text-gray-300'>{gym.address || 'Gym Address'}</p>
                                    </div>
                                </div>
                                {gym.description && (
                                    <div className='flex items-start gap-3'>
                                        <Building2 size={16} className='text-neon shrink-0 mt-0.5' />
                                        <div>
                                            <p className='text-xs text-gray-400 uppercase tracking-wide mb-1'>About</p>
                                            <p className='text-sm text-gray-300 line-clamp-2'>{gym.description}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <form className='flex flex-col gap-5' onSubmit={onSubmit}>
                            {/* Name */}
                            <div className='flex flex-col gap-2'>
                                <label className='text-sm font-medium text-gray-300 flex items-center gap-2'>
                                    <User size={16} className='text-neon' />
                                    Full Name
                                </label>
                                <input
                                    value={name}
                                    onChange={e=> setName(e.target.value)}
                                    className='w-full px-4 py-2.5 bg-[#0a0a0f] border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/30 transition-all placeholder:text-gray-500'
                                    placeholder='Enter your full name'
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className='flex flex-col gap-2'>
                                <label className='text-sm font-medium text-gray-300 flex items-center gap-2'>
                                    <Mail size={16} className='text-neon' />
                                    Email
                                </label>
                                <input
                                    value={email}
                                    onChange={e=> setEmail(e.target.value)}
                                    type='email'
                                    className='w-full px-4 py-2.5 bg-[#0a0a0f] border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/30 transition-all placeholder:text-gray-500'
                                    placeholder='Enter your email'
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className='flex flex-col gap-2'>
                                <label className='text-sm font-medium text-gray-300 flex items-center gap-2'>
                                    <Lock size={16} className='text-neon' />
                                    Password
                                </label>
                                <input
                                    value={password}
                                    onChange={e=> setPassword(e.target.value)}
                                    type='password'
                                    className='w-full px-4 py-2.5 bg-[#0a0a0f] border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/30 transition-all placeholder:text-gray-500'
                                    placeholder='Create a password'
                                    required
                                    minLength={8}
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className='flex flex-col gap-2'>
                                <label className='text-sm font-medium text-gray-300 flex items-center gap-2'>
                                    <Lock size={16} className='text-neon' />
                                    Confirm Password
                                </label>
                                <input
                                    value={passwordConfirm}
                                    onChange={(e)=> setPasswordConfirm(e.target.value)}
                                    type='password'
                                    className='w-full px-4 py-2.5 bg-[#0a0a0f] border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/30 transition-all placeholder:text-gray-500'
                                    placeholder='Confirm your password'
                                    required
                                />
                            </div>

                            {/* Submit button */}
                            <button
                                type='submit'
                                disabled={isSubmetting}
                                className={`mt-4 w-full py-3 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                                    isSubmetting
                                        ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-neon to-neon/90 hover:from-neon hover:to-neon/80 shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_-5px_rgba(34,211,238,0.5)] text-[#0a0a0f]'
                                }`}
                            >
                                {isSubmetting ? (
                                    <>
                                        <Spinner size='sm' className='border-gray-400 border-t-gray-200' />
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        Join {gym?.name || 'the Gym'}
                                        <Activity size={16} />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Footer */}
                        <div className='mt-6 text-center text-xs text-gray-500 flex items-center justify-center gap-2'>
                            <Clock size={12} />
                            <span>Your journey starts now</span>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default JoinGym;
