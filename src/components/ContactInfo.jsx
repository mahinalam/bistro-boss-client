import React from 'react';

const  ContactInfo = ({ icon, title, info1, info2 }) => {
    return (
        <div className='flex flex-col md:pb-24 w-9/12 md:w-full mx-auto'>
            <div className='bg-[#D1A054] text-white px-5 py-3 flex justify-center'>
          <span>{icon}</span>
            </div>
            <div className='flex flex-col text-center justify-center items-center bg-[#F3F3F3] px-6 py-12'>
              <div>
              <p className='font-medium  uppercase'>{title}</p>
                <p className='font-medium '>{info1}</p>
                <p className='font-medium'>{info2}</p>
              </div>
            </div>
        </div>
    );
};

export default ContactInfo;