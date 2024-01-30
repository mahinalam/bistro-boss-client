import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../providers/AuthProvider';
import useCart from '../../../hooks/useCart';
import { ImSpinner9 } from 'react-icons/im';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const BookingCheckoutForm = ({ price, bookingInfo }) => {
    const stripe = useStripe();
    const elements = useElements()
    const { user } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()
    const [, refetch] = useCart()
    const [cardError, setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [processing, setprocessing] = useState(false)
    const [transactionId, setTransactionId] = useState('')
    const navigate = useNavigate()


    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [price, axiosSecure, bookingInfo])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setCardError('')
        setTransactionId('')

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)
        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('error', error)
            setCardError(error.message)
        }


        setprocessing(true)

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'anonymous',
                        email: user?.email || 'unknown'
                    },
                },
            },
        );

        if (confirmError) {
            setprocessing(false)
            setCardError(confirmError.message)

        }

        console.log('[paymentIntent]', paymentIntent)




        if (paymentIntent.status === "succeeded") {
            setprocessing(false)
            const transactionId = paymentIntent.id
            setTransactionId(transactionId)

            //save payment information to the server
            const payment = {
                ...bookingInfo, transactionId

            }
            axiosSecure.post('/payments/bookings', payment)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Payment Successfull",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }

                })
                .catch(err => {
                    console.log(err);
                })

            axiosSecure.post('/bookings', bookingInfo)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        navigate('/dashboard/all-booking')
                    }

                })
                .catch(err => {
                    console.log(err);
                })



        }

    }

    return (
        //    <>
        <>
            <form onSubmit={handleSubmit} className='w-10/12 mx-auto'>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}

                />
                {processing ? <button className='btn btn-sm'><ImSpinner9 className='animate-spin'></ImSpinner9></button> : <button className='btn btn-info mt-4 btn-sm text-white' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>}
            </form>
            {cardError && <p className='text-red-600'>{cardError}</p>}
            {transactionId && <p className='text-green-600'>Transaction Complete with Transaction Id: {transactionId}</p>}

        </>
        // </>
    );

};

export default BookingCheckoutForm;