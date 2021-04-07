// import libs/other
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import './TrackPreview.scss';
import { setCurrentTrack } from '../../redux/player/player-actions';
import { addCartItem } from '../../redux/cart/cart-actions';
import { apiLink } from '../../env';

// TODO: make playIcon change back when different track is played
const TrackPreview = ({track, cartItems, currentPlayerTrack, dispatch}) => {
    const [coverUrl, setCoverUrl] = useState('');
    const [trackUrl, setTrackUrl] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [playIcon, setPlayIcon] = useState('/play-btn.svg');

    useEffect(() => {
        const fetchTrackData = async () => {
            try {
                const url = apiLink + '/s3/generate-get-url';
    
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
                setCoverUrl(coverArtRes.data.getUrl);
                setTrackUrl(trackRes.data.getUrl);
            } catch (err) {
                console.log(err);
            }
        }

        fetchTrackData();
    }, []);

    // this watches the global track being played and sets local state accordingly
    useEffect(() => {
        if (currentPlayerTrack === null && isPlaying) setPlayIcon('/play-btn-fill.svg');
        else if (trackUrl === currentPlayerTrack) setPlayIcon('/play-btn-fill.svg');
        else if (trackUrl !== currentPlayerTrack) setPlayIcon('/play-btn.svg');

    }, [currentPlayerTrack]);

    const handleClickPlayButton = evt => {
        setIsPlaying(true);
        dispatch(setCurrentTrack(trackUrl));
    };

    const handleClickAddToCartButton = evt => {
        if (!cartItems.includes(track)) {
            dispatch(addCartItem(track))
        } else {
            console.log('item already in cart!')
        }
    };

    return (
        <div className='card col-md-4 col-lg-2 m-3'>
            <img src={coverUrl} className='card-img-top' alt={`${track.trackName}-cover`} />
            <div className='card-body'>
                <p className='card-text'>{track.trackName}</p>
                <div className='track-card-btns d-flex align-items-end justify-content-between'>
                    <span type='button' className='play-btn' onClick={handleClickPlayButton}>
                        {isPlaying ? 
                            (<img className='play-btn-icon' alt='currently playing' src={playIcon}/>) :
                            (<img className='play-btn-icon' alt='not currently playing' src={playIcon}/>)
                        }
                    </span>
                    <span type='button' className='add-to-cart-btn' onClick={handleClickAddToCartButton}>
                        <img className='add-to-cart-icon' alt='add to cart' src='/plus-square.svg' />
                    </span>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    currentPlayerTrack: state.player.currentTrack,
    cartItems: state.cart.cartItems
});

export default connect(mapStateToProps)(TrackPreview);