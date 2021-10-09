import DisplayedPacksActionTypes from './displayed-packs-types';

const INITIAL_STATE  = {
    displayedPacks: null
};

const displayedPacksReducer = (currentState = INITIAL_STATE, action) => {
    switch (action.type) {
        case DisplayedPacksActionTypes.SET_DISPLAYED_PACKS:
            return {
                ...currentState,
                displayedPacks: action.payload
            };
        default:
            return currentState;
    }
};

export default displayedPacksReducer;