import { Rating, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle';
import { MdRateReview } from "react-icons/md";
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useReview from '../../../hooks/useReview';

const AddReview = () => {
    const { user } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()
    const [value, setValue] = useState(1)
    const navigate = useNavigate()
    const [, refetch] = useReview()

    const handleSubmit = (e) => {
        e.preventDefault()
        const reviewInfo = {
            email:user.email,
            name: user?.displayName,
            details: e.target.details.value,
            rating: parseInt(value)
        }
        axiosSecure.post('/reviews', reviewInfo)
            .then(res => {
                if (res.data.insertedId) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.displayName} Thanks for Your valuable feedback`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/')
                }
            })
            .catch(err => console.log(err))

    };
    return (
        <div>

            <div>
                <SectionTitle isWidthHalf={true} heading="Give A Review" subHeading="Sharing is Caring!!!"></SectionTitle>
            </div>
            <div className='text-center'>
                <h2 className='uppercase text-3xl mb-4'>Rate Us!</h2>

                <Rating

                    name="simple-controlled"
                    size='large'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                // onChange={(event, newValue) => {
                //     setValue(newValue);
                // }}
                />
            </div>
            {/* </div> */}

            <section>
                <form onSubmit={handleSubmit} className='p-6 bg-[#F3F3F3] md:ml-16 pl-16 my-16 py-16'>
                    <div className='mb-4'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text font-semibold">Which recipe you liked most?</span>
                            </div>
                            <input type="text" placeholder="Recipe you liked most" name='name' className="input input-bordered w-full" />
                        </label>
                    </div>

                    <div className='mb-4'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text font-semibold">Do you have any suggestion for us?</span>
                            </div>
                            <input name='price' type="text" placeholder="Suggestion" className="input input-bordered w-full" />

                        </label>
                    </div>

                    <div>
                        <div className="label">
                            <span className="label-text font-semibold">Kindly express your care in a short way.</span>
                        </div>
                        <textarea name='details' className="textarea w-full h-[200px]" placeholder="Review in detail"></textarea>
                    </div>
                    <br />
                    {/* <span className="flex px-5 py-2  bg-[#886125] text-white">Add Item <FaUtensils className='inline '></FaUtensils></span> */}
                    <div className='mt-6 inline-flex bg-[#886125] py-2 px-6 items-center'>
                        <button type='submit' className='text-white mr-2 font-semibold'>Send Review</button>
                        <MdRateReview className='text-white'></MdRateReview>
                    </div>
                </form>
            </section>

        </div>
    );
};

export default AddReview;