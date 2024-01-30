import React from 'react';
import { FaUtensils } from 'react-icons/fa';

const AddItemForm = ({handleSubmit,setCategoryValue}) => {
    return (
        <div className=''>
          
            <form onSubmit={handleSubmit} className='p-10 bg-[#F3F3F3] sm:pb-0 pb-10 sm:py-16 sm:px-16'>
                <div className='mb-4'>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text font-semibold">Recipe Name*</span>
                        </div>
                        <input type="text" placeholder="Recipe Name" name='name' className="input input-bordered w-full" />
                    </label>
                </div>
                <div className='grid md:grid-cols-2 grid-cols-1 justify-between gap-6'>
                    <div className='mb-4'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text font-semibold">Category*</span>
                            </div>
                            <select onChange={(e) => setCategoryValue(e.target.value)} name='category' defaultValue="Pick One" className="select w-full ">
                                <option disabled >Pick One</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
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
                            <input name='price' type="number" placeholder="Price" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
                <div>
                    <div className="label">
                        <span className="label-text font-semibold">Recipe Details*</span>
                    </div>
                    <textarea name='recipe' className="textarea w-full h-[200px]" placeholder="Recipe Details"></textarea>
                </div>
                <input name='image' className='file-input w-full max-w-xs mt-3' type="file" id="" />
                <br />
                {/* <span className="flex px-5 py-2  bg-[#886125] text-white">Add Item <FaUtensils className='inline '></FaUtensils></span> */}
                <div className='mt-6 inline-flex bg-[#886125] py-2 px-6 items-center'>
                    <button type='submit' className='text-white mr-2 font-semibold cursor-pointer'>Add Item</button>
                    <FaUtensils className='text-white'></FaUtensils>
                </div>
            </form>
        </div>
    );
};



{/* <form  className='p-6 bg-[#F3F3F3] md:ml-16 pl-16 my-16 py-16'>
<div className='mb-4'>
    <label className="form-control w-full">
        <div className="label">
            <span className="label-text font-semibold">Recipe Name*</span>
        </div>
        <input type="text" placeholder="Recipe Name" name='name' className="input input-bordered w-full" />
    </label>
</div>
<div className='grid md:grid-cols-2 grid-cols-1 justify-between gap-6'>
    <div className='mb-4'>
        <label className="form-control w-full">
            <div className="label">
                <span className="label-text font-semibold">Category*</span>
            </div>
            <select onChange={(e) => setCategoryValue(e.target.value)} name='category' defaultValue="Pick One" className="select w-full max-w-xs">
                <option disabled >Pick One</option>
                <option>Salad</option>
                <option>Pizza</option>
                <option>Soup</option>
                <option>Dessert</option>
                <option>Drinks</option>
            </select>
        </label>
    </div>
    <div className=''>
        <label className="form-control w-full">
            <div className="label">
                <span className="label-text font-semibold">Price*</span>
            </div>
            <input name='price' type="number" placeholder="Price" className="input input-bordered w-full" />
        </label>
    </div>
</div>
<div>
    <div className="label">
        <span className="label-text font-semibold">Recipe Details*</span>
    </div>
    <textarea name='recipe' className="textarea w-full h-[200px]" placeholder="Recipe Details"></textarea>
</div>
<input name='image' className='file-input w-full max-w-xs mt-3' type="file" id="" />
<br />
{/* <span className="flex px-5 py-2  bg-[#886125] text-white">Add Item <FaUtensils className='inline '></FaUtensils></span> */}
// {/* <div className='mt-6 inline-flex bg-[#886125] py-2 px-6 items-center'>
//     <button type='submit' className='text-white mr-2 font-semibold'>Add Item</button>
//     <FaUtensils className='text-white'></FaUtensils>
// </div>
// </form> */} */}

export default AddItemForm;