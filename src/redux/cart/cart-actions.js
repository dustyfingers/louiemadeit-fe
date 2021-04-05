import CartActionTypes from './cart-types';

// 'payload' is actually an optional property! til!
export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const addCartItem = item => ({
    type: CartActionTypes.ADD_CART_ITEM,
    payload: item
});

export const removeCartItem = item => ({
    type: CartActionTypes.REMOVE_CART_ITEM,
    payload: item
});