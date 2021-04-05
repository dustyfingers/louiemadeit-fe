import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './CartDropdown.scss';
import CartItem from '../CartItem/CartItem';

const CartDropdown = ({cartItems, history}) => {

    return (
        <div className='cart-dropdown'>
            <div className='cart-items'>
                {cartItems.map(item => (<CartItem item={item} key={item._id}/>))}
            </div>
            <button onClick={() => history.push("/checkout")}>GO TO CHECKOUT</button>
        </div>
    );
};

const mapStateToProps = state => ({
    cartItems: state.cart.cartItems
});

export default connect(mapStateToProps)(withRouter(CartDropdown));