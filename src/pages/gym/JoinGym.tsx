import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { previewGym, addMember } from '../../api/requests';
import Spinner from '../../components/Spinner';

import { type Gym } from '../../types/gym';
import { toast } from 'react-toastify';
import { Activity, User, Mail, Lock, MapPin, Building2, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../../hooks/useAuth';

const JoinGym = (): React.JSX.Element => {
    const { code } = useParams<string>();
    const [gym, setGym] = useState<Gym | null>(null);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSubmetting, setIsSubmetting] = useState<boolean>(false);
    const navigate = useNavigate();
    const { reload, } = useAuth();

    useEffect(() => {
        async function getGym() {
            try {
                if (!code) return;
                setIsLoading(true);
                const res = await previewGym(code);
                setGym(res.data.data.gym);
            } catch (e) {
                console.log('could not fetch gym data', e);
            } finally {
                setIsLoading(false);
            }
        }
        getGym();
    }, [code]);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmetting(true);

        try {
            if (!code) {
                toast.error('Invalid invite link');
                return;
            }
            if (password !== passwordConfirm) {
                toast.error('Passwords do not match');
                return;
            }
            await addMember({
                name,
                email,
                password,
                passwordConfirm
            }, code);
            toast.success("Account created successfully!");
            await reload();
            navigate('/customer')
        } catch (e: any) {
            console.log('error creating member', e);
            toast.error(e.response?.data?.message || 'Failed to join gym');
        } finally {
            setIsSubmetting(false);
        }
    }

    if (isLoading) {
        return (
            <div className="bg-void min-h-screen flex items-center justify-center font-sans">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="bg-void text-ghost min-h-screen flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-neon selection:text-void">
            {/* Background effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-void/90 z-10" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-gradient-to-b from-white/[0.02] to-transparent blur-3xl rounded-full opacity-50 z-0 pointer-events-none" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-lg relative z-20"
            >
                {/* Premium Card Container */}
                <div className="bg-white/[0.02] border border-white/[0.05] backdrop-blur-2xl p-8 sm:p-12 rounded-[2.5rem] shadow-2xl">

                    {/* Header */}
                    <div className="flex flex-col items-center mb-10 text-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 text-neon"
                        >
                            <Activity size={32} strokeWidth={1.5} />
                        </motion.div>
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2"
                        >
                            Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-white">{gym?.name || 'Memberly'}</span>
                        </motion.h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="text-slate text-sm font-medium"
                        >
                            Step inside and elevate your fitness journey.
                        </motion.p>
                    </div>

                    {/* Gym Context Block */}
                    {gym && (
                        <div className="mb-8 p-5 bg-black/20 border border-white/5 rounded-2xl">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="p-2 bg-white/5 rounded-xl text-neon mt-0.5">
                                    <MapPin size={16} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-semibold text-slate uppercase tracking-wider mb-1">Location</p>
                                    <p className="text-sm text-white font-medium">{gym.address || 'Gym Address'}</p>
                                </div>
                            </div>
                            {gym.description && (
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-white/5 rounded-xl text-neon mt-0.5">
                                        <Building2 size={16} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-semibold text-slate uppercase tracking-wider mb-1">About</p>
                                        <p className="text-sm text-white/80 leading-relaxed font-medium line-clamp-2">{gym.description}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
                        {/* Name Field */}
                        <div className="group flex flex-col gap-2">
                            <label className="text-xs font-semibold text-slate uppercase tracking-wider flex items-center gap-2 ml-1">
                                <User size={14} className="text-neon/70 group-focus-within:text-neon transition-colors" />
                                Legal Name
                            </label>
                            <input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="w-full px-5 py-3.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm font-medium focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all placeholder:text-slate/50"
                                placeholder="Jane Doe"
                                required
                            />
                        </div>

                        {/* Email Field */}
                        <div className="group flex flex-col gap-2">
                            <label className="text-xs font-semibold text-slate uppercase tracking-wider flex items-center gap-2 ml-1">
                                <Mail size={14} className="text-neon/70 group-focus-within:text-neon transition-colors" />
                                Email Address
                            </label>
                            <input
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                type="email"
                                className="w-full px-5 py-3.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm font-medium focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all placeholder:text-slate/50"
                                placeholder="jane@example.com"
                                required
                            />
                        </div>

                        {/* Passwords Layout */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Password Field */}
                            <div className="group flex flex-col gap-2">
                                <label className="text-xs font-semibold text-slate uppercase tracking-wider flex items-center gap-2 ml-1">
                                    <Lock size={14} className="text-neon/70 group-focus-within:text-neon transition-colors" />
                                    Password
                                </label>
                                <input
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    type="password"
                                    className="w-full px-5 py-3.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm font-medium focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all placeholder:text-slate/50"
                                    placeholder="••••••••"
                                    required
                                    minLength={8}
                                />
                            </div>

                            {/* Confirm Password Field */}
                            <div className="group flex flex-col gap-2">
                                <label className="text-xs font-semibold text-slate uppercase tracking-wider flex items-center gap-2 ml-1">
                                    <Lock size={14} className="text-neon/70 group-focus-within:text-neon transition-colors" />
                                    Confirm
                                </label>
                                <input
                                    value={passwordConfirm}
                                    onChange={e => setPasswordConfirm(e.target.value)}
                                    type="password"
                                    className="w-full px-5 py-3.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm font-medium focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all placeholder:text-slate/50"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmetting}
                            className={`mt-6 w-full py-4 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${isSubmetting
                                ? 'bg-white/5 text-slate cursor-not-allowed border border-white/10'
                                : 'bg-white text-void hover:scale-[1.02] hover:bg-neon hover:text-void'
                                }`}
                        >
                            {isSubmetting ? (
                                <>
                                    <Spinner size="sm" className="border-slate border-t-white" />
                                    <span className="animate-pulse">Setting Up Profile...</span>
                                </>
                            ) : (
                                <>
                                    Complete Membership
                                    <ChevronRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center text-xs font-medium text-slate flex items-center justify-center gap-2">
                        <Clock size={12} className="opacity-70" />
                        <span>Ready when you are. Your journey begins today.</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default JoinGym;
