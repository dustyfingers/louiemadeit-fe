// import libs/other
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

// bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import bootstrap from "bootstrap";

// import app
import App from "./App";

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById("root")
);