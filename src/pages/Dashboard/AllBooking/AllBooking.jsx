import React, { useContext, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle';
import { AuthContext } from '../../../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { RiDeleteBin5Line } from "react-icons/ri";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import ReusuableComponent from '../../../shared/ReusuableComponent/ReusuableComponent';
import DashboardLoader from '../../../components/Loader/DashboardLoader';
import img from '../../../assets/others/loader3.gif'



const AllBooking = () => {
    const { user, isLoading, loading } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()

    const { data: userBooking = [], refetch, isLoading: userBookingLoading = false } = useQuery({
        queryKey: ['user-bookings', user?.email],
        enabled: !isLoading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-bookings?email=${user?.email}`)
            console.log(res.data);
            return res.data
        }

    })
    console.log(userBooking);
    const price = userBooking.reduce((sum, item) => sum + item.price, 0)
    console.log(price);


    const handleDelete = (item) => {
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
                axiosSecure.delete(`/bookings/${item._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);

                    })

            }
        });

    }


    return (
        <>
            {!userBookingLoading ? <>   {userBooking && Array.isArray(userBooking) && userBooking.length > 0 ? <>   <div className='  md:px-10 md:py-10'>
                <div className=' '>

                    <div>
                        <SectionTitle subHeading="Excellent Ambience" heading="MY BOOKINGS" isWidthHalf={true} ></SectionTitle>
                    </div>

                    <div className='mt-6 md:pb-10'>
                        <div>
                            <div className='flex uppercase sm:pb-10 pb-6 md:px-2'>
                                <h2 className='sm:text-3xl  text-2xl sm:pr-10 pr-7 font-semibold'>Total Bookings: {userBooking.length}</h2>
                                <h2 className='sm:text-3xl  text-2xl font-semibold'>Total Price: ${price}</h2>

                            </div>
                            <div className="overflow-x-auto">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th>
                                                #
                                            </th>
                                            <th>QUEST NUMBER</th>
                                            <th>CATEGORY</th>
                                            <th>PRICE</th>
                                            <th>ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            userBooking.map((item, index) => <tr key={item._id}>
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td>{item.quest}</td>
                                                <td>{item.category}</td>
                                                <td>${item.price}</td>
                                                <td onClick={() => handleDelete(item)} className='text-red-600'><RiDeleteBin5Line size={30} /></td>

                                            </tr>)
                                        }

                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div></> : <><ReusuableComponent
                heading="No Bookings Data available"
                title="Add Booking"
                address="/dashboard/reservation"
            ></ReusuableComponent></>}</> : <><DashboardLoader img={img}></DashboardLoader></>}
        </>
    );
};

export default AllBooking;