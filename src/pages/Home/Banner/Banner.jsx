import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import img1 from '../../../assets/home/01.jpg'
import img2 from '../../../assets/home/02.jpg'
import img3 from '../../../assets/home/03.png'
import img4 from '../../../assets/home/04.jpg'
import img5 from '../../../assets/home/05.png'
import img6 from '../../../assets/home/06.png'

const Banner = () => {
    return (
        <div className=''>
            <Swiper
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className='min-w-[360px]'>
                        <img className='object-cover' src={img1} alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='h-auto w-full' >
                        <img className='cover h-auto w-full' src={img2} alt="" />
                    </div></SwiperSlide>
                <SwiperSlide>
                    <div className='h-auto w-full' >
                        <img className='cover h-auto w-full' src={img3} alt="" />
                    </div></SwiperSlide>
                <SwiperSlide>
                    <div className='h-auto w-full' >
                        <img className='cover h-auto w-full' src={img4} alt="" />
                    </div></SwiperSlide>
                <SwiperSlide>
                    <div className='h-auto w-full' >
                        <img className='cover h-auto w-full' src={img5} alt="" />
                    </div></SwiperSlide>
                <SwiperSlide>
                    <div className='h-auto w-full' >
                        <img className='cover h-auto w-full' src={img6} alt="" />
                    </div></SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;