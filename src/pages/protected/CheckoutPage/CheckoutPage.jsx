import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { connect } from 'react-redux';
import { ToastsStore } from 'react-toasts';
import axios from 'axios';
import { Link } from 'react-router-dom';

import CheckoutItem from '../../../components/CheckoutItem/CheckoutItem';
import { setCartEmpty } from '../../../redux/cart/cart-actions';
import { apiLink } from '../../../env';

import './CheckoutPage.scss';

const CheckoutPage = ({ cartItems, dispatch, history, location }) => {
    const from = location.state ? location.state.from.pathname : '/';
    if (from !== '/cart') history.push('/');
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [cartTotal, setCartTotal] = useState(0);

    const calculateCartTotal = () => {
        let total = 0;
        cartItems.forEach(item => total += item.price);
        setCartTotal(total);
    }

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

    const handleSubmit = async evt => {
        try {
            evt.preventDefault();
            setProcessing(true);
    
            if (!stripe || !elements) return;
    
            const payload = await stripe.confirmCardPayment(clientSecret, { payment_method: { card: elements.getElement(CardElement) } });

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


    useEffect(() => {
        createPaymentIntent();
        calculateCartTotal();
    }, []);

    return (
        <div className="d-flex flex-column justify-content-center align-items-center mb-5">
            <h1>CHECKOUT</h1>
            <div className={` top-section d-flex flex-column ${cartItems.length && 'flex-md-row'} align-items-${cartItems.length ? 'start' : 'center'} justify-content-${cartItems.length ? 'around' : 'center'}`}>
                <div className="cart-items py-2 text-center">
                    {cartItems.length ? cartItems.map(item => <CheckoutItem key={item.trackID} item={item}/>) : 'No items in your cart.'}
                </div>
                <div className="cart-summary" >
                    {cartItems.length ? 
                        (<div className="d-flex flex-column">
                            <p>ITEMS IN CART:</p>
                            {cartItems.map(({trackName, price}, idx) => <p className="d-flex justify-content-between" key={idx}><span>{trackName}</span> <span>${price}</span></p>)}
                            <hr />
                            <p className="d-flex justify-content-between">TOTAL: <span>${cartTotal}</span></p>
                            
                            {cartItems.length ? 
                                (<div className="checkout-sectionmb-5 d-flex">
                                    <form onSubmit={handleSubmit} className="w-100 d-flex flex-column checkout-form">
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
                                            className="btn btn-primary" >
                                            <span id="button-text">
                                                {processing ? `Processing Payment for $${cartTotal}...` : `Complete Purchase for $${cartTotal}`}
                                            </span>
                                        </button>
                                    </form>
                                </div>) : ''}
                        </div>) : 
                        (<Link className="btn btn-primary" to="/">GO TO STORE</Link>)}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    cartItems: state.cart.cartItems,
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(CheckoutPage);