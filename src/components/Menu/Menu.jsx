import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { ToastsStore } from 'react-toasts';

import './Menu.scss';
import { setCurrentUser } from '../../redux/user/user-actions';
import Search from '../Search/Search';
import { apiLink } from '../../env';

const Menu = ({ history, currentUser, cartItems, dispatch }) => {
    
    const handleSignOut = async () => {
        try {
            await axios.post(`${apiLink}/auth/sign-out`);
            dispatch(setCurrentUser(null));
            ToastsStore.success('Signed out successfully.');
        } catch (error) {
            ToastsStore.error('There was an error signing you out.')
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="TopMenu">
            <div className="container">
                <Link to="/" id="logo"><h1>louiemadeit.</h1></Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDropdown" aria-controls="navbarDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarDropdown">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item d-flex justify-content-end">
                            <span className="nav-link" onClick={() => history.push("/contact")}>contact.</span>
                        </li>
                        {currentUser === null || currentUser === undefined ?
                            <li className="nav-item d-flex justify-content-end">
                                <span className="nav-link" onClick={() => history.push("/sign-in")}>sign in.</span>
                            </li> :
                            <li className="nav-item d-flex justify-content-end">
                                <span className="nav-link" onClick={handleSignOut}>sign out.</span>
                            </li>
                        }
                        <li className="nav-item cart-counter-wrapper" onClick={() => history.push("/cart")}>
                            <span className="nav-link d-flex justify-content-end"><img src="/bag.svg" height='24px' width='24px' alt="shopping cart"/></span>
                            {cartItems.length > 0 && (<span className="cart-counter">{cartItems.length}</span>)}
                        </li>
                        <Search />
                    </ul>
                </div>
            </div>
        </nav>
)};

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    cartItems: state.cart.cartItems
});

export default connect(mapStateToProps)(withRouter(Menu));