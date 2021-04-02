import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import "./Menu.scss";


// TODO: sign in should change based on the user state

const Menu = ({ history }) => (
    <>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="TopMenu">
            <div className="container">
                <Link to="/" id="logo"><h1>louiemadeit.</h1></Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDropdown" aria-controls="navbarDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarDropdown">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item d-flex flex-row-reverse">
                            <span className="nav-link" onClick={() => history.push("/contact")}>contact.</span>
                        </li>
                        <li className="nav-item d-flex flex-row-reverse">
                            <span className="nav-link" onClick={() => history.push("/sign-in")}>sign in.</span>
                        </li>
                        <li className="nav-item d-flex flex-row-reverse">
                            <span className="nav-link" onClick={() => history.push("/cart")}><img src="/cart.svg" alt="shopping cart"/></span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
);

export default withRouter(Menu);