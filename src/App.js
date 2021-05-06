// import libs/other
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { ToastsContainer, ToastsStore } from 'react-toasts';

// import pages, components
import Menu from "./components/Menu/Menu";
import Footer from "./components/Footer/Footer";
import TrackUploadPage from "./pages/admin/TrackUploadPage.jsx";
import StorePage from './pages/StorePage';
import SignInAndSignUpPage from "./pages/SignInAndSignUpPage";
import CheckoutPage from './pages/CheckoutPage';
import CartPage from './pages/CartPage';
import PurchaseCompletedPage from './pages/PurchaseCompletedPage';
import CustomerProfilePage from './pages/CustomerProfilePage';

// import redux actions
import { setCurrentUser } from "./redux/user/user-actions";

// env vars & global styles
import { apiLink } from "./env";
import "./App.scss";

axios.defaults.withCredentials = true;

const App = ({ currentUser, dispatch }) => {
    const checkAuth = async () => {
        try {
            let { data: { user } } = await axios.get(`${apiLink}/auth/current-user`);
            if (user !== null) await dispatch(setCurrentUser(user));

        } catch (error) {
            ToastsStore.error("There was an error connecting to the server!");
        }
    }

    // check for current user on app load
    useEffect(() => { checkAuth() }, []);

    return (
        <div className="position-relative">
            <Menu />
            <div className="page-container container d-flex flex-column align-items-center justify-content-center">
                <Switch>
                    <Route exact path="/" component={StorePage} />
                    <Route path="/upload" component={TrackUploadPage} />
                    <Route path="/sign-in" component={SignInAndSignUpPage} />
                    <Route path="/cart" component={CartPage} />
                    <Route path="/checkout" component={CheckoutPage} />
                    <Route path="/purchase-completed" component={PurchaseCompletedPage} />
                    <Route path="/customer/:user_id" component={CustomerProfilePage} />
                </Switch>
            </div>
            <ToastsContainer store={ToastsStore} classNames='toast' />
            <Footer/>
        </div>
    );
}
const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(App);