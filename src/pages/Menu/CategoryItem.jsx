import React from 'react';
import Cover from '../shared/Cover/Cover';
import img from '../../assets/menu/banner3.jpg'
import SectionTitle from '../../components/SectionTitle';
import useMenu from '../../hooks/useMenu';
import MenuItem from '../shared/MenuItem/MenuItem';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

const CategoryItem = ({ cover,menuItem,to }) => {
    // const [menu] = useMenu()
    // const offered = menu.filter(item => item.category === 'offered')
    // const salads = menu.filter(item => item.category === 'salad')
    // const soups = menu.filter(item => item.category === 'soup')
    // const pizzas = menu.filter(item => item.category === 'pizza')
    // const drinks = menu.filter(item => item.category === 'drinks')
    // const desserts = menu.filter(item => item.category === 'dessert')
    // const popular = menu.filter(item => item.category === 'popular')
    return (
        <div>
            {cover}
            {menuItem}
            <Link to={`/order-food/${to}`}><Button title="order your favourite food"></Button></Link>

        </div>
    );
};

export default CategoryItem;