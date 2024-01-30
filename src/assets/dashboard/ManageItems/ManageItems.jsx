import React, { useState } from 'react';
import SectionTitle from '../../../components/SectionTitle';
import useMenu from '../../../hooks/useMenu';
import { GrUpdate } from "react-icons/gr";
import { RiDeleteBin5Fill } from "react-icons/ri";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import UpdateItem from '../../../pages/Dashboard/UpdateItem/UpdateItem';
import ReusuableComponent from '../../../shared/ReusuableComponent/ReusuableComponent';
import img from '../../../assets/others/loader3.gif'
import DashboardLoader from '../../../components/Loader/DashboardLoader';

const ManageItems = () => {
    const [menu, refetch,menuLoading] = useMenu()
    const [axiosSecure] = useAxiosSecure()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [updateItemData,setUpdateItemData] = useState(null)

    const handleDeleteItem = item => {
        console.log(item);
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
                axiosSecure.delete(`/menu/${item._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                position: "top",
                                icon: "success",
                                title: `${item.name} deleted successfully`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/')
                        }
                    })
            }
        });



    }

    return (
        <>
  {!menuLoading ? <>   {menu && Array.isArray(menu) && menu.length > 0 ? <>       {!open ? <>  <div className='ml-16 overflow-x-auto pb-10'>
                <SectionTitle isWidthHalf={true} subHeading="Hury Up" heading="Manage aLL iTEMS"></SectionTitle>
                <div className='mb-5'>
                    <h2 className='sm:text-3xl text-2xl font-semibold uppercase'>Total Items: {menu?.length}</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-[#D1A054] text-white  '>
                            <tr className=''>
                                <th className='p-5 '>#</th>
                                <th>ITEM IMAGE</th>
                                <th>ITEM NAME</th>
                                <th>PRICE</th>
                                <th>ACTION</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menu.map((item, index) => <tr key={item._id}>
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
                                    <td>{item.name} </td>
                                    <td>{item.price}</td>
                                    <td>
                                        <button onClick={() => {
                                            setOpen(true)
                                            setUpdateItemData(item)
                                            }} className="btn text-white  bg-[#D1A054] btn-sm "><GrUpdate size={20} /></button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteItem(item)} className="btn text-white bg-[#B91C1C] btn-sm"><RiDeleteBin5Fill size={20} /></button>
                                    </td>
                                </tr>)
                            }

                        </tbody>

                    </table>
                </div>
            </div></> : <UpdateItem updateItemData={updateItemData}></UpdateItem>}</> : <><ReusuableComponent address='/dashboard/add-item' title="Add Item" heading="No Items available"></ReusuableComponent> </>}</> : <><DashboardLoader img={img} /></>}
        </>
    );
};

export default ManageItems;