import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import img1 from '../../../assets/home/slide1.jpg'
import img2 from '../../../assets/home/slide2.jpg'
import img3 from '../../../assets/home/slide3.jpg'
import img4 from '../../../assets/home/slide4.jpg'
import img5 from '../../../assets/home/slide5.jpg'

// import required modules
import { Pagination } from 'swiper/modules';

const MenuSlide = () => {
  return (
    <div className=''>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        // centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>

          <div className='md:py-16'>
            <img className='cover' src={img1} alt="" />
            <p className='md:-mt-16 -mt-100  uppercase text-white text-center md:text-4xl text-lg' >Salads</p>
          </div></SwiperSlide>
        <SwiperSlide>

          <div className='md:py-16'>
            <img className='cover' src={img2} alt="" />
            <p className='md:-mt-16 -mt-6 uppercase text-white text-center md:text-4xl text-lg' >Soups</p>
          </div></SwiperSlide>
        <SwiperSlide>

          <div className='md:py-16'>
            <img className='cover' src={img3} alt="" />
            <p className='md:-mt-16 -mt-6 uppercase text-white text-center md:text-4xl text-lg' >Pizzas</p>
          </div></SwiperSlide>
        <SwiperSlide>

          <div className='md:py-16'>
            <img className='cover' src={img4} alt="" />
            <p className='md:-mt-16 -mt-6 uppercase text-white text-center md:text-4xl text-lg' >Drinks</p>
          </div></SwiperSlide>

        <SwiperSlide>

          <div className='md:py-16'>
            <img className='cover' src={img5} alt="" />
            <p className='md:-mt-16 -mt-6 uppercase text-white text-center md:text-4xl text-lg' >Drinks</p>
          </div></SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MenuSlide;