const INITIAL_STATE = {
    currentTrack: null
};

const playerReducer = (currentState = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_CURRENT_TRACK':
            return {
                ...currentState,
                currentTrack: action.payload
            }
        default:
            return currentState;
    }
};

export default playerReducer;