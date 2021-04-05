import UploadActionTypes from './upload-types';

const INITIAL_STATE = {
    name: null,
    description: null,
    sellType: null,
    exclusivePrice: null,
    leaseStemsPrice: null,
    leaseMasterOnlyPrice: null,
    taggedVersion: null,
    untaggedVersion: null,
    coverArt: null,
    trackStems: null
};

const uploadReducer = (currentState = INITIAL_STATE, action) => {
    switch (action.type) {
        case UploadActionTypes.SET_TRACK_NAME:
            return {
                ...currentState,
                name: action.payload
            };
        case UploadActionTypes.SET_TRACK_DESCRIPTION:
            return {
                ...currentState,
                description: action.payload
            };
        case UploadActionTypes.SET_TAGGED_VERSION:
            return {
                ...currentState,
                taggedVersion: action.payload
            };
        case UploadActionTypes.SET_UNTAGGED_VERSION:
            return {
                ...currentState,
                untaggedVersion: action.payload
            };
        case UploadActionTypes.SET_COVER_ART:
            return {
                ...currentState,
                coverArt: action.payload
            };
        case UploadActionTypes.SET_TRACK_STEMS:
            return {
                ...currentState,
                trackStems: action.payload
            };
        default:
            return currentState;
    }
};

export default uploadReducer;