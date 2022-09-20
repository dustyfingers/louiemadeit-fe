import SearchResultsActionTypes from './search-results-types';

const INITIAL_STATE = {
    searchResults: null,
};

const searchResultsReducer = (currentState = INITIAL_STATE, action) => {
    switch (action.type) {
        case SearchResultsActionTypes.SET_SEARCH_RESULTS:
            return {
                ...currentState,
                searchResults: action.payload,
            };
        default:
            return currentState;
    }
};

export default searchResultsReducer;
