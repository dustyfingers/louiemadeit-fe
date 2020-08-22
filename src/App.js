// import libs/other
import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

// import components

// import pages
import Menu from "./components/Menu";
import UploadTrack from "./pages/UploadTrack.jsx";
import SingleTrackPage from "./pages/SingleTrackPage.jsx";

// TODO: custom app css
// import "./styles/css/App.css";

function App() {
    // state to determine whether to display loader or page
    const [loaded, setLoaded] = useState(false);
    useEffect(() => setLoaded(true), []);

    return (
        <>
            <Menu />
            {/* <UploadTrack /> */}
            <SingleTrackPage />
            <UploadTrack />
        </>
    );
}

export default App;