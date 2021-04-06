import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import CartItem from '../components/CartItem/CartItem';

const CartPage = ({cartItems, history}) => {

    return (
        <div className='cart-dropdown'>
            <div className='cart-items'>
                {cartItems.length ? cartItems.map(item => (<CartItem item={item} key={item._id}/>)) : 'No items in your cart.'}
            </div>
            <button onClick={() => history.push("/checkout")}>GO TO CHECKOUT</button>
        </div>
    );
};

const mapStateToProps = state => ({
    cartItems: state.cart.cartItems
});

export default connect(mapStateToProps)(withRouter(CartPage));