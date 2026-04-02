import React, { useState } from 'react';
import Modal from '../../components/Modal';
import { motion } from 'motion/react';
import { Plus, Search, Mail, Star, Users, MapPin, MoreHorizontal } from 'lucide-react';

const MOCK_COACHES = [
    { id: 1, name: 'Michael Johnson', email: 'michael.j@example.com', specialty: 'Strength & Conditioning', rating: 4.9, students: 42, active: true },
    { id: 2, name: 'Sarah Williams', email: 'sarah.w@example.com', specialty: 'Yoga & Pilates', rating: 4.8, students: 65, active: true },
    { id: 3, name: 'David Chen', email: 'david.c@example.com', specialty: 'HIIT & Cardio', rating: 4.7, students: 38, active: false },
    { id: 4, name: 'Emma Davis', email: 'emma.d@example.com', specialty: 'CrossFit', rating: 5.0, students: 50, active: true }
];

const Coaches = (): React.JSX.Element => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [email, setEmail] = useState('');

    function inviteCoach() {
        console.log("Inviting coach:", email);
        setShowModal(false);
        setEmail('');
    }

    const filteredCoaches = MOCK_COACHES.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='w-full max-w-7xl mx-auto space-y-8'>
            {/* Header */}
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                <div>
                    <h1 className='text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent'>
                        Coaches Team
                    </h1>
                    <p className='text-gray-500 dark:text-gray-400 mt-1'>Manage your coaching staff and invite new professionals.</p>
                </div>
                <button 
                    onClick={() => setShowModal(true)} 
                    className='flex items-center gap-2 px-6 py-2.5 bg-neon text-black font-semibold rounded-xl hover:bg-neon/90 hover:shadow-[0_0_20px_-5px_rgba(0,255,170,0.5)] transition-all transform hover:-translate-y-0.5'
                >
                    <Plus size={20} />
                    <span>Invite Coach</span>
                </button>
            </div>

            {/* Toolbar */}
            <div className='relative max-w-md'>
                <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
                <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search coaches by name or specialty..." 
                    className='w-full pl-11 pr-4 py-3 bg-white dark:bg-[#12121a] border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/30 text-sm shadow-sm transition-all'
                />
            </div>

            {/* Modal */}
            {showModal && (
                <Modal onConfirm={inviteCoach} setShowModal={setShowModal}>
                    <div className="space-y-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-neon/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2 border border-neon/30">
                            <Mail className="text-neon" size={24} />
                        </div>
                        <h2 className='text-xl font-bold text-center text-gray-900 dark:text-white'>Invite Staff Member</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">Send an invitation to join your coaching team.</p>
                        
                        <div className="space-y-3">
                            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email Address</label>
                            <input 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                className='w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0a0a0f] rounded-xl focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/30 transition-all text-gray-900 dark:text-white' 
                                placeholder='coach@email.com'
                                autoFocus
                            />
                        </div>
                    </div>
                </Modal>
            )}

            {/* Coaches Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCoaches.map((coach, i) => (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, ease: 'easeOut' }}
                        key={coach.id} 
                        className="group relative bg-white dark:bg-[#12121a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 hover:shadow-xl hover:shadow-neon/5 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300"
                    >
                        <div className="absolute top-6 right-6">
                            <button className="text-gray-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/5">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>

                        <div className="flex flex-col items-center text-center mt-2">
                            <div className="relative mb-4">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center text-2xl font-bold text-gray-400 ring-4 ring-gray-50 dark:ring-[#0a0a0f] z-10 relative">
                                    {coach.name.charAt(0)}
                                </div>
                                <div className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-white dark:border-[#12121a] z-20 ${coach.active ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                            </div>
                            
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-neon transition-colors">{coach.name}</h3>
                            <span className="inline-block px-3 py-1 mt-2 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-white/5 rounded-full border border-gray-200 dark:border-white/10">
                                {coach.specialty}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-100 dark:border-gray-800/50">
                            <div className="flex flex-col items-center">
                                <div className="flex items-center gap-1 text-yellow-500 mb-1">
                                    <Star size={14} className="fill-current" />
                                    <span className="font-bold">{coach.rating}</span>
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Rating</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="flex items-center gap-1 text-gray-900 dark:text-white mb-1">
                                    <Users size={14} className="text-blue-500" />
                                    <span className="font-bold">{coach.students}</span>
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Students</span>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-2">
                            <button className="flex-1 py-2 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white text-sm font-medium rounded-xl transition-colors">
                                View Profile
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredCoaches.length === 0 && (
                <div className='flex flex-col items-center justify-center py-20 text-center'>
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400 mb-4">
                        <Users size={32} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No coaches found</h3>
                    <p className='text-gray-500 dark:text-gray-400'>Try adjusting your search query.</p>
                </div>
            )}
        </div>
    );
};

export default Coaches;
