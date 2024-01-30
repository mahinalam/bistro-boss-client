import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { IoCartSharp } from "react-icons/io5";
import { FaUsers, FaWallet } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { FaShoppingBasket } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { IoMdContact } from "react-icons/io";
import useCart from '../hooks/useCart';
import { FaUtensils } from "react-icons/fa";
import { TfiMenuAlt } from "react-icons/tfi";
import { FaBook } from "react-icons/fa";
import useAdmin from '../hooks/useAdmin';
import { MdRateReview } from "react-icons/md";
import { IoWallet } from "react-icons/io5";
import DashboardLoader from '../components/Loader/DashboardLoader';
import img from '../assets/others/loader3.gif'

const DashBoard = () => {
    const [cart] = useCart()
    const [isAdmin,isAdminLoading] = useAdmin()
    return (
    <>
    {!isAdminLoading ? <>    <div className="drawer lg:drawer-open ">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn bg-[#D1A054] text-white drawer-button lg:hidden">Open drawer</label>
                <Outlet></Outlet>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-[#D1A054] text-base-content">
                    {/* Sidebar content here */}
                    <nav id='sidebar1'>
                        {
                            isAdmin ? <>
                                <li><NavLink to='/dashboard/admin-home' 
                                ><AiFillHome size={20}></AiFillHome>ADMIN HOME</NavLink></li>
                                <li><NavLink to='/dashboard/add-item' ><FaUtensils size={20} />ADD ITEMS</NavLink></li>
                                <li><NavLink to='/dashboard/manage-items'><TfiMenuAlt size={20}></TfiMenuAlt>MANAGE ITEMS</NavLink></li>
                                <li><NavLink to='/dashboard/manage-bookings'><FaBook size={20}></FaBook>MANAGE BOOKINGS</NavLink></li>
                                <li><NavLink to='/dashboard/allusers'><FaUsers size={20}></FaUsers> ALL USERS</NavLink></li>
                                <div className="divider"></div>
                                <li><NavLink to='/'><AiFillHome size={20}></AiFillHome>Home</NavLink></li>
                                <li><NavLink to='/menu'><HiOutlineMenu size={20} />Menu</NavLink></li>
                                <li><NavLink to='/order-food/salad'><FaShoppingBasket size={20}></FaShoppingBasket>Order Food</NavLink></li>
                            </> : <>
                                <li><NavLink to='/dashboard/user-home'><AiFillHome size={20}></AiFillHome>User Home</NavLink></li>
                                <li><NavLink to='/dashboard/booking'><FaWallet size={20} />Reservation </NavLink></li>
                                <li><NavLink to='/dashboard/payment-history'><IoWallet size={20} />Payment History </NavLink></li>
                                <li><NavLink className="flex" to='/dashboard/my-cart'><IoCartSharp size={20}></IoCartSharp>My Cart <span className="badge badge-secondary">+{cart && cart.length || 0}</span></NavLink></li>
                                <li><NavLink to='/dashboard/review'><MdRateReview size={20} />Add Review</NavLink></li>
                                <li><NavLink to='/dashboard/all-booking'><MdRateReview size={20} />All Booking</NavLink></li>
                                <div className="divider"></div>
                                <li><NavLink to='/'><AiFillHome size={20}></AiFillHome>Home</NavLink></li>
                                <li><NavLink to='/menu'><HiOutlineMenu size={20} />Menu</NavLink></li>
                                <li><NavLink to='/order-food/salad'><FaShoppingBasket size={20}></FaShoppingBasket>Order Food</NavLink></li></>
                        }
                    </nav>

                </ul>

            </div>
        </div> </> : <><DashboardLoader img={img} /></>}
    </>
    );
};

export default DashBoard;