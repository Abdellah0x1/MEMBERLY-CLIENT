import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router';

import { useAuth } from '../../hooks/useAuth';
import { Activity, LayoutDashboard, CreditCard, Users, Dumbbell, Settings, Search, Menu, X, Bell, ChevronDown } from 'lucide-react';
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
        <div className='flex h-screen bg-gray-50 dark:bg-background text-gray-900 dark:text-gray-100 font-sans selection:bg-neon/30'>
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className='fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity'
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:static inset-y-0 left-0 z-50 flex flex-col w-64
                bg-white dark:bg-void border-r border-gray-200 dark:border-gray-800
                transition-transform duration-300 ease-in-out md:translate-x-0
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Logo */}
                <div className='flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-800 shrink-0'>
                    <h1 className='font-bold text-lg flex gap-2 items-center tracking-tight'>
                        <Activity size={20} className="text-neon" /> MEMBERLY
                    </h1>
                    <button className='md:hidden text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors' onClick={() => setSidebarOpen(false)}>
                        <X size={20} />
                    </button>
                </div>

                {/* Nav links */}
                <nav className='flex-1 py-6 px-4 overflow-y-auto'>
                    <div className='text-[10px] font-semibold text-gray-400 dark:text-gray-500 mb-4 px-2 uppercase tracking-wider'>
                        Main Menu
                    </div>
                    <ul className='flex flex-col gap-1'>
                        {navLinks.map(({ to, label, icon: Icon, end }) => (
                            <li key={label}>
                                <NavLink
                                    to={to}
                                    end={end}
                                    onClick={() => setSidebarOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                            isActive
                                                ? 'bg-gray-100 dark:bg-gray-800/60 text-gray-900 dark:text-white'
                                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/30 hover:text-gray-900 dark:hover:text-gray-200'
                                        }`
                                    }
                                >
                                    <Icon size={18} className='shrink-0' />
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Sign out */}
                <div className='p-4 border-t border-gray-200 dark:border-gray-800 shrink-0'>
                    <button onClick={() => logout()} className='flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium w-full text-gray-600 dark:text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400 transition-colors'>
                        <PiSignOut size={18} className='shrink-0' />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <div className='flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-white dark:bg-background'>
                {/* Top nav */}
                <header className='h-16 flex items-center justify-between px-4 sm:px-8 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-background shrink-0'>
                    {/* Left: hamburger + search */}
                    <div className='flex items-center gap-4 flex-1 min-w-0'>
                        <button className='md:hidden text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors shrink-0' onClick={() => setSidebarOpen(true)}>
                            <Menu size={20} />
                        </button>
                        <div className='relative max-w-md w-full hidden sm:block'>
                            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={16} />
                            <input
                                placeholder='Search everywhere...'
                                className='w-full py-1.5 pl-9 pr-4 rounded-md border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-void text-sm focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-500'
                            />
                        </div>
                    </div>

                    {/* Right: actions + profile */}
                    <div className='flex items-center gap-2 sm:gap-4 shrink-0'>
                        <button
                            onClick={toggleTheme}
                            className='p-2 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
                            title='Toggle theme'
                        >
                            {theme === 'light'
                                ? <MdOutlineLightMode size={18} />
                                : <MdOutlineDarkMode size={18} />
                            }
                        </button>
                        
                        <div className='relative flex items-center' ref={notifRef}>
                            <button
                                onClick={() => setNotifOpen(prev => !prev)}
                                className={`relative p-2 rounded-md transition-colors ${
                                    notifOpen
                                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                                title='Notifications'
                            >
                                <IoIosNotifications size={20} />
                                {notifications.some(n => n.unread) && (
                                    <span className='absolute top-2 right-2 w-1.5 h-1.5 bg-signal rounded-full ring-2 ring-white dark:ring-background' />
                                )}
                            </button>

                            {/* Notification dropdown */}
                            {notifOpen && (
                                <div className='absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white dark:bg-void border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg z-50 overflow-hidden'>
                                    <div className='flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800'>
                                        <h3 className='font-semibold text-sm'>Notifications</h3>
                                        <button onClick={markAllRead} className='text-xs text-neon font-medium hover:text-neon/80 transition-colors'>Mark all read</button>
                                    </div>
                                    <div className='max-h-80 overflow-y-auto'>
                                        {notifications.length === 0 ? (
                                            <div className="p-4 text-center text-sm text-gray-500">No new notifications.</div>
                                        ) : (
                                            notifications.map((n) => (
                                                <div
                                                    key={n.id}
                                                    onClick={() => markOneRead(n.id)}
                                                    className={`flex gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer border-b border-gray-100 dark:border-gray-800/50 last:border-0 ${
                                                        n.unread ? 'bg-blue-50/50 dark:bg-gray-800/30' : ''
                                                    }`}
                                                >
                                                    <div className='mt-0.5 shrink-0'>
                                                        <div className={`p-1.5 rounded-full ${
                                                            n.unread ? 'bg-neon/10 text-neon' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                                                        }`}>
                                                            <Bell size={14} />
                                                        </div>
                                                    </div>
                                                    <div className='min-w-0 flex-1'>
                                                        <p className={`text-sm ${
                                                            n.unread ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'
                                                        }`}>{n.title}</p>
                                                        <p className='text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1'>{n.desc}</p>
                                                        <div className='flex items-center gap-1 mt-1.5 text-gray-400'>
                                                            <span className='text-[11px] font-medium'>{n.time}</span>
                                                        </div>
                                                    </div>
                                                    {n.unread && (
                                                        <div className="shrink-0 flex items-center justify-center w-2">
                                                            <span className='w-1.5 h-1.5 bg-neon rounded-full' />
                                                        </div>
                                                    )}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className='w-px h-5 bg-gray-200 dark:bg-gray-800 mx-1 hidden sm:block'></div>

                        <button className='flex items-center gap-2.5 hover:bg-gray-50 dark:hover:bg-gray-800/50 p-1 pr-2 rounded-md transition-colors'>
                            <img
                                className='w-7 h-7 rounded-full object-cover ring-1 ring-gray-200 dark:ring-gray-800'
                                src={user?.picture || userIcon}
                                alt='avatar'
                            />
                            <div className='hidden sm:flex flex-col items-start'>
                                <span className='text-sm font-medium text-gray-900 dark:text-white leading-none'>{user?.name || 'Admin User'}</span>
                            </div>
                            <ChevronDown size={14} className='text-gray-400 ml-1' />
                        </button>
                    </div>
                </header>

                {/* Page content */}
                <main className='flex-1 p-4 sm:p-8 overflow-y-auto bg-gray-50/50 dark:bg-background'>
                    <div className="max-w-7xl mx-auto w-full h-full flex flex-col">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;
