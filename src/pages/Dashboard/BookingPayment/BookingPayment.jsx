import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import BookingCheckoutForm from './BookingCheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)

const BookingPayment = ({price,bookingInfo}) => {
    return (
        <div className='md:ml-16'>
            <SectionTitle subHeading="please process" heading="Payment" isWidthHalf={true}></SectionTitle>
            <Elements stripe={stripePromise}>
                <BookingCheckoutForm price={price} bookingInfo={bookingInfo}></BookingCheckoutForm>
            </Elements>
        </div>
    );
};

export default BookingPayment;