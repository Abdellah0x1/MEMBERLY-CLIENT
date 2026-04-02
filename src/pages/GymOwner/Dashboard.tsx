import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router';

import { useAuth } from '../../hooks/useAuth';
import { Activity, LayoutDashboard, CreditCard, Users, Dumbbell, Settings, Search, Menu, X, Bell, Clock } from 'lucide-react';
import { IoIosNotifications } from "react-icons/io";
import { PiSignOut } from "react-icons/pi";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

import userIcon from "../../assets/user.png"
import { useTheme } from '../../hooks/useTheme';
import { logout } from '../../api/requests';

const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
    { to: 'members', label: 'Members', icon: Users },
    { to: 'coaches', label: 'Coaches', icon: Dumbbell },
    { to: 'settings', label: 'Settings', icon: Settings },
];

const Dashboard = (): React.JSX.Element => {
    const { user } = useAuth();
    const { toggleTheme, theme } = useTheme();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const notifRef = useRef<HTMLDivElement>(null);

    const [notifications, setNotifications] = useState([
        { id: 1, title: 'New member joined', desc: 'John Doe signed up for a monthly plan', time: '2 min ago', unread: true },
        { id: 2, title: 'Subscription expiring', desc: '3 members have subscriptions expiring this week', time: '1 hour ago', unread: true },
        { id: 3, title: 'Payment received', desc: '$299 received from Sarah Connor', time: '3 hours ago', unread: false },
        { id: 4, title: 'Coach added', desc: 'Mike Johnson was added as a coach', time: 'Yesterday', unread: false },
    ]);

    function markAllRead() {
        setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    }

    function markOneRead(id: number) {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
    }

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
                setNotifOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className='flex h-screen dark:bg-[#0a0a0f] dark:text-gray-100'>
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className='fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden'
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:static z-40 flex flex-col h-screen w-64 shrink-0
                bg-white dark:bg-[#12121a] border-r border-gray-200 dark:border-gray-800
                transition-transform duration-200 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                {/* Logo */}
                <div className='flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-800/50'>
                    <h1 className='font-bold text-xl flex gap-2 items-center text-neon'>
                        <Activity size={22} /> MEMBERLY
                    </h1>
                    <button className='md:hidden text-gray-500' onClick={() => setSidebarOpen(false)}>
                        <X size={20} />
                    </button>
                </div>

                {/* Nav links */}
                <nav className='flex-1 px-3 py-4 overflow-y-auto'>
                    <ul className='flex flex-col gap-1'>
                        {navLinks.map(({ to, label, icon: Icon, end }) => (
                            <li key={label}>
                                <NavLink
                                    to={to}
                                    end={end}
                                    onClick={() => setSidebarOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                            isActive
                                                ? 'bg-gradient-to-r from-neon/20 to-neon/5 text-neon shadow-[0_0_15px_-3px_rgba(34,211,238,0.3)]'
                                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 dark:hover:text-gray-200'
                                        }`
                                    }
                                >
                                    <Icon size={18} />
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Sign out */}
                <div className='px-3 py-4 border-t border-gray-200 dark:border-gray-800/50'>
                    <button onClick={()=> logout()} className='flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium w-full text-gray-600 dark:text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 dark:hover:text-red-400 transition-all'>
                        <PiSignOut size={18} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div className='flex-1 flex flex-col min-w-0'>
                {/* Top nav */}
                <nav className='flex items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800/50 bg-white dark:bg-[#12121a] px-4 sm:px-6 py-3 shrink-0'>
                    {/* Left: hamburger + search */}
                    <div className='flex items-center gap-3 flex-1 min-w-0'>
                        <button className='md:hidden text-gray-500 shrink-0' onClick={() => setSidebarOpen(true)}>
                            <Menu size={22} />
                        </button>
                        <div className='relative max-w-sm w-full'>
                            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={16} />
                            <input
                                placeholder='Search...'
                                className='w-full py-2 pl-9 pr-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-sm focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/30 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500'
                            />
                        </div>
                    </div>

                    {/* Right: actions + profile */}
                    <div className='flex items-center gap-2 sm:gap-3 shrink-0'>
                        <button
                            onClick={toggleTheme}
                            className='p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-white/10 transition-all'
                            title='Toggle theme'
                        >
                            {theme === 'light'
                                ? <MdOutlineLightMode size={20} />
                                : <MdOutlineDarkMode size={20} />
                            }
                        </button>
                        <div className='relative' ref={notifRef}>
                            <button
                                onClick={() => setNotifOpen(prev => !prev)}
                                className={`relative p-2 rounded-lg border transition-all ${
                                    notifOpen
                                        ? 'border-neon bg-neon/10 shadow-[0_0_10px_-3px_rgba(34,211,238,0.3)]'
                                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-white/10'
                                }`}
                                title='Notifications'
                            >
                                <IoIosNotifications size={20} />
                                {notifications.some(n => n.unread) && (
                                    <span className='absolute top-1.5 right-1.5 w-2 h-2 bg-signal rounded-full' />
                                )}
                            </button>

                            {/* Notification dropdown */}
                            {notifOpen && (
                                <div className='absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#161620] border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] z-50 overflow-hidden'>
                                    <div className='flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800/50'>
                                        <h3 className='font-semibold text-sm'>Notifications</h3>
                                        <button onClick={markAllRead} className='text-xs text-neon font-medium cursor-pointer hover:underline'>Mark all read</button>
                                    </div>
                                    <div className='max-h-80 overflow-y-auto'>
                                        {notifications.map((n) => (
                                            <div
                                                key={n.id}
                                                onClick={() => markOneRead(n.id)}
                                                className={`flex gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer border-b border-gray-50 dark:border-gray-800/30 last:border-0 ${
                                                    n.unread ? 'bg-neon/5 dark:bg-neon/5' : ''
                                                }`}
                                            >
                                                <div className={`mt-0.5 p-2 rounded-lg shrink-0 ${
                                                    n.unread
                                                        ? 'bg-neon/10 text-neon'
                                                        : 'bg-gray-100 dark:bg-gray-800/50 text-gray-400'
                                                }`}>
                                                    <Bell size={14} />
                                                </div>
                                                <div className='min-w-0 flex-1'>
                                                    <p className={`text-sm leading-tight ${
                                                        n.unread ? 'font-semibold' : 'font-medium text-gray-600 dark:text-gray-400'
                                                    }`}>{n.title}</p>
                                                    <p className='text-xs text-gray-500 dark:text-gray-500 mt-0.5 truncate'>{n.desc}</p>
                                                    <div className='flex items-center gap-1 mt-1 text-gray-400'>
                                                        <Clock size={10} />
                                                        <span className='text-[11px]'>{n.time}</span>
                                                    </div>
                                                </div>
                                                {n.unread && (
                                                    <span className='w-2 h-2 mt-2 bg-neon rounded-full shrink-0' />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className='px-4 py-2.5 border-t border-gray-100 dark:border-gray-800/50 text-center'>
                                        <span className='text-xs text-neon font-medium cursor-pointer hover:underline'>View all notifications</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='hidden sm:flex items-center gap-3 ml-2 pl-3 border-l border-gray-200 dark:border-gray-700'>
                            <img
                                className='w-9 h-9 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700'
                                src={user?.picture || userIcon}
                                alt='avatar'
                            />
                            <div className='leading-tight'>
                                <p className='text-sm font-semibold truncate max-w-[120px]'>{user?.name}</p>
                                <p className='text-xs text-gray-500 dark:text-gray-500 capitalize'>{user?.role}</p>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Page content */}
                <div className='flex-1 overflow-y-auto bg-gray-50 dark:bg-[#0a0a0f] p-4 sm:p-6'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
