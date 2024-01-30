// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
import React, { useState } from 'react';
// import MenuCategory from '../../shared/MenuCategory/MenuCategory';
import MenuItem from '../../shared/MenuItem/MenuItem';
import useMenu from '../../../hooks/useMenu';
import { Link } from 'react-router-dom';

const Category = () => {
    const [menu] = useMenu()
    const popular = menu.filter(item => item.category === 'popular')
    // const [menu, setMenu] = useState([])
    // axios.get('menu.json')
    //     .then(res => {
    //         // console.log(res.data)
    //         const filter = res.data.filter(item => item.category === 'salad')
    //         // console.log(filter)
    //         const updatedFilter = [...filter.slice(0,6)]
    //         setMenu(updatedFilter)
    //         // console.log(filter)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    return (
        // <div className='grid md:grid-cols-2 grid-cols-1 items-center justify-center gap-6'>
        //     {
        //         menu.map((item, index) => <MenuCategory image={item.image} name={item.name} price={item.price} recipe={item.recipe} key={index}></MenuCategory>)
        //     }
        // </div>
   <div>
         <MenuItem items={popular}></MenuItem>
        <div className='w-full text-center my-16'>
       <Link to='/menu'> <button className='p-2 uppercase border-b-black border-b-2 font-medium '>VIEW FULL MENU</button></Link>
    </div>
   </div>
    );
};

export default Category;