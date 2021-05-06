import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import './TrackPreviewCard.scss';
import { setCurrentTrack } from '../../redux/player/player-actions';
import AddToCartModal from '../AddToCartModal/AddToCartModal';
import ProgressiveImage from '../ProgressiveImage/ProgressiveImage';

const TrackPreviewCard = ({track, currentPlayerTrack, dispatch}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [playIcon, setPlayIcon] = useState('/play-btn.svg');

    // this watches the global track being played and sets local state accordingly
    useEffect(() => {
        if (track.taggedVersionUrl === currentPlayerTrack) setPlayIcon('/pause-btn.svg');
        else setPlayIcon('/play-btn.svg');
    }, [currentPlayerTrack]);

    const handleClickPlayButton = () => {
        setIsPlaying(!isPlaying);
        dispatch(currentPlayerTrack === track.taggedVersionUrl ? setCurrentTrack('') : setCurrentTrack(track.taggedVersionUrl));
    };

    return (
        <div className='card col-md-6 col-lg-3 mb-4 track-preview-card'>
            <ProgressiveImage preview="/placeholder.jpg" image={track.coverArtUrl} alt={`${track.trackName}-cover`} />
            <div className='card-body'>
                <p className='card-text'>{track.trackName}</p>
                <div className='track-card-btns d-flex align-items-end justify-content-between'>
                    <span type='button' className='play-btn' onClick={handleClickPlayButton}>
                        {isPlaying ? 
                            (<img className='play-btn-icon' alt='currently playing' src={playIcon}/>) :
                            (<img className='play-btn-icon' alt='not currently playing' src={playIcon}/>)
                        }
                    </span>
                    <AddToCartModal track={track} />
                    <span type='button' className='add-to-cart-btn' data-bs-toggle="modal" data-bs-target={`#add${track.trackName.replace(/ /g, "_")}ToCartModal`}>
                        <img className='add-to-cart-icon' alt='add to cart' src='/bag-plus.svg' />
                    </span>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    currentPlayerTrack: state.player.currentTrack
});

export default connect(mapStateToProps)(TrackPreviewCard);