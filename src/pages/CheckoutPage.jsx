import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { connect } from 'react-redux';

import CheckoutItem from '../components/CheckoutItem/CheckoutItem';

const CheckoutPage = ({cartItems}) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async evt => {
        evt.preventDefault();

        // is stripe has not loaded do not allow submit
        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const { err, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement
        });

        if (err) console.log('error:  ', err);
        else console.log('payment method:  ', paymentMethod);
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center w-100">
            <div className="cart-items">
                {cartItems.length ? cartItems.map(item => <CheckoutItem item={item}/>) : 'No items in cart...'}
            </div>
            <form onSubmit={handleSubmit} className="w-50 d-flex flex-column">
                <CardElement />
                <button type="submit" disabled={!stripe}>Complete Purchase</button>
            </form>
        </div>
    );
};

const mapStateToProps = state => ({
    cartItems: state.cart.cartItems
});

export default connect(mapStateToProps)(CheckoutPage);