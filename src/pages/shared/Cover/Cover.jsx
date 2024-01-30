import React from 'react';
import { Parallax } from 'react-parallax';

const Cover = ({img,heading,subHeading}) => {
    return (
<div>
    
        
<Parallax className='my-16 w-full object-cover'
            blur={{ min: -15, max: 15 }}
            bgImage={img}
            bgImageAlt="the dog"
            strength={-200}
        >
            <div className="hero min-h-screen">
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold uppercase">{heading}</h1>
                        <p className="mb-5">{subHeading}</p>
                       
                    </div>
                </div>
            </div>
        </Parallax>
</div>
        
    );
};

export default Cover;