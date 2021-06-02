import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { ToastsStore } from 'react-toasts';

import { apiLink } from '../../env';

const CustomerProfilePage = () => {
    const [tracks, setTracks] = useState(null);

    const fetchCustomerData = async () => {
        try {
            const { data: { purchasedTracks } } = await axios.get(`${apiLink}/stripe/purchased-tracks`);
            setTracks(purchasedTracks);
        } catch (error) {
            ToastsStore.error('There was an error fetching your profile...');
        }
    }

    useEffect(() => { fetchCustomerData() }, []);

    return (
        <div className="d-flex flex-column justify-content-center text-center">
            <h1>CUSTOMER PROFILE</h1>
            <div>
                {tracks ? 
                    (tracks.length ? tracks.map((track, idx) => {
                        return <div key={idx}>
                            <p>{track.trackName}</p>
                            <p><a href={track.taggedGetUrl} rel="noopener noreferrer" target="_blank">TAGGED FILES</a></p>
                            <p><a href={track.untaggedGetUrl} rel="noopener noreferrer" target="_blank">UNTAGGED FILES</a></p>
                            {track.stemsGetUrl ? (<p><a href={track.stemsGetUrl} rel="noopener noreferrer" target="_blank">STEM FILES</a></p>) : ''}
                        </div>}) : 
                    'No tracks purchased.') : 
                'Fetching purchased tracks...'}
            </div>
        </div>
    );
};

export default connect()(CustomerProfilePage);