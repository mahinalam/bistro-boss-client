import axios from 'axios';
import React, { useState } from 'react';
import { FaUtensils } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import useMenu from '../../../hooks/useMenu';

const UpdateItem = ({ updateItemData }) => {
    const [,refetch] = useMenu()
    const [updateItem, setUpdateItem] = useState(updateItemData)
    const [axiosSecure] = useAxiosSecure()
    const navigate = useNavigate()
    console.log("UpdateItem", updateItem._id);

    const handleImageChange = async image => {
        const formData = new FormData()
        formData.append('image', image)
        await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_SECRET_KEY}`, formData)
            .then(res => {
                if (res.data.success) {

                    console.log(res.data.data.display_url);
                    setUpdateItem({ ...updateItem, image: res.data.data.display_url })
                }
            })
            .catch(err => console.log(err))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        
        const updatedMenuItem = Object.assign({}, { ...updateItem })
        delete updatedMenuItem._id;
        console.log("UpdatedMenuItem", updatedMenuItem);
        axiosSecure.put(`/menu/${updateItem._id}`, updatedMenuItem)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${updatedMenuItem.name} Updated Successfully`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/')
                }
            })
            .catch(err => {
                console.log(err);
            })


    }
    return (
        <div>
            <form onSubmit={handleSubmit} className='p-10 bg-[#F3F3F3] sm:pb-0 pb-10 sm:py-16 sm:px-16'>
                <div className='mb-4'>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text font-semibold">Recipe Name*</span>
                        </div>
                        <input onChange={(e) => setUpdateItem({...updateItem,name: e.target.value})} defaultValue={updateItem.name} type="text" placeholder="Recipe Name" name='name' className="input input-bordered w-full" />
                    </label>
                </div>
                <div className='grid md:grid-cols-2 grid-cols-1 justify-between gap-6'>
                    <div className='mb-4'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text font-semibold">Category*</span>
                            </div>
                            <select onChange={(e) => {
                                setUpdateItem({ ...updateItem, category: e.target.value })

                            }} defaultValue={updateItem.category} name='category' className="select w-full max-w-xs">
                                <option disabled >Pick One</option>
                                <option value="salad" >Salad</option>
                                <option value="pizza" >Pizza</option>
                                <option value="soup" >Soup</option>
                                <option value="dessert" >Dessert</option>
                                <option value="drinks" >Drinks</option>
                                <option value="popular">Popular</option>
                                <option value="offered">Offered</option>
                            </select>
                        </label>
                    </div>
                    <div className=''>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text font-semibold">Price*</span>
                            </div>
                            <input onChange={(e) => setUpdateItem({ ...updateItem, price: parseInt(e.target.value) })} defaultValue={updateItem.price} name='price' type="number" placeholder="Price" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
                <div>
                    <div className="label">
                        <span className="label-text font-semibold">Recipe Details*</span>
                    </div>
                    <textarea onChange={(e) => setUpdateItem({...updateItem,rcipe: e.target.value})} defaultValue={updateItem.recipe} name='recipe' className="textarea w-full h-[200px]" placeholder="Recipe Details"></textarea>
                </div>
                <input onChange={(e) => handleImageChange(e.target.files[0])} name='image' className='file-input w-full max-w-xs mt-3' type="file" id="" />
                <br />
                {/* <span className="flex px-5 py-2  bg-[#886125] text-white">Add Item <FaUtensils className='inline '></FaUtensils></span> */}
                <div className='mt-6 inline-flex bg-[#886125] py-2 px-6 items-center'>
                    <button type='submit' className='text-white mr-2 font-semibold cursor-pointer'>Update Item</button>
                    <FaUtensils className='text-white'></FaUtensils>
                </div>
            </form>
        </div>
    );
};

export default UpdateItem;

// onChange={(e) => setCategoryValue(e.target.value)}