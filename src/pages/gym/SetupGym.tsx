import React from 'react';
import { useState } from 'react';
import { Dumbbell, FileText, MapPin } from 'lucide-react';

import { setupGym } from '../../api/requests';
import { toast } from 'react-toastify';

const SetupGym = () => {
    const [gymName, setGymName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [address , setAddress ] = useState<string>('');
    const [isSubmetting, setIsSubmetting] = useState<boolean>(false)
    async function onSubmit(e : React.SubmitEvent){
        e.preventDefault();
        try{
            setIsSubmetting(true)
            await setupGym({
                gymName,
                description,
                address,
            })
            toast.success('Gym Setuped')
        }catch(e){
            console.log('Error setuping gym', e)
            toast.error('error setuping gym')
        }finally{
            setIsSubmetting(false)
        }
    }

    return (
        <div className='flex justify-center items-center bg-background h-screen text-gray-100'>
            <div className='w-full max-w-md bg-bg-secondary p-6 sm:p-8 rounded-md border border-gray-800'>
                <h2 className='text-center text-2xl font-bold text-neon mb-4'>Setup Your Gym</h2>
                <form onSubmit={onSubmit} className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-medium text-gray-300 flex items-center gap-1.5'><Dumbbell size={16} className='text-neon' />Gym Name</label>
                    <input className='input' value={gymName} onChange={e => setGymName(e.target.value)} placeholder='Enter your gym name'></input>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-medium text-gray-300 flex items-center gap-1.5'><FileText size={16} className='text-neon' />Description</label>
                    <input className='input' value={description} onChange={e => setDescription(e.target.value)} placeholder='Describe your gym'></input>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-medium text-gray-300 flex items-center gap-1.5'><MapPin size={16} className='text-neon' />Address</label>
                    <input className='input' value={address} onChange={e => setAddress(e.target.value)} placeholder='Enter your gym address'></input>
                    </div>
                    <button disabled={isSubmetting} className={`mt-4 w-full py-3 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                                    isSubmetting
                                        ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-neon to-neon/90 hover:from-neon hover:to-neon/80 shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_-5px_rgba(34,211,238,0.5)] text-[#0a0a0f]'
                                }`}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default SetupGym;
