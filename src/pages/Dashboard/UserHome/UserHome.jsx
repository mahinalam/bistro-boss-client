import React, { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import UserStat from '../../../components/UserStat';
import { HiMiniUsers } from 'react-icons/hi2';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { IoCart } from "react-icons/io5";
import DashboardLoader from '../../../components/Loader/DashboardLoader';
import img from '../../../assets/others/loader2.gif'

const UserHome = () => {
    const { user, isLoading } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()

    const { data: userStat = {}, isLoading: userStatLoading } = useQuery({
        queryKey: ['user-stat', user?.email],
        enabled: !isLoading,
        queryFn: async () => {
            const res = await axiosSecure(`/user-stat?email=${user.email}`)
            return res.data
        }
    })

    return (
        <>
            {!userStatLoading ? <>    <div className='sm:pl-4'>
                <h2 className='text-3xl font-semibold sm:py-4 sm:pt-5 pt-3'>{user.displayName}, Welcome Back! </h2>
                <div className='grid sm:grid-cols-3 grid-cols-1 gap-6 sm:py-0 py-10'>
                    <div className="stat bg-[#b455da] rounded-xl sm:w-full w-10/12 mx-auto">

                        <div className='flex justify-center items-center gap-5'>
                            <div>
                                <HiMiniUsers className=' text-white' size={40}>
                                </HiMiniUsers></div>
                            <div>
                                <p className='text-3xl font-semibold text-white'>{userStatLoading || userStat.menuItems}</p>
                                <p className=' text-white font-semibold text-xl'>Menu</p>
                            </div>
                        </div>
                    </div>
                    <div className="stat bg-[#D8AA62] rounded-xl sm:w-full w-10/12 mx-auto">

                        <div className='flex justify-center items-center gap-5'>
                            <div>
                                <HiMiniUsers className=' text-white' size={40}>
                                </HiMiniUsers></div>
                            <div>
                                <p className='text-3xl font-semibold text-white'>{userStatLoading || userStat.foodOrder}</p>
                                <p className=' text-white font-semibold text-xl'>Food</p>
                            </div>
                        </div>
                    </div>
                    <div className="stat bg-[#FE5B8F] rounded-xl sm:w-full w-10/12 mx-auto">

                        <div className='flex justify-center items-center gap-5'>
                            <div>
                                <HiMiniUsers className=' text-white' size={40}>
                                </HiMiniUsers></div>
                            <div>
                                <p className='text-3xl font-semibold text-white'>01234454</p>
                                <p className=' text-white font-semibold text-xl'>Contact</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid sm:grid-cols-2 sm:pt-8 grid-cols-1'>
                    <div className='flex flex-col items-center py-16 bg-[#FFEDD5] border-[#D1A054]  sm:border-r-2 border-b-2 sm:border-b-0' >
                        <div>
                            <img src={user?.photoURL} className='w-[150px] h-[150px] rounded-full border-2 border-[#D1A054]' alt="" />
                            <p className='text-3xl font-semibold text-center pt-5 uppercase'>{user?.displayName}</p>
                        </div>
                    </div>
                    <div className=' py-16 bg-[#FEF9C3]'>
                        <div className='flex flex-col pl-16'>
                            <h2 className='text-3xl uppercase font-semibold pb-4 pt-4'>YOUR ACTIVITIES</h2>
                            <div>
                                <p className='flex items-center gap-1 uppercase pb-1 text-[#0088FE]'><span><IoCart size={20} /></span><span>Orders: {userStatLoading || userStat.orders.length}</span> </p>
                                <p className='flex items-center gap-1 uppercase pb-1 text-[#00C4A1]'><span><IoCart size={20} /></span><span>Reviews: {userStatLoading || userStat.reviews.length}</span> </p>
                                <p className='flex items-center gap-1 uppercase pb-1 text-[#FFBB28]'><span><IoCart size={20} /></span><span>Bookings: {userStatLoading || userStat.bookings.length}</span> </p>
                                <p className='flex items-center gap-1 uppercase pb-1 text-[#FF8042]'><span><IoCart size={20} /></span><span>Payment: {userStatLoading || userStat.totalPayments}</span> </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div></> : <><DashboardLoader img={img}></DashboardLoader></>}
        </>
    );
};

export default UserHome;