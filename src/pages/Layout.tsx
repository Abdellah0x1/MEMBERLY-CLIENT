import React from 'react';
import { Outlet } from 'react-router';

const Layout = (): React.JSX.Element => {
    return (
        <div className='font-sans min-h-screen'>
            <Outlet/>
        </div>
    )
}

export default Layout;
