import React from'react';
import { connect } from 'react-redux';

import { setSearchQuery } from '../redux/search/search-actions';

const Search = ({dispatch}) => {
    const handleSubmit = evt => {
        evt.preventDefault();
    };

    return (
        <form className="d-flex" onSubmit={handleSubmit}>
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={evt => dispatch(setSearchQuery(evt.target.value))} />
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
    );
};

export default connect()(Search);