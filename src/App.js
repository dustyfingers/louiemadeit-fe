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
import { setCurrentUser } from "./redux/user/user-actions";

import "./App.scss";

const App = ({dispatch}) => {
    // TODO: determine whether to display loader or page

    const checkAuth = async () => {
        try {
            console.log('checkAuth fired!');
            const url = "http://localhost:5000/auth/sign-in";
            const data = {};
            const options = {withCredentials: true};
            let res = await axios.post(url, data, options);
            console.log(res);

            dispatch(setCurrentUser(res.data.user))
        } catch (err) {
            
        }

    }

    // check for auth and sign user in on page load
    useEffect(() => {
        checkAuth()
    }, [])

    return (
        <div>
            <Menu />
            <div className="page-container container">
                <Switch>
                    <Route exact path="/" component={StorePage} />
                    <Route path="/track" component={SingleTrackPage} />
                    <Route path="/admin" component={UploadTrackPage} />
                    <Route path="/sign-in" component={SignInAndSignUpPage} />
                </Switch>
            </div>
            <Footer/>
        </div>
    );
}

export default connect()(App);