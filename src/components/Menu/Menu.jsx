import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { ToastsStore } from 'react-toasts';

import './Menu.scss';
import { setCurrentUser } from '../../redux/user/user-actions';
import Search from '../Search';
import { apiLink } from '../../env';
import AdminMenu from '../AdminMenu';

const Menu = ({ history, currentUser, cartItems, dispatch }) => {
    const handleSignOut = async () => {
        if (window.confirm('Are you sure you want to sign out?')) {
            try {
                await axios.post(`${apiLink}/auth/sign-out`);
                ToastsStore.success('Signed out successfully.');
                history.push('/');
                dispatch(setCurrentUser(null));
            } catch (error) {
                ToastsStore.error('There was an error signing you out.');
            }
        }
    };

    return (
        <nav
            className={`navbar navbar-expand-${
                currentUser && currentUser.isAdmin ? 'xl' : 'lg'
            } navbar-light fixed-top`}
            id="TopMenu"
        >
            <div className="container">
                <Link to="/" id="logo">
                    <h1>louiemadeit.</h1>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarDropdown"
                    aria-controls="navbarDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarDropdown">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li
                            className="ml-5 nav-item cart-counter-wrapper"
                            onClick={() => history.push('/cart')}
                        >
                            {/* <span className="nav-link d-flex justify-content-end"><img src="/bag.svg" height='24px' width='24px' alt="shopping cart"/></span> */}
                            <span className="nav-link d-flex justify-content-end">
                                cart
                            </span>
                            {cartItems.length > 0 && (
                                <span className="cart-counter">{cartItems.length}</span>
                            )}
                        </li>
                        {currentUser ? (
                            <div
                                className={`d-flex flex-column flex-${
                                    currentUser && currentUser.isAdmin ? 'xl' : 'lg'
                                }-row align-items-end justify-content-end`}
                            >
                                {currentUser.isAdmin ? <AdminMenu /> : ''}
                                <li className="nav-item">
                                    <span className="nav-link" onClick={handleSignOut}>
                                        sign out
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <span
                                        className="nav-link"
                                        onClick={() =>
                                            history.push(`/user/${currentUser.id}`)
                                        }
                                    >
                                        {currentUser.email}
                                    </span>
                                </li>
                            </div>
                        ) : (
                            <li className="nav-item d-flex justify-content-end">
                                <span
                                    className="nav-link"
                                    onClick={() => history.push('/sign-in')}
                                >
                                    sign in
                                </span>
                            </li>
                        )}
                        <Search />
                    </ul>
                </div>
            </div>
        </nav>
    );
};

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    cartItems: state.cart.cartItems,
});

export default connect(mapStateToProps)(withRouter(Menu));
