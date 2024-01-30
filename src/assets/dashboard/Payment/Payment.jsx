import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import useCart from '../../../hooks/useCart';



const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)

const Payment = () => {
    const [cart] = useCart()
    const price = cart.reduce((sum, item) => sum + item.price, 0)
    const total = parseFloat(price.toFixed(2))
    return (
        <div className='md:ml-16'>
            <SectionTitle subHeading="please process" heading="Payment"></SectionTitle>
            <Elements stripe={stripePromise}>
                <CheckoutForm price={total} cart={cart}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;