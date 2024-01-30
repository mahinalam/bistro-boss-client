import React from 'react';
import { Link } from 'react-router-dom';

const ReusuableComponent = ({ address, heading, title }) => {
    return (
        <div className='flex flex-col items-center justify-center h-[100vh]'>
            <p className='sm:text-3xl text-2xl uppercase font-medium'>{heading}</p>
            <Link to={address}><button className='btn mt-4 btn-secondary'>{title}</button></Link>
        </div>
    );
};

export default ReusuableComponent;