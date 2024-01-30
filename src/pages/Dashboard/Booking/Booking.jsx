import React, { useContext, useRef, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle';
import { FaTableCells } from "react-icons/fa6";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Payment from '../../../assets/dashboard/Payment/Payment';
import BookingPayment from '../BookingPayment/BookingPayment';
import DashboardLoader from '../../../components/Loader/DashboardLoader';
import img from '../../../assets/others/loader2.gif'
import ContactInfo from '../../../components/ContactInfo';
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import { ImLocation2 } from "react-icons/im";
import { FaClock } from "react-icons/fa6";



const Booking = () => {
    const [isPayment, setIsPayment] = useState(false)
    const { user, loading } = useContext(AuthContext)
    const navigate = useNavigate()
    const [axiosSecure] = useAxiosSecure()
    const priceRef = useRef()
    const [price, setPrice] = useState(null)
    const [bookingInfo, setBookingInfo] = useState(null)
    console.log(loading);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        setIsPayment(true)
        const price = parseInt(data.quest * 20)
        setPrice(price)

        const bookingInfo = { ...data, price, category: 'book table', status: 'pending' }
        setBookingInfo(bookingInfo)



    }
    return (
        <>
             {!isPayment ? <div className='md:ml-16'>
                <SectionTitle subHeading="Reservation" heading="Book a Table" isWidthHalf={true}></SectionTitle>
                <form onSubmit={handleSubmit(onSubmit)} className='' >
                    <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-3 gap-5 text-center'>
                        <label className="form-control md:w-full w-9/12 mx-auto">
                            <div className="label">
                                <span className="label-text font-semibold text-lg">Date*</span>
                            </div>
                            <input {...register("date")} required type="date" placeholder="" className="input input-bordered w-full" />
                        </label>
                        <label className="form-control md:w-full w-9/12 mx-auto">
                            <div className="label">
                                <span className="label-text text-lg">Time*</span>
                            </div>
                            <input {...register("time")} required type="time" placeholder="Type here" className="input input-bordered w-full " />
                        </label>
                        <label className="form-control md:w-full w-9/12 mx-auto">
                            <div className="label">
                                <span className="label-text text-lg">Quest*</span>
                            </div>
                            <input  {...register("quest", { min: 1, max: 4 })} required type="number" placeholder="1 person" className="input input-bordered w-full " />
                            {errors.quest?.type === "min" && (
                                <span className='text-red-600' role="">Need at least 1 Quest</span>
                            )}
                            {errors.quest?.type === "max" && (
                                <span className='text-red-600' role="">Highest 4 Quest available</span>
                            )}
                        </label>
                        <label className="form-control md:w-full w-9/12 mx-auto">
                            <div className="label">
                                <span className="label-text font-semibold text-lg">Name*</span>
                            </div>
                            <input {...register("name")} required type="text" placeholder="Your Name" className="input input-bordered w-full " />
                        </label>
                        <label className="form-control md:w-full w-9/12 mx-auto">
                            <div className="label">
                                <span className="label-text text-lg">Phone*</span>
                            </div>
                            <input {...register("phone")} required type="number" placeholder="Phone Number" className="input input-bordered w-full " />
                        </label>
                        <label className="form-control md:w-full w-9/12 mx-auto">
                            <div className="label">
                                <span className="label-text text-lg">Email*</span>
                            </div>
                            <input defaultValue={user?.email} readOnly {...register("email")} type="email" placeholder="Email" className="input input-bordered w-full " />
                        </label>
                    </div>
                    <div className='text-center mt-8'><button type='submit' className='btn bg-[#865F24] text-white'>Book A Table <FaTableCells /></button></div>
                </form>


                <div className=''>
                    <SectionTitle isWidthHalf={true} subHeading="Visit us" heading="Our Location"></SectionTitle>
                    <div className='grid md:grid-cols-3 grid-cols-1 gap-6'>
                        <ContactInfo title="Phone" info1="+38 (012) 34 56 789" info2="+38 (012) 34 56 125" icon={<LiaPhoneVolumeSolid size={30} className='text-white' />}></ContactInfo>
                        <ContactInfo title="ADDRESS" info1="+38 (012) 34 56 789" info2="+38 (012) 34 56 787" icon={<ImLocation2 size={30} className='text-white' />}></ContactInfo>
                        <ContactInfo title="WORKING HOURS" info1="Fri: 08:00 - 22:00" info2="Sat - Sun: 10:00 - 23:00" icon={<FaClock size={30} className='text-white' />}></ContactInfo>

                    </div>
                </div>
            </div> :

                <BookingPayment price={price} bookingInfo={bookingInfo}></BookingPayment>}
        </>
    );
};

export default Booking;