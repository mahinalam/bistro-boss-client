import React from 'react';
import useMenu from '../../../hooks/useMenu';
import MenuCategory from '../MenuCategory/MenuCategory';

const MenuItem = ({items}) => {
   
    return (
        <div className='grid md:grid-cols-2 grid-cols-1 items-center justify-center gap-6'>
            {
                items.map((item, index) => <MenuCategory image={item.image} name={item.name} price={item.price} recipe={item.recipe} key={index}></MenuCategory>)
            }
        </div>
    );
};

export default MenuItem;