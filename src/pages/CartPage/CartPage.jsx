import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import CartItem from '../../components/CartItem/CartItem';

import './CartPage.scss';

const CartPage = ({ cartItems, currentUser, location }) => {
    const [cartTotal, setCartTotal] = useState(0);

    const calculateCartTotal = () => {
        let total = 0;
        cartItems.forEach(item => (total += item.price));
        setCartTotal(total);
    };

    useEffect(() => calculateCartTotal(), [cartItems]);

    return (
        <div className="d-flex flex-column align-items-center mb-5">
            <h1>CART</h1>
            <div
                className={`d-flex flex-column ${
                    cartItems.length && 'flex-md-row'
                } align-items-${cartItems.length ? 'start' : 'center'} justify-content-${
                    cartItems.length ? 'around' : 'center'
                }`}
            >
                <div className="cart-items py-2 text-center">
                    {cartItems.length
                        ? cartItems.map(item => (
                              <CartItem type={item.type} item={item} key={item._id} />
                          ))
                        : 'No items in your cart.'}
                </div>
                {cartItems.length ? (
                    <div className="cart-summary w-100">
                        <div className="d-flex flex-column">
                            <p>ITEMS IN CART:</p>
                            {cartItems.map((item, idx) => (
                                <p
                                    className="d-flex justify-content-between"
                                    key={item._id}
                                >
                                    <span>
                                        {item.type === 'track'
                                            ? item.trackName
                                            : item.packName}
                                    </span>{' '}
                                    <span>${item.price}</span>
                                </p>
                            ))}
                            <hr />
                            <p className="d-flex justify-content-between">
                                TOTAL: <span>${cartTotal}</span>
                            </p>
                            <Link
                                className="btn btn-primary"
                                to={
                                    currentUser
                                        ? {
                                              pathname: '/checkout',
                                              state: { from: location },
                                          }
                                        : {
                                              pathname: '/sign-in',
                                              state: { from: location },
                                          }
                                }
                            >
                                {currentUser ? 'GO TO CHECKOUT' : 'SIGN IN TO PURCHASE'}
                            </Link>
                        </div>
                    </div>
                ) : (
                    <Link className="btn btn-primary" to="/">
                        GO TO STORE
                    </Link>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    cartItems: state.cart.cartItems,
    currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(withRouter(CartPage));
