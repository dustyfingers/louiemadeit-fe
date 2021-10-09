import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import { apiLink } from "../env";

const SignInAndSignUpPage = () => {
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