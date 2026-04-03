import React from 'react';
import { Users, CreditCard, Activity, TrendingUp, UserPlus, FileText } from 'lucide-react';
import { motion } from 'motion/react';

const stats = [
    { label: 'Total Revenue', value: '$12,450', change: '+14%', isPositive: true, icon: CreditCard, color: 'text-neon', bg: 'bg-neon/10' },
    { label: 'Active Members', value: '243', change: '+5%', isPositive: true, icon: Users, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Total Coaches', value: '12', change: '0%', isPositive: true, icon: Activity, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Growth Rate', value: '18%', change: '+2%', isPositive: true, icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-400/10' },
];

const recentActivity = [
    { id: 1, type: 'signup', text: 'Sarah Connor joined the gym', time: '2 hours ago', icon: UserPlus, color: 'text-neon', bg: 'bg-neon/10' },
    { id: 2, type: 'payment', text: 'John Doe renewed Pro Membership', time: '4 hours ago', icon: CreditCard, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { id: 3, type: 'plan', text: 'New "Summer Body" plan created', time: '1 day ago', icon: FileText, color: 'text-blue-400', bg: 'bg-blue-400/10' },
];

const Overview = (): React.JSX.Element => {
    return (
        <div className="p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent dark:from-white dark:to-gray-500">
                        Dashboard Overview
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back. Here's what's happening at your gym today.</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative group overflow-hidden rounded-[2rem] border border-gray-200 dark:border-white/[0.05] bg-white dark:bg-white/[0.02] backdrop-blur-2xl p-6 hover:shadow-xl hover:shadow-neon/5 dark:hover:bg-white/[0.04] transition-all duration-300"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="flex items-center justify-between">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <span className={`text-sm font-medium ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart Area Placeholder */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 rounded-[2rem] border border-gray-200 dark:border-white/[0.05] bg-white dark:bg-white/[0.02] backdrop-blur-2xl p-6 xl:p-8 shadow-sm group hover:dark:bg-white/[0.03] transition-colors duration-300 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="flex justify-between items-center mb-6 relative z-10">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Overview</h2>
                        <select className="bg-gray-50 dark:bg-[#1a1a24] border border-gray-200 dark:border-gray-800 text-sm rounded-lg px-3 py-1.5 outline-none focus:border-neon focus:ring-1 focus:ring-neon/30 text-gray-700 dark:text-gray-300">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                            <option>This Year</option>
                        </select>
                    </div>
                    <div className="h-[300px] w-full flex items-center justify-center rounded-xl border border-dashed border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#0a0a0f]/50">
                        <p className="text-gray-400 text-sm">Revenue chart visualization goes here</p>
                    </div>
                </motion.div>

                {/* Activity Feed */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="rounded-[2rem] border border-gray-200 dark:border-white/[0.05] bg-white dark:bg-white/[0.02] backdrop-blur-2xl p-6 xl:p-8 shadow-sm flex flex-col group hover:dark:bg-white/[0.03] transition-colors duration-300 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 relative z-10">Recent Activity</h2>
                    <div className="flex-1 space-y-6 relative z-10">
                        {recentActivity.map((activity, i) => (
                            <div key={activity.id} className="flex gap-4 relative">
                                {i !== recentActivity.length - 1 && (
                                    <div className="absolute left-5 top-10 bottom-[-24px] w-[2px] bg-gray-100 dark:bg-gray-800" />
                                )}
                                <div className={`relative z-10 p-2.5 rounded-full shrink-0 ${activity.bg} ${activity.color}`}>
                                    <activity.icon size={18} />
                                </div>
                                <div className="pt-1">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.text}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-2.5 text-sm font-medium text-neon bg-neon/5 hover:bg-neon/10 rounded-xl transition-colors">
                        View All Activity
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default Overview;
