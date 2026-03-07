import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { previewGym, addMember } from '../../api/requests';
import Spinner from '../../components/Spinner';

import { type Gym } from '../../types/gym';
import { toast } from 'react-toastify';

const JoinGym = ():React.JSX.Element => {
    const {code} = useParams<string>();
    const [gym, setGym]= useState<Gym | null>(null);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSubmetting, setIsSubmetting] = useState<boolean>(false)

    

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
            await addMember({
                name,
                email,
                password,
                passwordConfirm
            })
            toast.success("member created")
            
        }catch(e){
            console.log('error creating member',e)

        }finally{
            setIsSubmetting(false)
        }
    }

    if (isLoading) {
        return (
            <div className='bg-black min-h-screen text-white flex items-center justify-center'>
                <div className='flex items-center gap-3'>
                    <Spinner />
                    <p>Loading gym details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='bg-black min-h-screen text-white px-10 py-10 flex items-center justify-center'>
                <div className='md:w-[30%] h-fit py-10 px-10 border border-white rounded-md'>
                    <h1 className='text-center text-3xl mb-10'>Welcome to <span className='text-neon'>{gym?.name}</span> gym</h1>
                <form className='flex flex-col gap-4' onSubmit={onSubmit}>
                    <div className='flex flex-col gap-2'>
                        <label>Name:</label>
                        <input value={name} onChange={e=> setName(e.target.value)} className='px-3 py-1 border border-gray-400 rounded-md' placeholder='Full name'></input>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>Email:</label>
                        <input value={email} onChange={e=> setEmail(e.target.value)} className='px-3 py-1 border border-gray-400 rounded-md' placeholder='Email'></input>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>password:</label>
                        <input value={password} onChange={e=> setPassword(e.target.value)} type='password' className='px-3 py-1 border border-gray-400 rounded-md' placeholder='password'></input>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label>Confirm password:</label>
                        <input value={passwordConfirm} onChange={(e)=> setPasswordConfirm(e.target.value)} type='password' className='px-3 py-1 border border-gray-400 rounded-md' placeholder='password'></input>
                    </div>
                    <button
                        type='submit'
                        disabled={isSubmetting}
                        className={`btn mt-5 flex items-center justify-center gap-2 ${isSubmetting ? 'cursor-not-allowed bg-green-200 text-gray-100' : 'bg-neon'}`}
                    >
                        {isSubmetting ? (
                            <>
                                <Spinner size='sm' className='border-white/50 border-t-white' />
                                Submitting...
                            </>
                        ) : (
                            'Submit'
                        )}
                    </button>
                </form>
                </div>
        </div>
    );
}

export default JoinGym;
