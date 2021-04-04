import CartActionTypes from './cart-types';

// 'payload' is actually an optional property! til!
export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
});