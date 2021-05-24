import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { ToastsStore } from 'react-toasts';

import SignUp from '../components/SignUp/SignUp';
import SignIn from '../components/SignIn/SignIn';
import { apiLink } from "../env";

const SignInAndSignUpPage = ({ history }) => {
    const checkForUser = async () => {
        let { data: { user } } = await axios.get(`${apiLink}/auth/current-user`);
        if (user) history.push("/");
    }

    useEffect(() => { checkForUser() }, []);
    
    return (
        <div className="w-100 d-flex flex-column justify-content-center align-items-center">
            <h1 className="py-4">Welcome!</h1>
            <div className="w-100 d-flex flex-column flex-md-row justify-content-evenly align-items-start">
                <SignUp />
                <SignIn />
            </div>
        </div>
    );
};

export default connect()(SignInAndSignUpPage);