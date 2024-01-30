import React from 'react';

const UserStat = () => {
    return (
        <div className="stat bg-yellow-300">

            <div className='flex justify-center items-center gap-5'>
                <div>
                    <HiMiniUsers className=' text-white' size={40}>
                    </HiMiniUsers></div>
                <div>
                    <p className='text-3xl font-semibold text-white'>{adminStat.customers}</p>
                    <p className=' text-white font-semibold text-xl'>Customers</p>
                </div>
            </div>
        </div>
    );
};

export default UserStat;