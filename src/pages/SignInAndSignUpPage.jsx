// import libs/other
import React from "react";

// import components
import SignUp from '../components/SignUp/SignUp';
import SignIn from '../components/SignIn/SignIn';

const SignInAndSignUpPage = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <h1>Welcome!</h1>
            <div className="w-100 d-flex justify-content-evenly align-items-start">
                <SignUp />
                <SignIn />
            </div>
        </div>
    );
};

export default SignInAndSignUpPage;