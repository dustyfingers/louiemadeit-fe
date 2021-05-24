// import libs/other
import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { ToastsStore } from "react-toasts";

import { setEmail, setPassword } from "../../redux/auth/auth-actions";
import { setCurrentUser } from "../../redux/user/user-actions";
import { apiLink } from "../../env";

const SignIn = ({email, password, dispatch, history}) => {
    const handleSignIn = async evt => {
        evt.preventDefault();

        if (password && email) {
            try {
                const url = `${apiLink}/auth/sign-in`;
                const options = {
                    email,
                    password
                };
        
                const res = await axios.post(url, options);

                // dispatch an action to set app state with currentUserObj to log user in
                dispatch(setCurrentUser({
                    email: res.data.user.email,
                    isAdmin: res.data.user.isAdmin
                }));
                ToastsStore.success('Signed in successfully!');

                // dispatch actions to clear all the auth state
                dispatch(setEmail(null));
                dispatch(setPassword(null));

                if (res.data.user.isAdmin) history.push('/upload');
                else history.push('/');
            } catch (err) {
                ToastsStore.error('There was an error sigining you in. Please check your credentials and try again.');
            }
        } else {
            ToastsStore.warning("Must give both email and password!");
        }
    }

    return (
    <form onSubmit={handleSignIn} className="w-100 px-5 pt-5 pt-md-0">
        <h1>Sign In</h1>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
            <input 
                type="email" 
                className="form-control" 
                id="emailInput" 
                aria-describedby="emailHelp"
                onChange={evt => dispatch(setEmail(evt.target.value))}  />
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input 
                type="password" 
                className="form-control" 
                id="passwordInput"
                onChange={evt => dispatch(setPassword(evt.target.value))}  />
        </div>
        <button type="submit" className="btn btn-primary">Sign In</button>
    </form>
    );
};

const mapStateToProps = state => ({
    email: state.auth.email,
    password: state.auth.password
});

export default connect(mapStateToProps)(withRouter(SignIn));