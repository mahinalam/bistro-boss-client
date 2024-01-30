import React, { useState } from 'react';
import SectionTitle from '../../../components/SectionTitle';
import { FaUtensils } from "react-icons/fa";
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useMenu from '../../../hooks/useMenu';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import AddItemForm from './AddItemForm';

const AddItem = () => {
    const [categoryValue, setCategoryValue] = useState('')
    const [axiosSecure] = useAxiosSecure()
    const [, refetch] = useMenu()
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const price = parseFloat(form.price.value);
        const recipe = form.recipe.value;
        const image = form.image.files[0]
        const category = categoryValue;
        const formData = new FormData()
        formData.append('image', image)
        await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_SECRET_KEY}`, formData)
            .then(res => {
                if (res.data.success) {
                    const imageURL = res.data.data.display_url
                    const menuItem = { name, recipe, image: imageURL, category, price }
                    axiosSecure.post(`/menu`, menuItem)
                        .then(res => {
                            if (res.data.insertedId) {
                                refetch()
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: `${name} Item added Successfully`,
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                navigate('/')
                            }
                        })
                }
            })
    }
    return (
        <div className=''>
            <SectionTitle isWidthHalf={true} subHeading="What's new" heading="Add an Item"></SectionTitle>
            <AddItemForm handleSubmit={handleSubmit} setCategoryValue={setCategoryValue}></AddItemForm>

        </div>
    );
};

export default AddItem;