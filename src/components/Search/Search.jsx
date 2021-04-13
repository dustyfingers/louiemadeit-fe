import React from'react';
import { connect } from 'react-redux';

import { setSearchQuery } from '../../redux/search/search-actions';
import { setSearchResults } from '../../redux/search-results/search-results-actions';

import './Search.scss';

// TODO: requirements
// DONE: Search suggestions/“auto-complete” results appear below the search bar dynamically as you type (implement this first)
// TODO: Hitting enter/pressing the search button on a search query filters your beats
// TODO: If time permits, add a sorting feature to sort your beats by track name

// if a user begins typing, drop down should appear with any matching tracks
// take search query, check it against track titles in state
// display the tracks that match in the dropdown


const Search = ({ shopTracks, searchResults, dispatch}) => {

    const handleSubmit = evt => {
        evt.preventDefault();
        // TODO: step 2 here
    };

    const handleInputChange = evt => {
        const { value } = evt.target;
        let results = [];

        dispatch(setSearchQuery(value));

        shopTracks && shopTracks.forEach(track => {
            if (track.trackName.includes(value) && !results.includes(track) && value !== '') results.push(track);
        });

        dispatch(setSearchResults(results));
    };

    return (
        <form className="d-flex" onSubmit={handleSubmit}>
            <div className="search-container">
                <input className="form-control me-2 dropdown-toggle" data-bs-toggle="dropdown-menu" type="search" placeholder="Search" aria-label="Search" onChange={handleInputChange} />
                {searchResults && (
                    <div className="search-dropdown">
                        {searchResults.map(track => (<li key={track._id}><a className="dropdown-item" href="#">{track.trackName}</a></li>))}
                    </div>
                )}
            </div>


            <button className="btn btn-outline-success ms-2" type="submit">Search</button>
        </form>
    );
};

const mapStateToProps = state => ({
    shopTracks: state.shopTracks.shopTracks,
    searchResults: state.searchResults.searchResults
});

export default connect(mapStateToProps)(Search);