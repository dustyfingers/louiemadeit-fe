import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { connect } from 'react-redux';
import { ToastsStore } from 'react-toasts';
import axios from 'axios';

import CheckoutItem from '../../components/CheckoutItem/CheckoutItem';
import { setCartEmpty } from '../../redux/cart/cart-actions';
import { apiLink } from '../../env';

const CheckoutPage = ({ cartItems, currentUser, dispatch, history }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(false);

    const createPaymentIntent = async () => {
        if (cartItems.length) {
            try {
                let cartInfo = [];
                cartItems.forEach(item => cartInfo.push({trackID: item.trackID, priceID: item.priceID}));
                const data = await axios.post(`${apiLink}/stripe/new-payment-intent`, {items: cartInfo});
                setClientSecret(data.data.clientSecret);
            } catch {
                ToastsStore.error("There was an error creating the payment intent. Please hard re-load the page.");
            }
        }
    }

    // create PaymentIntent as soon as the page loads
    useEffect(() => { createPaymentIntent() }, []);

    const handleSubmit = async evt => {
        try {
            evt.preventDefault();
            setProcessing(true);
    
            if (!stripe || !elements) return;
    
            const payload = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            });
            console.log({payload});
            if (payload.error) {
                ToastsStore.error('There was an error completing your payment. Please try again.');
                setProcessing(false);
            } else {
                setProcessing(false);
                setSucceeded(true);
                ToastsStore.success('Payment successful. Thank you!');
                dispatch(setCartEmpty());
                history.push("/purchase-completed");
            }
        } catch (error) {
            ToastsStore.error('There was an error completing your payment. Please try again.');
            setProcessing(false);
        }

    };

    const handleChange = async evt => {
        setDisabled(evt.empty);
        if (evt.error) ToastsStore.error(evt.error.message);
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center w-100">
            <div className="cart-items">
                {cartItems.length ? cartItems.map(item => <CheckoutItem key={item.trackID} item={item}/>) : 'No items in cart...'}
            </div>
            <form onSubmit={handleSubmit} className="w-50 d-flex flex-column">
                <CardElement 
                    onChange={handleChange} 
                    options={{
                        style: {
                            base: {
                                color: "#32325d",
                                fontSmoothing: "antialiased",
                                fontSize: "16px",
                                "::placeholder": {
                                    color: "#32325d"
                                }
                            },
                            invalid: {
                                color: "#fa755a",
                                iconColor: "#fa755a"
                            }
                        }
                    }} />
                <button
                    disabled={processing || disabled || succeeded}
                    id="submit"
                    className="btn btn-primary"
                    >
                    <span id="button-text">
                        {processing ? "Processing Payment..." : "Complete Purchase"}
                    </span>
                </button>
            </form>
        </div>
    );
};

const mapStateToProps = state => ({
    cartItems: state.cart.cartItems,
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(CheckoutPage);