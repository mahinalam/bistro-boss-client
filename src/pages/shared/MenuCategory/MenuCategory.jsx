import axios from 'axios';
import React, { useEffect, useState } from 'react';


const MenuCategory = ({ image, name, recipe, price }) => {


    return (
        <div className=' flex items-center justify-between gap-6'>
            <div className='w-[118px]'>
                <img className='w-full '  style={{borderRadius : '0 200px 200px 200px'}} src={image} alt="" />

            </div>
            <div className='' >
                <p className='mt-2'>{name}---------</p>
                <p>{recipe}</p>
            </div>
            <div>
                <p className='text-yellow-600'>${price}</p>
            </div>
        </div>
    );
};

export default MenuCategory;