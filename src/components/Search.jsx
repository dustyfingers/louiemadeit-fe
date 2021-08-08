import React from'react';
import { connect } from 'react-redux';

import { setSearchQuery } from '../redux/search/search-actions';
import { setDisplayedTracks } from '../redux/displayed-tracks/displayed-tracks-actions'; 
import { setSearchResults } from '../redux/search-results/search-results-actions';

const Search = ({ shopTracks, searchResults, dispatch, searchQuery }) => {
    const handleSubmit = evt => {
        evt.preventDefault();
        if (searchQuery) dispatch(setDisplayedTracks(searchResults));
        else dispatch(setDisplayedTracks(shopTracks));
    };

    const handleInputChange = evt => {
        const { value } = evt.target;
        dispatch(setSearchQuery(value));

        if (value) {
            let results = [];
            shopTracks && shopTracks.forEach(track => {
                if (track.trackName.includes(value) && !results.includes(track) && value !== '') results.push(track);
            });
            dispatch(setSearchResults(results));
        }
    };

    return (
        <form className="ms-2 d-flex justify-content-end" onSubmit={handleSubmit}>
            <div className="search-container">
                <input className="form-control me-2" type="search" placeholder="find a beat by title" aria-label="Search" onChange={handleInputChange} />
            </div>
            <button className="btn btn-outline-success ms-2" type="submit">search</button>
        </form>
    );
};

const mapStateToProps = state => ({
    shopTracks: state.shopTracks.shopTracks,
    searchResults: state.searchResults.searchResults,
    searchQuery: state.searchQuery.searchQuery
});

export default connect(mapStateToProps)(Search);