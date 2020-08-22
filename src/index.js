// import libs/other
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

// bootstrap css
import 'bootstrap/dist/css/bootstrap.css';
import bootstrap from "bootstrap";

// import app
import App from "./App";

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById("root")
);