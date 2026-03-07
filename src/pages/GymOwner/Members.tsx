import React from 'react';
import { useState } from 'react';
import Modal from '../../components/Modal';
import { toast } from 'react-toastify';

import { inviteMember } from '../../api/requests';
import { useAuth } from '../../hooks/useAuth';
import { redirect } from 'react-router';

const Members = ():React.JSX.Element => {
    const [showModal, setShowModal]= useState<boolean>(false);
    const [memberEmail,setMemberEmail] = useState<string>('');
    const {user} = useAuth()
    async function invite(email: string){
        if(!email) toast.error("member email is required");
        if(!user) return  redirect('/login')
        try {
            await inviteMember(memberEmail, user.gymId)
        }catch(e){
            console.log('error inviting member',e)
        }
    }
    return (
        <div className='p-5'>
            <button onClick={()=> setShowModal(true)} className='btn bg-neon'>Invite Member</button>
            {showModal && <Modal onConfirm={()=> invite(memberEmail)} setShowModal={setShowModal}>
                    <h2 className='font-bold text-center mb-4'>Invite new Member</h2>
                    <input value={memberEmail} onChange={(e)=> setMemberEmail(e.target.value)} className='w-full px-4 py-2 text-sm border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-lg focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/30 transition-colors' placeholder='member@example.com'></input>
                </Modal>}
        </div>
    );
}

export default Members;
