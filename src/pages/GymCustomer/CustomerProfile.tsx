import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import Spinner from '../../components/Spinner';

const CustomerProfile = ():React.JSX.Element => {
    const {user, isLoading} = useAuth(); 
    if(isLoading) return <div className='flex items-center justify-center bg-background'>
        <Spinner size='md'></Spinner>
    </div>

    return (
        <div>
            hello ${user?.name}
        </div>
    );
}

export default CustomerProfile;
