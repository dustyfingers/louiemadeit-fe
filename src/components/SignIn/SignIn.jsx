// import libs/other
import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import { setEmail, setPassword } from "../../redux/auth/auth-actions";
import { setCurrentUser } from "../../redux/user/user-actions";
import { apiLink } from "../../env";

const SignIn = ({email, password, dispatch}) => {
    const handleSignIn = async evt => {
        evt.preventDefault();

        if (password && email) {
            try {
                const url = apiLink + "/auth/sign-in";
                const options = {
                    email,
                    password
                };
        
                const res = await axios.post(url, options);
                console.log(res);
                console.log('response from sign in', res.data.user);
                const currentUserObj = {
                    email: res.data.user.email,
                    isAdmin: res.data.user.isAdmin
                };

                // dispatch an action to set app state with currentUserObj to log user in
                dispatch(setCurrentUser(currentUserObj));

                // dispatch actions to clear all the auth state
                dispatch(setEmail(null));
                dispatch(setPassword(null));
            } catch (err) {
                console.log(err);
            }
        } else {
            // TODO: dispatch an action to change the global state and make an error modal appear (using message-modal)
            console.log("must pass email and password!");
        }
    }

    return (
    <form onSubmit={handleSignIn}>
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
        <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Remember Me</label>
        </div>
        <button type="submit" className="btn btn-primary">Sign In</button>
    </form>
    );
};

const mapStateToProps = state => ({
    email: state.auth.email,
    password: state.auth.password
});

export default connect(mapStateToProps)(SignIn);