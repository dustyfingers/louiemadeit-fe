import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import "./Menu.scss";


const Menu = ({ history }) => (
    <>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="TopMenu">
            <div className="container-fluid">

                <Link to="/" id="logo"><h3>louiemadeit.</h3></Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDropdown" aria-controls="navbarDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarDropdown">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item d-flex flex-row-reverse">
                            <a className="nav-link" onClick={() => history.push("/contact")}>contact.</a>
                        </li>
                        <li className="nav-item d-flex flex-row-reverse">
                            <a className="nav-link" onClick={() => history.push("/sign-in")}>sign in.</a>
                        </li>
                        <li className="nav-item d-flex flex-row-reverse">
                            <a className="nav-link" onClick={() => history.push("/cart")}><img src="/cart.svg" alt="shopping cart"/></a>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    </>
);

export default withRouter(Menu);