// import libs/other
import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

// import pages and menu
import Menu from "./components/Menu/Menu";
import Footer from "./components/Footer";
import UploadTrack from "./pages/admin/UploadTrack.jsx";
import SingleTrackPage from "./pages/SingleTrackPage.jsx";
import StorePage from './pages/StorePage';

import "./App.scss";

function App() {
    // state to determine whether to display loader or page
    const [loaded, setLoaded] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    // TODO: build loader
    useEffect(() => setLoaded(true), []);

    return (
        <div>
            <Menu />
            <div className="page-container container">
                <Switch>
                    <Route exact path="/" component={StorePage} />
                    <Route path="/track" component={SingleTrackPage} />
                    <Route path="/admin" component={UploadTrack} />
                </Switch>
            </div>
            <Footer/>
        </div>
    );
}

export default App;