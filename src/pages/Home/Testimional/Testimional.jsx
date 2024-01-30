
import SectionTitle from '../../../components/SectionTitle';
import axios from 'axios';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { FaQuoteLeft } from "react-icons/fa6";
import useReview from '../../../hooks/useReview';

const Testimional = () => {
    const [reviews] = useReview()
    return (
        <div className=''>
            <div className='mt-0'>
                <SectionTitle subHeading="what our client say" heading="testimionals"></SectionTitle>
            </div>
            <>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {
                        reviews.map((item, index) => <SwiperSlide
                            key={index}>
                            <div className='px-10 md:px-32 md:flex-col gap-6 justify-center items-center'>
                                <Rating className='my-6 mx-auto' style={{ maxWidth: 250 }} readOnly value={item.rating}>

                                </Rating>
                                <FaQuoteLeft className='mx-auto' size={100}></FaQuoteLeft>
                                <div className='text-center'>
                                    <p>{item.details}</p>
                                    <p className='text-3xl text-yellow-600 mt-2'>{item.name}</p>
                                </div>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </>

        </div>
    );
};

export default Testimional;