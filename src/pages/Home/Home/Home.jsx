import React from 'react';
import Banner from '../Banner/Banner';
import SectionTitle from '../../../components/SectionTitle';
import MenuSlide from '../MenuSlide/MenuSlide';
import Cover from '../../shared/Cover/Cover';
import MenuCategory from '../../shared/MenuCategory/MenuCategory';
import Button from '../../../components/Button';
import Category from '../Category/Category';
import Contact from '../../../components/Contact';
import ChefRecommends from '../ChefRecommeds/ChefRecommends';
import Testimional from '../Testimional/Testimional';
import img from '../../../assets/home/chef-service.jpg'

const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>
            <SectionTitle  subHeading="From 11.00am to 10.00pm" heading="Order online"></SectionTitle>
            <MenuSlide></MenuSlide>
            <Cover heading="Bistro Boss" img={img} subHeading="Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo."></Cover>
            <SectionTitle subHeading="check it out" heading="from our menu"></SectionTitle>
            <Category></Category>
            <Contact></Contact>
            <ChefRecommends></ChefRecommends>
            <Testimional></Testimional>
        </div>
    );
};

export default Home;