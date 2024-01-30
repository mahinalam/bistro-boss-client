import React from 'react';
import Cover from '../shared/Cover/Cover';
import menuImg from '../../assets/menu/banner3.jpg'
import SectionTitle from '../../components/SectionTitle';
import useMenu from '../../hooks/useMenu';
import MenuCategory from '../shared/MenuCategory/MenuCategory';
import Button from '../../components/Button';
import CategoryItem from './CategoryItem';
import MenuItem from '../shared/MenuItem/MenuItem';
import dessertImg from '../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../assets/menu/pizza-bg.jpg'
import saladImg from '../../assets/menu/salad-bg.jpg'
import soupImg from '../../assets/menu/soup-bg.jpg'
import drinkImg from '../../assets/menu/salad-bg.jpg'
import { Link } from 'react-router-dom';

const Menu = () => {
    console.log(import.meta.env.VITE_apiKey)
    const [menu] = useMenu()
    console.log(menu)
    const offered = menu.filter(item => item.category === 'offered')
    const salads = menu.filter(item => item.category === 'salad')
    const soups = menu.filter(item => item.category === 'soup')
    const pizzas = menu.filter(item => item.category === 'pizza')
    const drinks = menu.filter(item => item.category === 'drinks')
    const desserts = menu.filter(item => item.category === 'dessert')
    const popular = menu.filter(item => item.category === 'popular')



    return (
        <div>

            <section>
                <Cover img={menuImg} heading="Our Menu" subHeading="WOULD YOU LIKE TO TRY A DISH"></Cover>
                <SectionTitle subHeading="Don't miss" heading="Today's Offer"></SectionTitle>
                <MenuItem items={offered}></MenuItem>
                <Link to='/order-food/salad'><Button title="ORDER YOUR FAVOURITE FOOD"></Button></Link>
            </section>
            <CategoryItem
                cover={<Cover heading="Desserts" subHeading="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." img={dessertImg}></Cover>}
                menuItem={<MenuItem items={desserts}></MenuItem>}
                button={<Button></Button>}
                to='dessert'

            ></CategoryItem>
            <CategoryItem
                cover={<Cover heading="Pizza" subHeading="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." img={pizzaImg}></Cover>}
                menuItem={<MenuItem items={pizzas}></MenuItem>}
                button={<Button></Button>}
                to="pizza"

            ></CategoryItem>
            <CategoryItem
                cover={<Cover heading="Salads" subHeading="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." img={saladImg}></Cover>}
                menuItem={<MenuItem items={salads}></MenuItem>}
                button={<Button></Button>}
                to="salad"

            ></CategoryItem>
            <CategoryItem
                cover={<Cover heading="Soups" subHeading="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." img={soupImg}></Cover>}
                menuItem={<MenuItem items={soups}></MenuItem>}
                button={<Button></Button>}
                to="soup"

            ></CategoryItem>
            <CategoryItem
                cover={<Cover heading="Drinks" subHeading="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." img={drinkImg}></Cover>}
                menuItem={<MenuItem items={drinks}></MenuItem>}
                button={<Button></Button>}
                to="drinks"

            ></CategoryItem>

        </div>
    );
};

export default Menu;