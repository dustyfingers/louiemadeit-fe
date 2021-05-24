import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { ToastsStore } from 'react-toasts';

import { apiLink } from '../../env';

const CustomerProfilePage = () => {
    const [orders, setOrders] = useState([]);

    const fetchCustomerData = async () => {
        try {
            const { data } = await axios.get(`${apiLink}/stripe/purchased-tracks`);
            const results = data.purchasedTracks;
            setOrders(results);
        } catch (error) {
            ToastsStore.error('There was an error fetching your profile...');
        }
    }

    useEffect(() => { fetchCustomerData() }, []);

    return (
        <div className="d-flex flex-column justify-content-center text-center">
            <h1>CUSTOMER PROFILE</h1>
            <div>
                {orders.map(order => <p key={order.id}>{order.id}</p>)}
            </div>
        </div>
    );
};

export default connect()(CustomerProfilePage);