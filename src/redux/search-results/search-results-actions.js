import SearchResultsActionTypes from './search-results-types';

export const setSearchResults = searchResults => ({
    type: SearchResultsActionTypes.SET_SEARCH_RESULTS,
    payload: searchResults,
});
