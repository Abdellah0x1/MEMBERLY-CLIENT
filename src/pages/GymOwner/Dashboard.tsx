import React from 'react';
import { NavLink, Outlet } from 'react-router';

import { useAuth } from '../../hooks/useAuth';
import { Activity } from 'lucide-react';
import { IoIosNotifications } from "react-icons/io";
import { PiSignOut } from "react-icons/pi";
import { MdOutlineLightMode } from "react-icons/md";


import userIcon from "../../assets/user.png"
import { useTheme } from '../../hooks/useTheme';


const Dashboard = (): React.JSX.Element => {
    const {user} = useAuth();
    const {toggleTheme,theme} = useTheme();
    return (
        <div className=' grid md:grid-cols-[20%_80%]'>
            <aside className='flex flex-col gap-10 py-10 bg-gray-50 h-screen shadow-md'>
                <h1 className='font-bold text-xl flex gap-2 justify-center items-center text-neon'><Activity/> MEMBERLY</h1>
                <ul className='flex flex-col gap-5 items-center'>
                    <li className=''><NavLink to="/dashboard">Dashboard</NavLink></li>
                    <li className=''><NavLink to="subscriptions">Subscriptions</NavLink></li>
                    <li className=''><NavLink to="members">Members</NavLink></li>
                    <li className=''><NavLink to="coaches">Coaches</NavLink></li>
                    <li className=''><NavLink to="settings">Settings</NavLink></li>
                    <li className='flex gap-2 items-center hover:text-neon transition-all delay-75 cursor-pointer'><PiSignOut/>Sign Out</li>
                </ul>
            </aside>
            <main>
                <nav className='flex justify-between border-b border-b-gray-300 py-3 px-5'>
                    <input placeholder='search ' className='py-1 pl-8 pr-4 rounded-md border border-gray-300 focus:border-neon'></input>
                    <div className='flex gap-10'>
                        
                        <button onClick={toggleTheme} className='border border-gray-400 rounded-md'>
                            <MdOutlineLightMode className='w-9 h-9 px-1 object-cover text-gray-700' size={30}/>
                        </button>
                        <button className='border border-gray-400 rounded-md'>
                            <IoIosNotifications className='w-9 h-9 px-1 object-cover text-gray-700' size={30}/>
                        </button>
                        <div className='flex items-center gap-4' >
                            <img className='w-9 h-9 border border-gray-400 rounded-md' src={user?.picture ? user?.picture : userIcon}></img>
                            <div>
                                <h2>{user?.name}</h2>
                                <p className='text-gray-500'>{user?.role}</p>
                            </div>
                        </div>
                    </div>
                </nav>
                <Outlet/>
            </main>
        </div>
    );
}

export default Dashboard;
