import React, { useState } from 'react';
import useCart from '../../../hooks/useCart';
import TableRow from './TableRow';
import { RiDeleteBin6Fill } from "react-icons/ri";
import SectionTitle from '../../../components/SectionTitle';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import ReusuableComponent from '../../../shared/ReusuableComponent/ReusuableComponent';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Payment from '../../../assets/dashboard/Payment/Payment';
import img from '../../../assets/others/loader3.gif'
import DashboardLoader from '../../../components/Loader/DashboardLoader';

const MyCart = () => {
    const [isPayment, setIsPayment] = useState(false)
    const [cart, refetch,cardLoading] = useCart()
    const total = (cart.reduce((sum, item) => item.price + sum, 0))
    const [axiosSecure] = useAxiosSecure()

    const hanldeDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`${import.meta.env.VITE_API_URL}/carts/${item._id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(err => console.log(err))
            }
        });
    }

    return (
        <>
     {!cardLoading ? <>  {cart && Array.isArray(cart) && cart.length > 0 ? <>     {!isPayment ? <>     <div className=''>
                <SectionTitle isWidthHalf={true} subHeading="My Cart" heading="Wanna add more"></SectionTitle>
                <div className='bg-[#FFFFFF] px-16'>
                    <div className='flex justify-evenly items-center mb-10 sm:pt-0 pt-4'>
                        <h2 className='sm:text-3xl uppercase text-2xl font-semibold mr-2 sm:mr-0'>Total Orders: {cart.length}</h2>
                        <h3 className='sm:text-3xl uppercase text-2xl  font-semibold '>Total Price: {total}</h3>
                      <button onClick={() => setIsPayment(true)} className='btn text-white pl-2 bg-[#D1A054]'>Pay</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead className='bg-[#D1A054] text-white'>
                                <tr className=''>
                                    <th className='p-5'>
                                        #
                                    </th>
                                    <th >ITEM IMAGE</th>
                                    <th>ITEM NAME</th>
                                    <th>PRICE</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cart.map((item, index) => <tr key={item._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={item.image} />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {item.name}
                                        </td>
                                        <td>${item.price}</td>
                                        <td><button onClick={() => hanldeDelete(item)} className=' bg-red-600 text-white'><RiDeleteBin6Fill size={30} /></button></td>
                                    </tr>)
                                }
                            </tbody>

                        </table>
                    </div>
                </div>
            </div> </> : <><Payment></Payment></>}

          </> : <>  <> <ReusuableComponent
                heading="You didn't order any food yet"
                title="Order Food"
                address="/order-food/salad"

            ></ReusuableComponent> </></>}</> : <><DashboardLoader img={img} /></>}
        </>
    );
};

export default MyCart;