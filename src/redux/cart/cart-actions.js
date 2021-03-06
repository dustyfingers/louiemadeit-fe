import CartActionTypes from './cart-types';

export const addCartItem = item => ({
    type: CartActionTypes.ADD_CART_ITEM,
    payload: item
});

export const removeCartItem = item => ({
    type: CartActionTypes.REMOVE_CART_ITEM,
    payload: item
});

export const setCartEmpty = () => ({
    type: CartActionTypes.SET_CART_EMPTY,
    payload: []
});