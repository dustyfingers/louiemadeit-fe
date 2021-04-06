import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './Menu.scss';
import { setCurrentUser } from '../../redux/user/user-actions';


// TODO: sign in should change based on the user state

const Menu = ({ history, currentUser, cartItems, dispatch }) => {
    return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="TopMenu">
            <div className="container">
                <Link to="/" id="logo"><h1>louiemadeit.</h1></Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDropdown" aria-controls="navbarDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarDropdown">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <span className="nav-link" onClick={() => history.push("/contact")}>contact.</span>
                        </li>
                        {currentUser === null ?
                            <li className="nav-item">
                                <span className="nav-link" onClick={() => history.push("/sign-in")}>sign in.</span>
                            </li> :
                            <li className="nav-item">
                                <span className="nav-link" onClick={() => dispatch(setCurrentUser(null))}>sign out.</span>
                            </li>
                        }
                        <li className="nav-item cart-counter-wrapper">
                            <span className="nav-link" onClick={() => history.push("/cart")}><img src="/cart.svg" height='24px' width='24px' alt="shopping cart"/></span>
                            {cartItems.length > 0 && (<span className="cart-counter">{cartItems.length}</span>)}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
)};

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    cartItems: state.cart.cartItems
});

export default connect(mapStateToProps)(withRouter(Menu));