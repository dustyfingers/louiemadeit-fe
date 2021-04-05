// import libs/other
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import 'bootstrap/dist/css/bootstrap.css';
import bootstrap from 'bootstrap'

// import app
import App from './App';

// fetch stripe
const stripePromise = loadStripe('pk_test_51Iay6NLYNexBDWiN3YMGvPw9BeYI50NsNG3Kr9UtnwF9AL3eprpd8TiN2GvNWfjyv13Q2lFcVrtPAMSmd9xwHBaW00eHe9Pj3D');

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