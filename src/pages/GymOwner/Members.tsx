import React, { useState } from 'react';
import Modal from '../../components/Modal';
import { toast } from 'react-toastify';

import { inviteMember } from '../../api/requests';
import { useAuth } from '../../hooks/useAuth';

import { useUsersByRoleQuery } from '../../hooks/useUsersByRoleQuery';
import Spinner from '../../components/Spinner';

import { motion } from 'motion/react';
import { Search, Filter, Plus, Mail, MoreVertical, ShieldCheck } from 'lucide-react';

const Members = (): React.JSX.Element => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [memberEmail, setMemberEmail] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState('');
    
    const { user } = useAuth();
    const {
        data: users = [],
        isPending,
        isFetching,
        isError,
        error,
        refetch,
    } = useUsersByRoleQuery("member", user?.gymId);

    async function invite(email: string) {
        if (!email) {
            toast.error("Member email is required");
            return;
        }
        if (!user) {
            toast.error('You need to be logged in to invite members');
            return;
        }

        try {
            await inviteMember(email, user.gymId);
            toast.success('Invite was sent successfully');
            setMemberEmail('');
            setShowModal(false);
            await refetch();
        } catch (e) {
            console.log('error inviting member', e);
            toast.error(e instanceof Error ? e.message : 'Failed to invite member');
        }
    }

    const errorMessage = error instanceof Error ? error.message : 'Failed to load members';
    
    const filteredUsers = users.filter((u: any) => 
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='w-full max-w-7xl mx-auto space-y-6'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                <div>
                    <h1 className='text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent'>
                        Members Directory
                    </h1>
                    <p className='text-gray-500 dark:text-gray-400 mt-1'>Manage your gym members and invite new ones.</p>
                </div>
                <button 
                    onClick={() => setShowModal(true)} 
                    className='flex items-center gap-2 px-5 py-2.5 bg-neon text-black font-semibold rounded-xl hover:bg-neon/90 hover:shadow-[0_0_20px_-5px_rgba(0,255,170,0.5)] transition-all'
                >
                    <Plus size={20} />
                    <span>Invite Member</span>
                </button>
            </div>

            {/* Toolbar */}
            <div className='flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-[#12121a] p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm'>
                <div className='relative w-full sm:max-w-md'>
                    <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
                    <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search members by name or email..." 
                        className='w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-[#0a0a0f] border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/30 text-sm transition-all'
                    />
                </div>
                <div className='flex items-center gap-2 w-full sm:w-auto'>
                    <button className='flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-[#0a0a0f] border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full sm:w-auto justify-center'>
                        <Filter size={16} />
                        Filter
                    </button>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <Modal onConfirm={() => invite(memberEmail)} setShowModal={setShowModal}>
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-neon/10 text-neon rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail size={24} />
                        </div>
                        <h2 className='text-xl font-bold text-center text-gray-900 dark:text-white'>Invite New Member</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">Send an invitation link to their email address.</p>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                                value={memberEmail} 
                                onChange={(e) => setMemberEmail(e.target.value)} 
                                className='w-full pl-10 pr-4 py-3 text-sm border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#12121a] rounded-xl focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/30 transition-all text-gray-900 dark:text-white placeholder-gray-500' 
                                placeholder='member@example.com'
                                autoFocus
                            />
                        </div>
                    </div>
                </Modal>
            )}

            {/* Main Content Area */}
            {isPending && (
                <div className='flex flex-col items-center justify-center py-20'>
                    <Spinner size="lg" />
                    <p className="mt-4 text-gray-500 dark:text-gray-400 animate-pulse">Loading members...</p>
                </div>
            )}

            {isError && (
                <div className='rounded-2xl border border-red-500/20 bg-red-50 dark:bg-red-500/5 p-8 text-center'>
                    <ShieldCheck className="w-12 h-12 text-red-500 mx-auto mb-4 opacity-50" />
                    <p className='text-lg font-medium text-red-600 dark:text-red-400 mb-2'>Could not load members</p>
                    <p className='text-sm text-gray-600 dark:text-gray-400 mb-6'>{errorMessage}</p>
                    <button className='px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors' onClick={() => refetch()}>
                        Try Again
                    </button>
                </div>
            )}

            {!isPending && !isError && filteredUsers.length === 0 && (
                <div className='flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed border-gray-300 dark:border-gray-800 rounded-3xl bg-white/50 dark:bg-[#12121a]/50'>
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400 mb-4">
                        <Users size={32} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No members found</h3>
                    <p className='text-gray-500 dark:text-gray-400 max-w-sm mb-6'>
                        {searchTerm ? "No members match your search criteria." : "You haven't added any members to your gym yet."}
                    </p>
                    {!searchTerm && (
                        <button onClick={() => setShowModal(true)} className='px-5 py-2.5 bg-neon/10 text-neon font-medium rounded-xl hover:bg-neon/20 transition-colors'>
                            Add Your First Member
                        </button>
                    )}
                </div>
            )}

            {!isPending && !isError && filteredUsers.length > 0 && (
                <div className='bg-white dark:bg-[#12121a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm'>
                    {isFetching && <div className="h-1 bg-neon/20 overflow-hidden"><div className="h-full bg-neon w-1/3 animate-pulse rounded-full" /></div>}
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-gray-50 dark:bg-[#0a0a0f] border-b border-gray-200 dark:border-gray-800">
                                <tr>
                                    <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400">Member</th>
                                    <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400">Status</th>
                                    <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400">Joined</th>
                                    <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {filteredUsers.map((member: any, i: number) => (
                                    <motion.tr 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        key={member._id}
                                        className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className='flex items-center gap-3'>
                                                {member.picture ? (
                                                    <img
                                                        src={member.picture}
                                                        alt={member.name}
                                                        className='h-10 w-10 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-800'
                                                        loading='lazy'
                                                    />
                                                ) : (
                                                    <div className='h-10 w-10 rounded-full bg-gradient-to-br from-neon/40 to-blue-500/40 text-gray-900 dark:text-white flex items-center justify-center font-bold ring-2 ring-gray-100 dark:ring-gray-800 shadow-inner'>
                                                        {member.name?.charAt(0)?.toUpperCase()}
                                                    </div>
                                                )}
                                                <div>
                                                    <h3 className='font-semibold text-gray-900 dark:text-white group-hover:text-neon transition-colors'>{member.name}</h3>
                                                    <p className='text-xs text-gray-500 dark:text-gray-400'>{member.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Active
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                            {new Date(member.createdAt || Date.now()).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                                                <MoreVertical size={18} />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Members;
