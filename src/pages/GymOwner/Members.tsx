import React from 'react';

const Members = ():React.JSX.Element => {
    function inviteMember(){

    }

    return (
        <div>
            <button onClick={inviteMember} className='btn bg-neon'>Invite Member</button>
        </div>
    );
}

export default Members;
