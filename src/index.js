// import libs/other
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

// import app
import App from "./App";

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById("root")
);