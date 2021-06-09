// import libs/other
import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { ToastsStore } from "react-toasts";

import { setEmail, setPassword } from "../redux/auth/auth-actions";
import { setCurrentUser } from "../redux/user/user-actions";
import { apiLink } from "../env";

const SignIn = ({ email, password, dispatch, history, location }) => {
    const handleSignIn = async evt => {
        evt.preventDefault();

        if (password && email) {
            try {
                const { data: { user } } = await axios.post(`${apiLink}/auth/sign-in`, { email, password });
                const from = location.state ? location.state.from.pathname : '/';
                if (user.isAdmin) history.push('/upload');
                else history.push(from);
                dispatch(setCurrentUser(user));
                dispatch(setEmail(null));
                dispatch(setPassword(null));
                ToastsStore.success('Signed in successfully!');
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
            <label htmlFor="signInEmailInput" className="form-label">Email Address</label>
            <input 
                type="email" 
                className="form-control" 
                id="signInEmailInput" 
                aria-describedby="emailHelp"
                onChange={evt => dispatch(setEmail(evt.target.value))}  />
        </div>
        <div className="mb-3">
            <label htmlFor="signInPasswordInput" className="form-label">Password</label>
            <input 
                type="password" 
                className="form-control" 
                id="signInPasswordInput"
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