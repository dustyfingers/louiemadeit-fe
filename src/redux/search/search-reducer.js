import SearchActionTypes from './search-types';

const INITIAL_STATE = {
    searchQuery: null,
};

const searchQueryReducer = (currentState = INITIAL_STATE, action) => {
    switch (action.type) {
        case SearchActionTypes.SET_SEARCH_QUERY:
            return {
                ...currentState,
                searchQuery: action.payload,
            };
        default:
            return currentState;
    }
};

export default searchQueryReducer;
