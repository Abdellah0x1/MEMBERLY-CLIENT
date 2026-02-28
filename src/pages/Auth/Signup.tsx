import React, { useState } from 'react';



//icons
import { MdEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb"; 
import { MdNavigateNext } from "react-icons/md";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { createOwner } from '../../api/requests';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';


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
        <div>
            <div className='flex justify-center items-center bg-black h-screen text-white'>
                        <div className='w-full md:w-[80%] lg:w-[50%] flex flex-col gap-4 justify-center items-center px-5 md:px-30 py-20 h-full'>
                            <div className='text-center'>
                                <h1 className='font-bold text-xl'>Sign Up</h1>
                                <p className='text-gray-200'>Run Your Gym Like a Pro</p>
                            </div>
                            <form onSubmit={onSubmit} className='flex flex-col w-full  gap-4   p-4 rounded-md'>
                            <div className='relative'>
                                <input autoComplete='full-name' value={name} onChange={e => setName(e.target.value)} type='text' placeholder='Full Name' className='w-full py-1 pl-8 pr-4 rounded-md border border-white focus:border-secondary'>
                                </input>
                            </div>
                            <div className='relative'>
                                <input value={gymName} onChange={e =>  setGymName(e.target.value)} type='text' placeholder='Gym Name' className='w-full py-1 pl-8 pr-4 rounded-md border border-white focus:border-secondary'>
                                </input>
                            </div>
                            <div className='relative'>
                                <input autoComplete='email' value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='email' className='w-full py-1 pl-8 pr-4 rounded-md border border-white focus:border-secondary'>
                                </input>
                                <MdEmail className='absolute top-1/2 left-2 -translate-y-1/2'/>
                            </div>
                            <div className='relative'>
                                <input value={password} onChange={e => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} placeholder='Password' className='w-full py-1 pl-8 pr-10 rounded-md border border-white'>
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
                            <div className='relative'>
                                <input value={passwordConfirm} onChange={e=> setPasswordConfirm(e.target.value)} type={showConfirmPassword ? 'text' : 'password'} placeholder='Confirm Password' className='w-full py-1 pl-8 pr-10 rounded-md border border-white'>
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
                            <button className='flex gap-2 justify-center items-center btn bg-secondary w-full' type='submit'>Submit <MdNavigateNext size={20}/></button>
                            </form>
                        </div>
                    </div>
        </div>
    );
}

export default Signup;
