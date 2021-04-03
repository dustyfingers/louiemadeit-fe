// import libs/other
import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from "react-redux";

// import components
import TrackPreview from '../components/TrackPreview/TrackPreview';
import { setShopTracks } from '../redux/shop-tracks/shop-tracks-actions';

const StorePage = ({shopTracks, dispatch}) => {
    useEffect(() => {

        let url = 'http://localhost:5000/track/all';

        axios.get(url).then(res => {
            const { tracks } = res.data;

            // update the beats store state
            dispatch(setShopTracks(tracks));
        });


    }, []);

    return (
        <div className="d-flex flex-column justify-content-center py-5 text-center">
            <h1>TRACKS</h1>
            <div className="d-flex flex-wrap justify-content-center">
                {shopTracks ? shopTracks.map(track => <TrackPreview track={track} key={track.id}/>) : 'No tracks found...'}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    shopTracks: state.shopTracks.shopTracks
});

export default connect(mapStateToProps)(StorePage);