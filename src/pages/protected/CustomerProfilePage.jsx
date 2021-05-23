import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { ToastsStore } from 'react-toasts';

import { apiLink } from '../../env';

const CustomerProfilePage = ({ history }) => {
    const checkAuth = async () => {
        try {
            let { data: { user } } = await axios.get(`${apiLink}/auth/current-user`);
            if (user === null || user === undefined) history.push("/sign-in");

        } catch (error) {
            ToastsStore.error('There was an error verifying your credentials.');
            history.push("/sign-in");
        }
    }

    const fetchCustomerData = async () => {
        try {
            let data = await axios.get(`${apiLink}/user/123`);
        } catch (error) {
            ToastsStore.error('There was an error fetching your profile...');
        }
    }

    useEffect(() => {
        checkAuth();
        fetchCustomerData();
    }, []);

    return (
        <div className="d-flex flex-column justify-content-center text-center">
            <h1>CUSTOMER PROFILE</h1>
            <div className="d-flex flex-wrap justify-content-center pb-5">
                CUSTOMER LICENSES HERE
            </div>
        </div>
    );
};

export default connect()(CustomerProfilePage);