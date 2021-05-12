import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { connect } from 'react-redux';
import axios from 'axios';
import { ToastsStore } from 'react-toasts';

import CheckoutItem from '../components/CheckoutItem/CheckoutItem';
import { setCartEmpty } from '../redux/cart/cart-actions';
import { apiLink } from '../env';

const CheckoutPage = ({ cartItems, currentUser, dispatch, history }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(false);

    const checkAuth = async () => {
        try {
            let { data: { user } } = await axios.get(`${apiLink}/auth/current-user`);
            if (user === null || user === undefined) history.push("/sign-in");

        } catch (error) {
            ToastsStore.error('There was an error verifying your credentials.');
            history.push("/sign-in");
        }
    }

    // Create PaymentIntent as soon as the page loads
    useEffect(() => {
        checkAuth();
        if (cartItems.length) {
            let cartInfo = [];
            cartItems.forEach(item => cartInfo.push({ trackID: item.trackID, priceID: item.priceID }));
    
            window
                .fetch(`${apiLink}/stripe/new-payment-intent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({items: cartInfo, user: currentUser.email })
                })
                .then(res => res.json())
                .then(data => setClientSecret(data.clientSecret));
        }
    }, []);

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