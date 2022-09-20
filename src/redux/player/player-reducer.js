import PlayerActionTypes from './player-types';

const INITIAL_STATE = {
    currentTrack: null,
};

const playerReducer = (currentState = INITIAL_STATE, action) => {
    switch (action.type) {
        case PlayerActionTypes.SET_CURRENT_TRACK:
            return {
                ...currentState,
                currentTrack: action.payload,
            };
        default:
            return currentState;
    }
};

export default playerReducer;
