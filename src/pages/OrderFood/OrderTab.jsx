import React from 'react';
import FoodCart from '../shared/FoodCart/FoodCart';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

import Swal from 'sweetalert2';
import useCart from '../../hooks/useCart';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const OrderTab = ({ items }) => {
    const { user } = useContext(AuthContext)
    const [, refetch] = useCart()
    const [axiosSecure] = useAxiosSecure()
    const handleAddToCart = (item) => {
        console.log('item', item);
        const { _id, price, name, recipe, image, category } = item;
        if (user) {
            const saveCart = { itemId: _id, price, name, image, recipe, email: user?.email, category }
            axiosSecure.post(`/carts`, saveCart)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top",
                            icon: "success",
                            title: "Food added to the cart",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch()
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }


    return (
        <div className='grid md:grid-cols-3 grid-cols-1 gap-10'>

            {
                items.map((item, index) => <FoodCart handleAddToCart={handleAddToCart} key={index} item={item}></FoodCart>)

            }

        </div>
    );
};

export default OrderTab;