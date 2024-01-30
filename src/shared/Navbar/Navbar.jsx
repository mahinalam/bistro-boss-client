import React, { useContext, useState } from 'react';
import img from '../../../src/assets/home/featured.jpg'
import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import useCart from '../../hooks/useCart';
import { AuthContext } from '../../providers/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import avatar from '../../assets/others/profile.png'

//TODO: make navbar responsive

const Navbar = () => {
    // const {user} = useContext(AuthContext)
    const { user, loading, logOut, setLoading } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)
    const [cart] = useCart()
    const [isAdmin] = useAdmin()



    const handleLogOut = () => {
        logOut()
            .then(() => {
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (

        <>
            <div className='fixed top-0 left-0 right-0 z-10 mx-auto max-w-screen-xl xl:px-20 md:px-10 sm:px-2 px-4'>
                <div className='flex justify-between items-center bg-[rgba(21, 21, 21, 0.50)] text-white font-bold bg-opacity-25 '>
                    <div className='sm:pl-10 sm:pt-4 sm:block pl-4 pt-1 sm:text-xl text-lg'>
                        {/* <img src="" height={100} width={100} alt="" /> */}
                        <p className='italic'>BISTRO BOSS</p>
                        {/* <p className='italic'>BOSS</p> */}
                    </div>

                    <div className=''>
                        <nav id='sidebar' className='md:flex items-center justify-between hidden md:pr-4 pt-4'>

                            <p className=' font-bold'> <NavLink to='/'
                                className='mr-4 uppercase '   >Home</NavLink ></p>
                            <NavLink to={`${isAdmin ? '/dashboard/admin-home' : '/dashboard/user-home'}`} className='mr-4 uppercase '>Dasboard</NavLink>
                            <NavLink to='/menu' className='mr-4 uppercase '>Our Menu</NavLink>
                            <NavLink to='/order-food/salad' className=' uppercase flex items-center '><span>Order Food</span></NavLink>
                            <NavLink to='/dashboard/my-cart' className='flex px-2'><FaShoppingCart size={20} className='text-secondary ' /> <span className='badge badge-secondary'>{cart?.length || 0}</span></NavLink>
                            {/* {user ? <NavLink><button><div className="">
                            <div className=" rounded-full">
                                <img src={user?.photoURL} className='w-[50px] rounded-full' />
                            </div>r
                        </div></button></NavLink> : <button> Logout</button>} */}

                            {user ? <><span onClick={handleLogOut} className='flex items-center gap-2 '><span className='uppercase' >Logout</span> <img src={user?.photoURL} alt="" className='w-[50px] h-[50px] rounded-full' /></span></> : <><NavLink to='/login' className="flex items-center gap-2"><span className='uppercase'>Login</span><img src={avatar} alt="" className='h-[50px] w-[50px] rounded-full ' /></NavLink></>}

                        </nav>
                        <div className='relative md:hidden'>
                            <button onClick={() => setIsOpen(!isOpen)} className="btn btn-square btn-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </button>
                            {isOpen && <div className='absolute right-0 top-12 '>
                                <div className='font-semibold  py-2 w-[35vw] bg-[#FFFFFF] text-gray-900 md:py-2  pl-10 rounded-xl'>
                                    <p className='mb-3'><Link to='/'>Home</Link></p>
                                    <p className='mb-3'><Link to='/dashboard/user-home'>Dashboard</Link></p>
                                    {user ? <> <p onClick={handleLogOut}><Link>Logout</Link></p> </> : <><p><Link to='/login'>Login</Link></p></>}
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
        // </div>

        //   </div>
    );
};

export default Navbar;