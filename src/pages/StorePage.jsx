// import libs/other
import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from "react-redux";

// import components
import TrackPreview from '../components/TrackPreview/TrackPreview';
import { setShopTracks } from '../redux/shop-tracks/shop-tracks-actions';
import { setDisplayedTracks } from '../redux/displayed-tracks/displayed-tracks-actions';
import { apiLink } from '../env';

const StorePage = ({ currentUser, displayedTracks, dispatch }) => {
    useEffect(() => {
        let url = `${apiLink}/track/all`;

        axios.get(url).then(res => {
            dispatch(setShopTracks(res.data.tracks));
            dispatch(setDisplayedTracks(res.data.tracks));
        });
    }, []);

    console.log(currentUser);

    return (
        <div className="d-flex flex-column justify-content-center text-center">
            <h1>TRACKS</h1>
            <div className="d-flex flex-wrap justify-content-center pb-5">
                {displayedTracks ? 
                    (displayedTracks.length ? (displayedTracks.map(track => <TrackPreview track={track} key={track._id}/>)) : 'No tracks found...')
                    : 'No tracks found...'}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    displayedTracks: state.displayedTracks.displayedTracks,
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(StorePage);