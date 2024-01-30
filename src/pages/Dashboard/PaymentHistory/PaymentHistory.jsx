import React, { useContext } from 'react';
import SectionTitle from '../../../components/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import DashboardLoader from '../../../components/Loader/DashboardLoader';
import img from '../../../assets/others/loader3.gif'

const PaymentHistory = () => {
    const { user, isLoading } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()
    const { data: payments = [],isLoading: paymentsloading = false } = useQuery({
        queryKey: ['payments', user?.email],
        enabled: !isLoading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/user?email=${user?.email}`)
            console.log(res.data)
            return res.data;

        }
    })
    
    return (
     <>
     {!paymentsloading ? <>   <div className='sm:pl-16 '>
            <SectionTitle isWidthHalf={true} subHeading="At a Glancel" heading="Payment History"></SectionTitle>
            <div>
                <h2 className='sm:text-3xl text-2xl font-semibold pb-6 uppercase'>Total Payments: {payments?.length || 0}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className='bg-[#D1A054] text-white'>
                        <tr>
                            <th className='p-5'>EMAIL </th>
                            <th>CATEGORY</th>
                            <th>TOTAL PRICE</th>
                            <th>PAYMENT DATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map(payment => <tr key={payment._id}>
                                <td>{payment.email}</td>
                                <td>{payment.category}</td>
                                <td>${payment.price}</td>
                                <td>{payment.date.length > 10 ? payment.date.slice(0,10) : payment.date}</td>
                            </tr>)
                        }

                    </tbody>

                </table>
            </div>
        </div></> : <><DashboardLoader img={img} /></>}
     </>
    );
};

export default PaymentHistory;