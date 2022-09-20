import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';

const SignInAndSignUpPage = ({ currentUser, history }) => {
    if (currentUser) {
        history.goBack();
        return (
            <div className="w-100 d-flex flex-column justify-content-center align-items-center"></div>
        );
    } else
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

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(withRouter(SignInAndSignUpPage));
