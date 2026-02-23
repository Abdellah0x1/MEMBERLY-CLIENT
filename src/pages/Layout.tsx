import React from 'react';
import { Outlet } from 'react-router';
import Nav from '../components/Nav';

const Layout = (): React.JSX.Element => {
    return (
        
            <div className='font-mono bg-black text-white min-h-screen '>
            
            <Nav/>
            {/* <Navbar/> */}
            <Outlet/>
        </div>

    )
}

export default Layout;
