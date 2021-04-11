// import libs/other
import React from "react";

// import components
import SignUp from '../components/SignUp/SignUp';
import SignIn from '../components/SignIn/SignIn';
import FetchCurrentUser from '../components/FetchCurrentUser';

const SignInAndSignUpPage = () => {
    return (
        <div className="w-100 d-flex flex-column justify-content-center align-items-center">
            <h1 className="py-4">Welcome!</h1>
            <div className="w-100 d-flex justify-content-evenly align-items-start">
                <SignUp />
                <SignIn />
                <FetchCurrentUser />
            </div>
        </div>
    );
};

export default SignInAndSignUpPage;