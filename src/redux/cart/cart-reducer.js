import CartActionTypes from './cart-types';

const INITIAL_STATE = {
    hidden: true,
    cartItems: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.ADD_CART_ITEM:
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload],
            };
        case CartActionTypes.REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: [...state.cartItems].filter(item => item !== action.payload),
            };
        case CartActionTypes.SET_CART_FULL:
            console.log(action.payload);
            return {
                ...state,
                cartItems: action.payload,
            };
        case CartActionTypes.SET_CART_EMPTY:
            return {
                ...state,
                cartItems: [],
            };
        default:
            return state;
    }
};

export default cartReducer;
