// import libs/other
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

// import pages and menu
import Menu from "./components/Menu/Menu";
import Footer from "./components/Footer";
import UploadTrackPage from "./pages/admin/UploadTrackPage.jsx";
import SingleTrackPage from "./pages/SingleTrackPage.jsx";
import StorePage from './pages/StorePage';
import SignInAndSignUpPage from "./pages/SignInAndSignUpPage";
import CheckoutPage from './pages/CheckoutPage';
import CartPage from './pages/CartPage';
import { setCurrentUser } from "./redux/user/user-actions";

import { apiLink } from "./env";

import "./App.scss";

const App = ({dispatch}) => {
    // TODO: determine whether to display loader or page

    const checkAuth = async () => {
        try {
            console.log('checkAuth fired!');
            const url = apiLink + "/auth/sign-in";
            console.log("making api request to " + url);
            const data = {};
            const options = {withCredentials: true};
            let res = await axios.post(url, data, options);

            if (res.user !== undefined) dispatch(setCurrentUser(res.data.user));
        } catch (err) {
            console.log('error authenticating');
        }

    }

    // check for auth and sign user in on page load
    useEffect(() => {
        checkAuth()
    }, [])

    return (
        <div>
            <Menu />
            <div className="page-container container d-flex flex-column align-items-center justify-content-center">
                <Switch>
                    <Route exact path="/" component={StorePage} />
                    <Route path="/track" component={SingleTrackPage} />
                    <Route path="/admin" component={UploadTrackPage} />
                    <Route path="/sign-in" component={SignInAndSignUpPage} />
                    <Route path="/cart" component={CartPage} />
                    <Route path="/checkout" component={CheckoutPage} />
                </Switch>
            </div>
            <Footer/>
        </div>
    );
}

export default connect()(App);