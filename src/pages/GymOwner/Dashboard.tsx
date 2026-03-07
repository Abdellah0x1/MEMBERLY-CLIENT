import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router';

import { useAuth } from '../../hooks/useAuth';
import { Activity, LayoutDashboard, CreditCard, Users, Dumbbell, Settings, Search, Menu, X } from 'lucide-react';
import { IoIosNotifications } from "react-icons/io";
import { PiSignOut } from "react-icons/pi";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

import userIcon from "../../assets/user.png"
import { useTheme } from '../../hooks/useTheme';

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

    return (
        <div className='flex h-screen dark:bg-gray-800 dark:text-white'>
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className='fixed inset-0 bg-black/50 z-30 md:hidden'
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:static z-40 flex flex-col h-screen w-64 shrink-0
                bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
                transition-transform duration-200 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                {/* Logo */}
                <div className='flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-700'>
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
                                        `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                            isActive
                                                ? 'bg-neon/10 text-neon'
                                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
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
                <div className='px-3 py-4 border-t border-gray-200 dark:border-gray-700'>
                    <button className='flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium w-full text-gray-600 dark:text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors'>
                        <PiSignOut size={18} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div className='flex-1 flex flex-col min-w-0'>
                {/* Top nav */}
                <nav className='flex items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 sm:px-6 py-3 shrink-0'>
                    {/* Left: hamburger + search */}
                    <div className='flex items-center gap-3 flex-1 min-w-0'>
                        <button className='md:hidden text-gray-500 shrink-0' onClick={() => setSidebarOpen(true)}>
                            <Menu size={22} />
                        </button>
                        <div className='relative max-w-sm w-full'>
                            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={16} />
                            <input
                                placeholder='Search...'
                                className='w-full py-2 pl-9 pr-4 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/30 transition-colors'
                            />
                        </div>
                    </div>

                    {/* Right: actions + profile */}
                    <div className='flex items-center gap-2 sm:gap-3 shrink-0'>
                        <button
                            onClick={toggleTheme}
                            className='p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
                            title='Toggle theme'
                        >
                            {theme === 'light'
                                ? <MdOutlineLightMode size={20} />
                                : <MdOutlineDarkMode size={20} />
                            }
                        </button>
                        <button
                            className='relative p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
                            title='Notifications'
                        >
                            <IoIosNotifications size={20} />
                            <span className='absolute top-1.5 right-1.5 w-2 h-2 bg-signal rounded-full' />
                        </button>
                        <div className='hidden sm:flex items-center gap-3 ml-2 pl-3 border-l border-gray-200 dark:border-gray-600'>
                            <img
                                className='w-9 h-9 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600'
                                src={user?.picture || userIcon}
                                alt='avatar'
                            />
                            <div className='leading-tight'>
                                <p className='text-sm font-semibold truncate max-w-[120px]'>{user?.name}</p>
                                <p className='text-xs text-gray-500 dark:text-gray-400 capitalize'>{user?.role}</p>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Page content */}
                <div className='flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800 p-4 sm:p-6'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
