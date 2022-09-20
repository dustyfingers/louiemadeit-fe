import ShopTracksActionTypes from './shop-tracks-types';

const INITIAL_STATE = {
    shopTracks: null,
};

const shopTracksReducer = (currentState = INITIAL_STATE, action) => {
    switch (action.type) {
        case ShopTracksActionTypes.SET_SHOP_TRACKS:
            return {
                ...currentState,
                shopTracks: action.payload,
            };
        default:
            return currentState;
    }
};

export default shopTracksReducer;
