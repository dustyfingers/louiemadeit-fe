import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import AddToCartModal from './AddToCartModal'
import ProgressiveImage from './ProgressiveImage'

// TODO: needs to show price and have add to cart functionality
const PackPreviewCard = ({ pack, dispatch }) => {

    const handleAddToCartButtonClicked = (priceID, price) => {
        // if (cartItems.some(item => item._id === track._id)) {
        //     ToastsStore.warning('Track already in cart!');
        // } else {
        //     dispatch(addCartItem({
        //         trackName: track.trackName, 
        //         trackID: track.stripeProduct, 
        //         price, 
        //         priceID, 
        //         coverArtUrl: track.coverArtUrl, 
        //         _id: track._id 
        //     }));
        //     ToastsStore.success('Track added to cart!');
        // }
    };

    return (
        <div className="col-md-4">
            <div className='card mx-1 mb-4 pack-preview-card'>
                <ProgressiveImage preview="/placeholder.jpg" image={pack.coverArtUrl} alt={`${pack.packName}-cover`} />
                <div className='card-body'>
                    <p className='card-text'>{pack.packName}</p>
                    <div className='pack-card-btns d-flex align-items-end justify-content-between'>
                        <span type='button' className='add-to-cart-btn' onClick={() => handleAddToCartButtonClicked()}>
                            <img className='add-to-cart-icon' alt='add to cart' src='/bag-plus.svg' />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect()(PackPreviewCard)