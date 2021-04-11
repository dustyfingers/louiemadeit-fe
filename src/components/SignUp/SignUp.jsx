// import libs/other
import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import { setEmail, setPassword, setConfirmPassword } from "../../redux/auth/auth-actions";
import { setCurrentUser } from "../../redux/user/user-actions";
import { apiLink } from "../../env";

const SignUp = ({email, password, confirmPassword, dispatch}) => {
    const handleSignUp = async evt => {
        evt.preventDefault();

        if (password === confirmPassword) {
            try {
                const url = `${apiLink}/user/new`;
                const options = {
                    email,
                    password
                };
        
                const res = await axios.post(url, options);
                console.log('response from sign up', res);
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
            } catch (err) {
                console.log(err);
            }
        } else {
            // TODO: dispatch an action to change the global state and make an error modal appear (using message-modal)
            console.log("must give email and password!");
        }
    }

    return (
    <form onSubmit={handleSignUp}>
        <h1>Sign Up</h1>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
            <input 
                type="email" 
                className="form-control" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp"
                onChange={evt => dispatch(setEmail(evt.target.value))} />
            <div id="emailHelp" className="form-text">I don't share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="passwordInput" className="form-label">Password</label>
            <input 
                type="password" 
                className="form-control" 
                id="passwordInput" 
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

export default connect(mapStateToProps)(SignUp);