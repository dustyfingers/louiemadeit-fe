// import libs/other
import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

// import pages and menu
import Menu from "./components/Menu/Menu";
import Footer from "./components/Footer";
import UploadTrackPage from "./pages/admin/UploadTrackPage.jsx";
import SingleTrackPage from "./pages/SingleTrackPage.jsx";
import StorePage from './pages/StorePage';
import SignInAndSignUpPage from "./pages/SignInAndSignUpPage";

import "./App.scss";

function App() {
    // TODO: determine whether to display loader or page

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

export default App;