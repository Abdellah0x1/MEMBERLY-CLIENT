import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Activity } from 'lucide-react';
import { IoIosNotifications } from "react-icons/io";
import { PiSignOut } from "react-icons/pi";

import userIcon from "../../assets/user.png"


const Dashboard = (): React.JSX.Element => {
    const {user} = useAuth();
    return (
        <div className=' grid md:grid-cols-[20%_80%]'>
            <aside className='flex flex-col gap-10 py-10 bg-gray-50 h-screen shadow-md'>
                <h1 className='font-bold text-xl flex gap-2 justify-center items-center text-neon'><Activity/> MEMBERLY</h1>
                <ul className='flex flex-col gap-5 items-center'>
                    <li className=''>Dashboard</li>
                    <li className=''>Subscriptions</li>
                    <li className=''>Members</li>
                    <li className=''>Coaches</li>
                    <li className=''>Settings</li>
                    <li className='flex gap-2 items-center hover:text-neon transition-all delay-75 cursor-pointer'><PiSignOut/>Sign Out</li>
                </ul>
            </aside>
            <main>
                <nav className='flex justify-between border-b border-b-gray-300 py-3 px-5'>
                    <input placeholder='search ' className='py-1 pl-8 pr-4 rounded-md border border-gray-300 focus:border-neon'></input>
                    <div className='flex gap-10'>
                        <button className='border border-gray-400 rounded-md'>
                            <IoIosNotifications className='w-9 h-9 object-cover text-gray-700' size={30}/>
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
                
            </main>
        </div>
    );
}

export default Dashboard;
