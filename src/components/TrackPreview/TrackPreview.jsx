// import libs/other
import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";

import "./TrackPreview.scss";
import { setCurrentTrack } from "../../redux/player/player-actions";

// TODO: make playIcon change back when different track is played
const TrackPreview = ({track, currentPlayerTrack, dispatch}) => {
    const [coverUrl, setCoverUrl] = useState('');
    const [trackUrl, setTrackUrl] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [playIcon, setPlayIcon] = useState('/play-btn.svg');

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
                const coverArtRes = await axios.get(url, coverArtOptions);
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

    useEffect(() => {
        // if there is no track currently playing
        if (currentPlayerTrack === null) {
            console.log('track url:  ' + trackUrl);
            console.log('currentPlayerTrack:  ' + currentPlayerTrack);
    
            if (isPlaying) setPlayIcon('/play-btn-fill.svg');

        } else {
            console.log('track url:  ' + trackUrl);
            console.log('currentPlayerTrack:  ' + currentPlayerTrack);
            if (trackUrl === currentPlayerTrack) setPlayIcon('/play-btn-fill.svg');
        }


    }, [isPlaying])

    const handleClick = evt => {
        setIsPlaying(true);
        dispatch(setCurrentTrack(trackUrl));
    };

    return (
        <div className="card col-sm-6 col-md-4 col-lg-2 m-3">
            <img src={coverUrl} className="card-img-top" alt={`${track.trackName}-cover`} />
            <div className="card-body">
                <p className="card-text">{track.trackName}</p>
                <span type="button" className="play-btn" onClick={handleClick}>
                    {isPlaying ? 
                        (<img className='play-btn-icon' alt="currently playing" src={playIcon}/>) :
                        (<img className='play-btn-icon' alt="not currently playing" src={playIcon}/>)
                    }
                </span>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    currentPlayerTrack: state.player.currentTrack
});

export default connect(mapStateToProps)(TrackPreview);