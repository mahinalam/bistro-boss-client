import React from 'react';

const DashboardLoader = ({img}) => {
    return (
        <div className='flex justify-center items-center h-[100vh]'>
             <img className='w-[100px] ' src={img} alt="" />
        </div>
    );
};

export default DashboardLoader;