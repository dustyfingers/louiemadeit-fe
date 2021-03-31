// import libs/other
import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

// import pages
import Menu from "./components/Menu/Menu";
import UploadTrack from "./pages/UploadTrack.jsx";
import SingleTrackPage from "./pages/SingleTrackPage.jsx";
import StorePage from './pages/StorePage';

import "./App.scss";

function App() {
    // state to determine whether to display loader or page
    const [loaded, setLoaded] = useState(false);
    useEffect(() => setLoaded(true), []);

    return (
        <>
            <Menu />
            <div className="app-container">
                <Switch>
                    <Route exact path="/" component={StorePage} />
                    <Route path="/track" component={SingleTrackPage} />
                    <Route path="/admin" component={UploadTrack} />
                </Switch>
            </div>
        </>
    );
}

export default App;