import DisplayedTracksActionTypes from './displayed-tracks-types';

const INITIAL_STATE = {
    displayedTracks: null,
};

const displayedTracksReducer = (currentState = INITIAL_STATE, action) => {
    switch (action.type) {
        case DisplayedTracksActionTypes.SET_DISPLAYED_TRACKS:
            return {
                ...currentState,
                displayedTracks: action.payload,
            };
        default:
            return currentState;
    }
};

export default displayedTracksReducer;
