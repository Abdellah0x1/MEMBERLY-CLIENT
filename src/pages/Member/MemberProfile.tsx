import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const MemberProfile = (): React.JSX.Element => {
    const {user} = useAuth()
    return (
        <div>
            hello {user?.name}
        </div>
    );
}

export default MemberProfile;
