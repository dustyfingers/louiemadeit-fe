// import libs/other
import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { setCurrentTrack } from "../../redux/player/player-actions";

const TrackPreview = ({track, dispatch}) => {
    let [coverUrl, setCoverUrl] = useState('');
    let [trackUrl, setTrackUrl] = useState('');

    console.log(track)

    useEffect(() => {
        const fetchTrackData = async () => {
            try {
                const url = "http://localhost:5000/s3/generate-get-url";
    
                const trackFileOptions = {
                    params: {
                        Key: track.taggedVersion
                    }
                };
    
                const coverArtOptions = {
                    params: {
                        Key: track.coverArt
                    }
                };
        
                const trackRes = await axios.get(url, trackFileOptions);
                const coverArtRes = await axios.get(url, coverArtOptions)
                const trackFileUrl = trackRes.data.getUrl;
                const coverArtUrl = coverArtRes.data.getUrl;
                setCoverUrl(coverArtUrl);
                setTrackUrl(trackFileUrl);
            } catch (err) {
                console.log(err);
            }
        }

        fetchTrackData();
    }, []);

    const handleClick = evt => {
        // set app state with given url
        dispatch(setCurrentTrack(trackUrl));
    }

    return (
        <div className="card col-sm-6 col-md-4 col-lg-2 m-3">
            <img src={coverUrl} className="card-img-top" alt="..." />
            <div className="card-body">
                <p className="card-text">{track.title}</p>

                {/* when button pressed dispatch action to setCurrentTrack */}
                <span className="card-text" onClick={handleClick}>Play track button</span>
            </div>
        </div>
    );
};

export default connect()(TrackPreview);