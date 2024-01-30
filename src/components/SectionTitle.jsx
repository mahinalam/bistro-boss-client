import React from 'react';

const SectionTitle = ({heading,subHeading,isWidthHalf}) => {
    return (
        <div className={isWidthHalf ? 'md:w-1/2 w-9/12 mx-auto my-14 text-center' : 'md:w-4/12 mx-auto my-14 text-center'}>
            <p className='text-yellow-600 italic text-xl'>---{subHeading}---</p>
           
            <p className='mt-4 border-y-2 py-5 text-3xl sm:text-4xl font-medium uppercase'>{heading}</p>
        </div>
    );
};

export default SectionTitle;