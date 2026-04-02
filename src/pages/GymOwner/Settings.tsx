import React, { useState } from 'react';
import { Save, Building2, MapPin, Globe, Phone, Mail, Clock, LayoutDashboard } from 'lucide-react';
import { motion } from 'motion/react';

const Settings = (): React.JSX.Element => {
    const [activeTab, setActiveTab] = useState('general');

    const tabs = [
        { id: 'general', label: 'General Info', icon: Building2 },
        { id: 'contact', label: 'Contact', icon: Mail },
        { id: 'branding', label: 'Branding', icon: LayoutDashboard },
    ];

    return (
        <div className='w-full max-w-5xl mx-auto space-y-8'>
            <div>
                <h1 className='text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent'>
                    Gym Settings
                </h1>
                <p className='text-gray-500 dark:text-gray-400 mt-1'>Update your gym's public profile and configurations.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Fixed Tabs Sidebar */}
                <div className="w-full md:w-64 flex-shrink-0 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                activeTab === tab.id
                                    ? 'bg-neon/10 text-neon border-l-4 border-neon shadow-sm'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#12121a] hover:text-gray-900 dark:hover:text-white border-l-4 border-transparent'
                            }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Form Content */}
                <motion.div 
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 bg-white dark:bg-[#12121a] rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"
                >
                    <form className='p-6 sm:p-8 space-y-8' onSubmit={(e) => e.preventDefault()}>
                        
                        {activeTab === 'general' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-4">General Information</h2>
                                
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 gap-1">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Gym Name</label>
                                        <div className="relative">
                                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input type="text" defaultValue="Iron Fit Arena" className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-[#0a0a0f] border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/30 text-gray-900 dark:text-white transition-all"/>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-1">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Description</label>
                                        <textarea rows={4} defaultValue="Premium fitness center..." className="w-full p-4 bg-gray-50 dark:bg-[#0a0a0f] border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/30 text-gray-900 dark:text-white transition-all resize-none"/>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'contact' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-4">Contact & Location</h2>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="grid grid-cols-1 gap-1">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input type="email" defaultValue="contact@ironfit.com" className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-[#0a0a0f] border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/30 text-gray-900 dark:text-white transition-all"/>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-1">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input type="tel" defaultValue="+1 234 567 8900" className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-[#0a0a0f] border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/30 text-gray-900 dark:text-white transition-all"/>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-1 sm:col-span-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Address Location</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input type="text" defaultValue="123 Fitness Blvd, NY 10001" className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-[#0a0a0f] border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/30 text-gray-900 dark:text-white transition-all"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'branding' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-4">Brand Identity</h2>
                                
                                <div className="space-y-6">
                                    <div className="flex items-center gap-6">
                                        <div className="h-24 w-24 bg-gray-100 dark:bg-[#0a0a0f] border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl flex items-center justify-center text-gray-400">
                                            <Building2 size={32} />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Gym Logo</h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm">Recommended size: 512x512px. Max file size: 2MB.</p>
                                            <button className="self-start mt-1 px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-900 dark:text-white rounded-lg transition-colors">
                                                Upload New Logo
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="pt-6 border-t border-gray-200 dark:border-gray-800 flex justify-end">
                            <button type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-neon text-black font-bold rounded-xl hover:bg-neon/90 hover:shadow-[0_0_20px_-5px_rgba(0,255,170,0.5)] transition-all">
                                <Save size={18} />
                                <span>Save Changes</span>
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}

export default Settings;
