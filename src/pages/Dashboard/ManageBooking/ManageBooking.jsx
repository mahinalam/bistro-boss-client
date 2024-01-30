import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import useBooking from '../../../hooks/useBooking';
import { GoCheckCircleFill } from "react-icons/go";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import ReusuableComponent from '../../../shared/ReusuableComponent/ReusuableComponent';
import DashboardLoader from '../../../components/Loader/DashboardLoader';
import img from '../../../assets/others/loader3.gif'



const ManageBooking = () => {
    const [bookings, refetch, bookingsLoading] = useBooking()
    const [axiosSecure] = useAxiosSecure()

    const handleUpdate = (id, status) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, update it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/bookings/${id}`, { status })
                    .then(res => {
                        console.log(res.data);
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            swalWithBootstrapButtons.fire({
                                title: "Updated!",
                                text: "Status has been deleted.",
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
            {!bookingsLoading ? <> {bookings && Array.isArray(bookings) && bookings.length > 0 ? <>  <div>
                <div><SectionTitle subHeading="At a Glence" heading="Manage Bookings" isWidthHalf={true} > </SectionTitle></div>
                <div className='sm:pl-16 sm:pb-10'>
                    <h2 className='sm:text-3xl text-2xl font-semibold pb-6 uppercase'>Total Bookings: {bookings.length}</h2>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead className='bg-[#D1A054] text-white '>
                                <tr>
                                    <th className='p-5'>USER EMAIL</th>
                                    <th>PHONE NUMBER</th>
                                    <th>BOOKING DATE</th>
                                    <th>BOOKING TIME</th>
                                    <th>ACTIVITY</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                {/* row 1 */}
                                {
                                    bookings.map((booking, index) => <tr
                                        key={booking._id}
                                    >
                                        <td>{booking.email}</td>
                                        <td>{booking.phone}</td>
                                        <td>{booking.date}</td>
                                        <td>{booking.time}</td>
                                        <td className={`font-semibold ${booking.status === 'pending' ? 'text-[#AE7B2B]' : 'text-[#287855]'}`}>{booking.status}</td>
                                        <td onClick={() => handleUpdate(booking._id, 'done')}><GoCheckCircleFill className={`${booking.status === 'pending' ? 'text-[#80E2B7] bg-[#FFFFFF]' : 'text-[#287855] bg-[#FFFFFF]'}`} size={40} /></td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div></> : <><ReusuableComponent address='/' title="Go Home" heading="No Booking Data available"></ReusuableComponent></>}</> : <><DashboardLoader img={img} /> </>}
        </>
    );
};

export default ManageBooking;