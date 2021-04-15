// import libs/other
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// import bootstrap 
import 'bootstrap/dist/css/bootstrap.css';
import bootstrap from 'bootstrap';

// import app
import App from './App';

// fetch stripe
const stripePromise = loadStripe('pk_test_51Iay6NLYNexBDWiNphNRZ8WzbSwyELURFHzlCY48Eh2KoVeJL4t2O9gJ2U0ssSpQxw6sNp3K4jykqiMewc9At3K800AnQXVRip');

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