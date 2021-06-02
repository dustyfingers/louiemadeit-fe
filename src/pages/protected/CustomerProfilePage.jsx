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
            console.log({purchasedTracks})
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
                    (tracks.length ? tracks.map((track, idx) => <p key={idx}>{track.trackName}</p>) : 'No tracks purchased.') : 
                    'Fetching purchased tracks...'}
                
            </div>
        </div>
    );
};

export default connect()(CustomerProfilePage);