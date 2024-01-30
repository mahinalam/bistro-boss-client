// import axios from 'axios';
import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import useCart from '../../../hooks/useCart';
// import Swal from 'sweetalert2';
// import { AuthContext } from '../../../providers/AuthProvider';
const FoodCart = ({ item, handleAddToCart }) => {
    const { image, name, recipe, price, _id } = item;


    return (
        <div className="card  shadow-xl md:h-[80vh] sm:h-[50vh]">
            <figure className='h-[300px]'><img className='w-full h-full rounded' src={image} alt="Shoes" /></figure>
            <p className='bg-black text-white absolute top-0 right-0 py-1 px-4 rounded mt-3 mr-6'>{price}</p>
            <div className="card-body flex-col justify-center items-center">
                <h2 className="card-title my-1 font-bold">{name}</h2>
                <p className='text-center'>{recipe}</p>
                <div  className="card-actions">
                    <button onClick={() => handleAddToCart(item)}  className="btn p-4 border-b-2 border-b-orange-600 bg-[#E8E8E8]text-orange-600 mt-2">Order Food</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCart;