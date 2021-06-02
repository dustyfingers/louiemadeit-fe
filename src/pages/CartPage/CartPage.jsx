import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import CartItem from '../../components/CartItem/CartItem';

import './CartPage.scss';

const CartPage = ({cartItems, currentUser, history}) => {
    const [cartTotal, setCartTotal] = useState(0);

    const calculateCartTotal = () => {
        let total = 0;
        cartItems.forEach(item => total += item.price);
        setCartTotal(total);
    }
    
    useEffect(() => { calculateCartTotal() }, [cartItems]);

    return (
        <div className="d-flex flex-column align-items-center mb-5">
            <h1>CART</h1>
            <div className={`d-flex w-100 flex-column ${cartItems.length && 'flex-md-row'} align-items-${cartItems.length ? 'start' : 'center'} justify-content-${cartItems.length ? 'between' : 'center'}`}>
                <div className="cart-items py-2 text-center">
                    {cartItems.length ? cartItems.map(item => (<CartItem item={item} key={item._id}/>)) : 'No items in your cart.'}
                </div>
                <div className={`${cartItems.length && 'ps-4 cart-summary'}`}>
                    {cartItems.length ? 
                        (<div className="d-flex flex-column">
                            <p>Items in Cart:</p>
                            {cartItems.map(item => {
                                const { trackName, price } = item;
                                return <p className="d-flex justify-content-between">
                                    <span>{trackName}</span> <span className="price">{price}</span>
                                </p>;
                            })}
                            <hr />
                            <p className="d-flex justify-content-between">TOTAL: <span className="price">{cartTotal}</span></p>
                            <button
                                className="btn btn-primary" 
                                onClick={currentUser ? () => history.push("/checkout") : () => history.push("/sign-in")}>
                                {currentUser ? 'GO TO CHECKOUT' : 'SIGN IN TO PURCHASE'}
                        </button>
                        </div>) : 
                        (<button className="btn btn-primary" onClick={() => history.push("/")}>GO TO STORE</button>)}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    cartItems: state.cart.cartItems,
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(withRouter(CartPage));