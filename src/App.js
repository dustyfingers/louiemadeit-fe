// import libs/other
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

// import pages, components
import Menu from "./components/Menu/Menu";
import Footer from "./components/Footer";
import UploadTrackPage from "./pages/admin/UploadTrackPage.jsx";
import SingleTrackPage from "./pages/SingleTrackPage.jsx";
import StorePage from './pages/StorePage';
import SignInAndSignUpPage from "./pages/SignInAndSignUpPage";
import CheckoutPage from './pages/CheckoutPage';
import CartPage from './pages/CartPage';

// import redux actions
import { setCurrentUser } from "./redux/user/user-actions";

// env vars & global styles
import { apiLink } from "./env";
import "./App.scss";

const App = ({dispatch}) => {
    // TODO: determine whether to display loader or page

    const checkAuth = async () => {
        try {
            let res = await axios.post(`${apiLink}/auth/sign-in`, {}, {withCredentials: true});

            console.log(res);

            if (res.data.user !== undefined) dispatch(setCurrentUser(res.data.user));
        } catch (error) {
            console.log({ error });
        }
    }

    // check for auth and sign user in on app load
    useEffect(() => { checkAuth() }, []);

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