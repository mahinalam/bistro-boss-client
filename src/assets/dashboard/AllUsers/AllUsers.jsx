import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import img from '../../../assets/others/loader3.gif'
import { RiDeleteBin5Fill } from "react-icons/ri";
import { RiAdminFill } from "react-icons/ri";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import ReusuableComponent from '../../../shared/ReusuableComponent/ReusuableComponent';
import DashboardLoader from '../../../components/Loader/DashboardLoader';
import SectionTitle from '../../../components/SectionTitle';

const AllUsers = () => {
    const { user, loading } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()
    const { data: users = [], refetch,isLoading: usersLoading = false } = useQuery({
        queryKey: ['users', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`)
            console.log(res.data)
            return res.data;
        }
    });


    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user.email}`)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: `${user.name} is an admin now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleDelete = user => {
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
                axiosSecure.delete(`/users/${user?.email}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                position: "top",
                                icon: "success",
                                title: `${user.name} user deleted successfully`,
                                // showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }
        });

    }

    return (
        <>
         {!usersLoading ? <>   {users && Array.isArray(users) && users.length ? <>
            <SectionTitle subHeading="How many??" heading="MANAGE ALL USERS" isWidthHalf={true} /> 
            <div className='sm:pl-16 pb-10'>

             
                <div>
                    <h2 className='sm:text-3xl text-2xl sm:pb-5 pb-4 font-semibold'>TOTAL USERS: {users.length}</h2>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead className='bg-[#D1A054] text-white '>
                                <tr>
                                    <th className='p-5'>
                                        #
                                    </th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>ROLE</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user, index) => <tr key={user._id}>
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user?.role === 'admin' ? 'admin' : <button onClick={() => handleMakeAdmin(user)} className='btn bg-yellow-600 text-white'><RiAdminFill size={20} /></button>}</td>
                                        <td>
                                            <button onClick={() => handleDelete(user)} className='btn text-white bg-red-600' ><RiDeleteBin5Fill size={20}></RiDeleteBin5Fill></button>
                                        </td>
                                    </tr>)
                                }

                            </tbody>

                        </table>
                    </div>
                </div>
            </div></> : <><ReusuableComponent heading="No Users Found!" title="Go Home" address='/'></ReusuableComponent></>}</> : <><DashboardLoader img={img} /></>}
        </>
    );
};

export default AllUsers;