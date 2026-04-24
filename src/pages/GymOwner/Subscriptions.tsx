import { Check, Plus, Edit2, Shield, Zap, Crown } from 'lucide-react';
import { motion } from 'motion/react';

const PLANS = [
    {
        id: 1,
        name: 'Basic',
        price: '29.99',
        interval: 'month',
        icon: Shield,
        color: 'text-gray-500',
        bgColor: 'bg-gray-500/10',
        borderColor: 'border-gray-200 dark:border-gray-800',
        features: ['Access to cardio area', 'Access to weight room', 'Locker room access']
    },
    {
        id: 2,
        name: 'Pro',
        price: '59.99',
        interval: 'month',
        icon: Zap,
        color: 'text-neon',
        bgColor: 'bg-neon/10',
        borderColor: 'border-neon',
        popular: true,
        features: ['All Basic features', 'Group classes', '1 PT session/month', 'Sauna access']
    },
    {
        id: 3,
        name: 'Elite',
        price: '99.99',
        interval: 'month',
        icon: Crown,
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-500/10',
        borderColor: 'border-yellow-500/30',
        features: ['All Pro features', 'Unlimited PT sessions', 'Nutrition planning', 'Guest passes']
    }
];

const Subscriptions = (): React.JSX.Element => {
    return (
        <div className='w-full max-w-7xl mx-auto space-y-8'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-center sm:text-left'>
                <div className="w-full sm:w-auto">
                    <h1 className='text-3xl font-bold text-gray-900 dark:text-white tracking-tight'>
                        Subscription Plans
                    </h1>
                    <p className='text-gray-500 dark:text-gray-400 mt-1'>Manage your gym memberships and pricing tiers.</p>
                </div>
                <button className='w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-white dark:bg-[#12121a] text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 font-semibold rounded-xl hover:border-neon transition-colors'>
                    <Plus size={20} />
                    <span>Create Plan</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                {PLANS.map((plan, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.15, ease: "easeOut" }}
                        key={plan.id}
                        className={`relative group bg-white dark:bg-[#12121a] rounded-3xl p-8 border-2 ${plan.borderColor} hover:-translate-y-1 transition-transform duration-300 shadow-sm`}
                    >
                        {plan.popular && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                <span className="bg-neon text-black text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full shadow-lg shadow-neon/20">
                                    Most Popular
                                </span>
                            </div>
                        )}
                        <button className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                            <Edit2 size={18} />
                        </button>
                        
                        <div className={`w-14 h-14 ${plan.bgColor} ${plan.color} rounded-2xl flex items-center justify-center mb-6`}>
                            <plan.icon size={28} />
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                        <div className="flex items-baseline gap-1 mb-8">
                            <span className="text-4xl font-extrabold text-gray-900 dark:text-white">${plan.price}</span>
                            <span className="text-gray-500 dark:text-gray-400 font-medium">/{plan.interval}</span>
                        </div>
                        
                        <div className="space-y-4">
                            {plan.features.map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center">
                                        <Check size={12} strokeWidth={3} />
                                    </div>
                                    <span className="text-gray-600 dark:text-gray-300 whitespace-normal leading-tight">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800/50">
                            <div className="text-center">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">12 Active Subscribers</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default Subscriptions;
