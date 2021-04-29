// import libs/other
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

// import pages, components
import Menu from "./components/Menu/Menu";
import Footer from "./components/Footer/Footer";
import UploadTrackPage from "./pages/admin/TrackUploadPage.jsx";
import StorePage from './pages/StorePage';
import SignInAndSignUpPage from "./pages/SignInAndSignUpPage";
import CheckoutPage from './pages/CheckoutPage';
import CartPage from './pages/CartPage';

// import redux actions
import { setCurrentUser } from "./redux/user/user-actions";

// env vars & global styles
import { apiLink } from "./env";
import "./App.scss";

axios.defaults.withCredentials = true;

const App = ({ dispatch }) => {
    const checkAuth = async () => {
        try {
            let { data: { user } } = await axios.get(`${apiLink}/auth/current-user`);

            if (user !== undefined) dispatch(setCurrentUser(user));
        } catch (error) {
            console.log({ error });
        }
    }

    // check for current user on app load
    useEffect(() => { checkAuth() }, []);

    return (
        <div>
            <Menu />
            <div className="page-container container d-flex flex-column align-items-center justify-content-center">
                <Switch>
                    <Route exact path="/" component={StorePage} />
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