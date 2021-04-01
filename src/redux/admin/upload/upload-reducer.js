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
        case 'SET_TRACK_NAME':
            return {
                ...currentState,
                name: action.payload
            };
        case 'SET_TRACK_DESCRIPTION':
            return {
                ...currentState,
                description: action.payload
            };
        case 'SET_SELL_TYPE':
            return {
                ...currentState,
                sellType: action.payload
            };
        case 'SET_EXCLUSIVE_PRICE':
            return {
                ...currentState,
                exclusivePrice: action.payload
            };
        case 'SET_LEASE_STEMS_PRICE':
            return {
                ...currentState,
                leaseStemsPrice: action.payload
            };
        case 'SET_LEASE_MASTER_ONLY_PRICE':
            return {
                ...currentState,
                leaseMasterOnlyPrice: action.payload
            };
        case 'SET_TAGGED_VERSION':
            return {
                ...currentState,
                taggedVersion: action.payload
            };
        case 'SET_UNTAGGED_VERSION':
            return {
                ...currentState,
                untaggedVersion: action.payload
            };
        case 'SET_COVER_ART':
            return {
                ...currentState,
                coverArt: action.payload
            };
        case 'SET_TRACK_STEMS':
            return {
                ...currentState,
                trackStems: action.payload
            };
        default:
            return currentState;
    }
};

export default uploadReducer;