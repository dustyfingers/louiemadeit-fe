// import libs/other
import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from "react-redux";

// import components
import TrackPreviewCard from '../components/TrackPreviewCard/TrackPreviewCard';
import { setShopTracks } from '../redux/shop-tracks/shop-tracks-actions';
import { setDisplayedTracks } from '../redux/displayed-tracks/displayed-tracks-actions';
import { apiLink } from '../env';

const StorePage = ({ displayedTracks, dispatch }) => {
    useEffect(() => {
        let url = `${apiLink}/track/all`;

        axios.get(url).then(res => {
            dispatch(setShopTracks(res.data.tracks));
            dispatch(setDisplayedTracks(res.data.tracks));
        });
    }, []);

    return (
        <div className="d-flex flex-column justify-content-center text-center">
            <h1>TRACKS</h1>
            <div className="container pb-5">
                {displayedTracks ? 
                    (displayedTracks.length ? (<div className="row">{displayedTracks.map(track => <TrackPreviewCard track={track} key={track._id}/>)}</div>) : 'No tracks found...')
                    : 'No tracks found...'}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    displayedTracks: state.displayedTracks.displayedTracks
});

export default connect(mapStateToProps)(StorePage);