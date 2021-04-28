import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { connect } from 'react-redux';

import CheckoutItem from '../components/CheckoutItem/CheckoutItem';
import { apiLink } from '../env';

const CheckoutPage = ({cartItems}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(false);

    // Create PaymentIntent as soon as the page loads
    useEffect(() => {
        if (cartItems.length) {
            let cartInfo = [];
            cartItems.forEach(item => cartInfo.push({ trackID: item.trackID, priceID: item.priceID }));
    
            window
                .fetch(`${apiLink}/stripe/new-payment-intent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({items: cartInfo})
                })
                .then(res => res.json())
                .then(data => setClientSecret(data.clientSecret));
        }
    }, []);

    const cardStyle = {
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
    };
        

    // handle form submit (completing purchase with stripe)
    const handleSubmit = async evt => {
        evt.preventDefault();
        setProcessing(true);

        // is stripe has not loaded do not allow submit
        if (!stripe || !elements) return;

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });
        console.log(clientSecret);
        console.log(payload);
        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    };

    const handleChange = async evt => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(evt.empty);
        setError(evt.error ? evt.error.message : "");
      };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center w-100">
            <div className="cart-items">
                {cartItems.length ? cartItems.map(item => <CheckoutItem key={item.trackID} item={item}/>) : 'No items in cart...'}
            </div>
            <form onSubmit={handleSubmit} className="w-50 d-flex flex-column">
                <CardElement onChange={handleChange} options={cardStyle} />
                <button
                    disabled={processing || disabled || succeeded}
                    id="submit"
                    >
                    <span id="button-text">
                        {processing ? "Processing Payment..." : "Complete Purchase"}
                    </span>
                </button>
                {/* Show any error that happens when processing the payment */}
                {error && (<div className="card-error" role="alert">{error}</div>)}
            </form>
        </div>
    );
};

const mapStateToProps = state => ({
    cartItems: state.cart.cartItems
});

export default connect(mapStateToProps)(CheckoutPage);