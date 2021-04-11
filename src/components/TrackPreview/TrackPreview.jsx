// import libs/other
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import './TrackPreview.scss';
import { setCurrentTrack } from '../../redux/player/player-actions';
import { addCartItem } from '../../redux/cart/cart-actions';

// TODO: make playIcon change back when different track is played or when clicked again (to pause)
const TrackPreview = ({track, cartItems, currentPlayerTrack, dispatch}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [playIcon, setPlayIcon] = useState('/play-btn.svg');

    // this watches the global track being played and sets local state accordingly
    useEffect(() => {
        if (currentPlayerTrack === null && isPlaying) setPlayIcon('/play-btn-fill.svg');
        else if (track.taggedVersionUrl === currentPlayerTrack) setPlayIcon('/play-btn-fill.svg');
        else if (track.taggedVersionUrl !== currentPlayerTrack) setPlayIcon('/play-btn.svg');
    }, [currentPlayerTrack]);

    const handleClickPlayButton = () => {
        setIsPlaying(true);
        dispatch(setCurrentTrack(track.taggedVersionUrl));
    };

    const handleClickAddToCartButton = () => {
        if (cartItems.some(item => item._id === track._id)) console.log('item already in cart!');
        else dispatch(addCartItem(track));
    };

    return (
        <div className='card col-md-4 col-lg-2 m-3'>
            <img src={track.coverArtUrl} className='card-img-top' alt={`${track.trackName}-cover`} />
            <div className='card-body'>
                <p className='card-text'>{track.trackName}</p>
                <div className='track-card-btns d-flex align-items-end justify-content-between'>
                    <span type='button' className='play-btn' onClick={handleClickPlayButton}>
                        {isPlaying ? 
                            (<img className='play-btn-icon' alt='currently playing' src={playIcon}/>) :
                            (<img className='play-btn-icon' alt='not currently playing' src={playIcon}/>)
                        }
                    </span>
                    {/* MODAL */}
                    <div className="modal fade" id="addToCartModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Choose License Type</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div>
                                        {track.prices.exclusivePrice} - 
                                        <span type='button' className='add-to-cart-btn' onClick={handleClickAddToCartButton}>
                                            <img className='add-to-cart-icon' alt='add to cart' src='/plus-square.svg' />
                                        </span>
                                    </div>
                                    <div>
                                        {track.prices.exclusivePrice} - 
                                        <span type='button' className='add-to-cart-btn' onClick={handleClickAddToCartButton}>
                                            <img className='add-to-cart-icon' alt='add to cart' src='/plus-square.svg' />
                                        </span>
                                    </div>
                                    <div>
                                        {track.prices.exclusivePrice} - 
                                        <span type='button' className='add-to-cart-btn' onClick={handleClickAddToCartButton}>
                                            <img className='add-to-cart-icon' alt='add to cart' src='/plus-square.svg' />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* END MODAL */}
                    <span type='button' className='add-to-cart-btn' data-bs-toggle="modal" data-bs-target="#addToCartModal">
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