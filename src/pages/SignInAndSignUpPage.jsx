// import libs/other
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import SignUp from '../components/SignUp/SignUp';
import SignIn from '../components/SignIn/SignIn';

const SignInAndSignUpPage = ({ currentUser }) => {   
    if(currentUser !== null) return <Redirect to="/" />;

    return (
        <div className="w-100 d-flex flex-column justify-content-center align-items-center">
            <h1 className="py-4">Welcome!</h1>
            <div className="w-100 d-flex justify-content-evenly align-items-start">
                <SignUp />
                <SignIn />
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    currentUser: state.user.currentUser 
});

export default connect(mapStateToProps)(SignInAndSignUpPage);