import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import CartItem from '../components/CartItem/CartItem';

const CartPage = ({cartItems, currentUser, history}) => {
    return (
        <div className="d-flex flex-column align-items-center">
            <h1>CART</h1>
            <div className={`d-flex w-100 ${!cartItems.length && 'flex-column'} align-items-center justify-content-${cartItems.length ? 'between' : 'center'}`}>
                <div className={`cart-items ${cartItems.length && 'w-75'} py-2`}>
                    {cartItems.length ? cartItems.map(item => (<CartItem item={item} key={item._id}/>)) : 'No items in your cart.'}
                </div>
                <div className={`${cartItems.length && 'ps-4'}`}>
                    {cartItems.length ? 
                        (<button 
                            onClick={currentUser ? () => history.push("/checkout") : () => history.push("/sign-in")}>
                                {currentUser ? 'GO TO CHECKOUT' : 'SIGN IN TO PURCHASE'}
                        </button>) : 
                        (<button onClick={() => history.push("/")}>GO TO STORE</button>)}
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