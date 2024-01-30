import React from 'react';
import FoodCart from '../../shared/FoodCart/FoodCart';
import SectionTitle from '../../../components/SectionTitle';
import useMenu from '../../../hooks/useMenu';
import { Link } from 'react-router-dom';

const ChefRecommends = () => {
    const [menu] = useMenu()
    const items = menu.filter(salad => salad.category === 'salad').slice(0, 3)


    return (<div>
        <SectionTitle subHeading="Should try" heading='chef recommends'></SectionTitle>
        <div className='grid md:grid-cols-3 grid-cols-1 gap-10'>

            {
                items.map((item, index) => <Link key={index}  to='/order-food/salad'><FoodCart item={item}></FoodCart></Link>)

            }

        </div>
    </div>
    );
};

export default ChefRecommends;