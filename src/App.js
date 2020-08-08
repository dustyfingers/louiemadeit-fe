// import libs/other
import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

// import components

// import pages
import Landing from "./pages/Landing";

// TODO: custom app css
// import "./styles/css/App.css";

function App() {
    // state to determine whether to display loader or page
    const [loaded, setLoaded] = useState(false);
    useEffect(() => setLoaded(true), []);

    return (
        <>
            <p>THIS WORKS!</p>
            <Landing />
        </>
    );
}

export default App;