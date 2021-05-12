// import libs/other
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// import bootstrap 
import 'bootstrap/dist/css/bootstrap.css';
import bootstrap from 'bootstrap';

// import app
import App from './App';
import { stripePk } from './env';

// fetch stripe
const stripePromise = loadStripe(stripePk);

ReactDOM.render(
    <Provider store={store}>
        <Elements stripe={stripePromise}>
            <Router>
                <App />
            </Router>
        </Elements>
    </Provider>,
    document.getElementById("root")
);