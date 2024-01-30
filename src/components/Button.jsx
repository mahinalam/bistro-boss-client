import React from 'react';

const Button = ({ title }) => {
    return (
        <div className='w-full text-center my-16'>
            <button className='p-2 uppercase border-b-black border-b-2 font-medium '>{title}</button>
        </div>
    );
};

export default Button;