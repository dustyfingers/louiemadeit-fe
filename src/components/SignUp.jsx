import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { ToastsStore } from "react-toasts";

import { setEmail, setPassword, setConfirmPassword } from "../redux/auth/auth-actions";
import { setCurrentUser } from "../redux/user/user-actions";
import { apiLink } from "../env";

const SignUp = ({ history, email, password, confirmPassword, dispatch }) => {
    const handleSignUp = async evt => {
        evt.preventDefault();
        if (!email) {
            ToastsStore.warning("You've got to give me an email, silly!");
            return;
        }

        if (password === confirmPassword) {
            try {
                const url = `${apiLink}/auth/sign-up`;
                const options = {
                    email,
                    password
                };
        
                const res = await axios.post(url, options);
                const currentUserObj = {
                    email: res.data.user.email,
                    isAdmin: res.data.user.isAdmin
                };

                // dispatch an action to set app state with currentUserObj to log user in
                dispatch(setCurrentUser(currentUserObj));

                // dispatch actions to clear all the auth state
                dispatch(setEmail(null));
                dispatch(setPassword(null));
                dispatch(setConfirmPassword(null));

                ToastsStore.success("Hooray! User created successfully!");

                history.push("/");
            } catch (error) {
                ToastsStore.error('There was an error when creating a user with your information. Please try again.');
            }
        } else {
            ToastsStore.warning("Passwords must match!");
        }
    }

    return (
    <form onSubmit={handleSignUp} className="w-100 px-5">
        <h1>Sign Up</h1>
        <div className="mb-3">
            <label htmlFor="signUpEmailInput" className="form-label">Email Address</label>
            <input 
                type="email" 
                className="form-control" 
                id="signUpEmailInput" 
                aria-describedby="emailHelp"
                onChange={evt => dispatch(setEmail(evt.target.value))} />
            <div id="emailHelp" className="form-text">I don't share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="signUpPasswordInput" className="form-label">Password</label>
            <input 
                type="password" 
                className="form-control" 
                id="signUpPasswordInput" 
                onChange={evt => dispatch(setPassword(evt.target.value))} />
        </div>
        <div className="mb-3">
            <label htmlFor="confirmPasswordInput" className="form-label">Confirm Password</label>
            <input 
                type="password" 
                className="form-control" 
                id="confirmPasswordInput"
                onChange={evt => dispatch(setConfirmPassword(evt.target.value))} />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
    </form>
    );
};

const mapStateToProps = state => ({
    email: state.auth.email,
    password: state.auth.password,
    confirmPassword: state.auth.confirmPassword,
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(withRouter(SignUp));