import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { SiCashapp } from "react-icons/si";
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { HiMiniUsers } from "react-icons/hi2";
import { SiCodechef } from "react-icons/si";
import { ImTruck } from "react-icons/im";
import img from '../../../assets/others/loader3.gif'
import DashboardLoader from '../../../components/Loader/DashboardLoader';

const AdminHome = () => {
    const [axiosSecure] = useAxiosSecure()
    const { data: adminStat = {},isLoading: adminStatLoading = false } = useQuery({
        queryKey: ['admin-stat'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stat')
            return res.data;

        }


    });

    const { data: orderStat = [] } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/order-stats')
            console.log(res.data)
            return res.data
        }
    })

    return (
      <>
      {!adminStatLoading ? <>  <div>
            <div className='mt-10 max-w-screen-xl md:ml-10 overflow-x-auto'>
                <p className='text-4xl font-semibold mb-6'>Hi, Welcome Back!</p>
                <div className="stats shadow w-full gap-6 ">

                    <div className="stat bg-purple-300">
                        <div className='flex justify-center items-center gap-5'>
                            <div>
                                <SiCashapp className=' text-white' size={40}>
                                </SiCashapp></div>
                            <div>
                                <p className='text-3xl font-semibold text-white'>{adminStat.revenue}</p>
                                <p className=' text-white font-semibold text-xl'>Revenue</p>
                            </div>
                        </div>
                    </div>

                    <div className="stat bg-yellow-300">

                        <div className='flex justify-center items-center gap-5'>
                            <div>
                                <HiMiniUsers className=' text-white' size={40}>
                                </HiMiniUsers></div>
                            <div>
                                <p className='text-3xl font-semibold text-white'>{adminStat.customers}</p>
                                <p className=' text-white font-semibold text-xl'>Customers</p>
                            </div>
                        </div>
                    </div>

                    <div className="stat bg-red-300">

                        <div className='flex justify-center items-center gap-5'>
                            <div>
                                <SiCodechef className='text-white' size={40}></SiCodechef>
                            </div>
                            <div>
                                <p className='text-3xl font-semibold text-white'>{adminStat.products}</p>
                                <p className=' text-white font-semibold text-xl'>Products</p>
                            </div>
                        </div>


                    </div>
                    <div className="stat bg-blue-300">

                        <div className='flex justify-center items-center gap-5'>
                            <div>
                                <ImTruck className='text-white' size={40}></ImTruck>
                            </div>
                            <div>
                                <p className='text-3xl font-semibold text-white'>{adminStat.orders}</p>
                                <p className=' text-white font-semibold text-xl'>Orders</p>
                            </div>
                        </div>


                    </div>
                </div>
            </div>


        </div></> : <><DashboardLoader img={img} /></>}
      </>
    );
};

export default AdminHome;