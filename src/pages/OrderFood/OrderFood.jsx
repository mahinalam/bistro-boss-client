import React, { useState } from 'react';
import Cover from '../shared/Cover/Cover';
import img from '../../assets/shop/banner2.jpg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../hooks/useMenu';
import OrderTab from './OrderTab';
import { useParams } from 'react-router-dom';

const OrderFood = () => {
    const categories = ['salad','pizza','soup','dessert','drinks']
    const {category} = useParams()
    console.log(category)
    const initialIndex = categories.indexOf(category)
    const [tabIndex,setTabIndex] = useState(initialIndex)
    const [menu] = useMenu()

    const offered = menu.filter(item => item.category === 'offered')
    const salads = menu.filter(item => item.category === 'salad')
    const soups = menu.filter(item => item.category === 'soup')
    const pizzas = menu.filter(item => item.category === 'pizza')
    const drinks = menu.filter(item => item.category === 'drinks')
    const desserts = menu.filter(item => item.category === 'dessert')
    

    return (
        <div>
            <Cover img={img} heading="Order Food" subHeading="WOULD YOU LIKE TO TRY A DISH"></Cover>
            <div>
                <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                        <Tab >SALAD</Tab>
                        <Tab >PIZZA</Tab>
                        <Tab >SOUPS</Tab>
                        <Tab >DESSERTS</Tab>
                        <Tab >DRINKS</Tab>
                    </TabList>

                    <TabPanel>
                   <OrderTab items={salads}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                    <OrderTab items={pizzas}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                    <OrderTab items={soups}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                    <OrderTab items={desserts}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                    <OrderTab items={drinks}></OrderTab>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default OrderFood;