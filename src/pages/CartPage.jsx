import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import CartItem from '../components/CartItem/CartItem';

const CartPage = ({cartItems, history}) => {

    return (
        <div className={`d-flex ${!cartItems.length && 'flex-column'} align-items-center justify-content-center`}>
            <div className='cart-items'>
                {console.log(cartItems)}
                {cartItems.length ? cartItems.map(item => (<CartItem item={item} key={item._id}/>)) : 'No items in your cart.'}
            </div>
            <div className={`${cartItems.length && 'ps-4'}`}>
                {cartItems.length ? 
                    (<div>
                        <button onClick={() => history.push("/checkout")}>GO TO CHECKOUT</button>
                    </div>) : 
                    (<button onClick={() => history.push("/")}>GO TO STORE</button>)}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    cartItems: state.cart.cartItems
});

export default connect(mapStateToProps)(withRouter(CartPage));