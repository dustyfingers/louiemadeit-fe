import PackActionTypes from './pack-types';

const INITIAL_STATE = {
    name: null,
    description: null,
    zipFile: null,
    coverArt: null,
};

const uploadReducer = (currentState = INITIAL_STATE, action) => {
    switch (action.type) {
        case PackActionTypes.SET_PACK_NAME:
            return {
                ...currentState,
                name: action.payload,
            };
        case PackActionTypes.SET_PACK_DESCRIPTION:
            return {
                ...currentState,
                description: action.payload,
            };
        case PackActionTypes.SET_PACK_ZIP:
            return {
                ...currentState,
                zipFile: action.payload,
            };
        case PackActionTypes.SET_COVER_ART:
            return {
                ...currentState,
                coverArt: action.payload,
            };
        default:
            return currentState;
    }
};

export default uploadReducer;
