import React from 'react'
import { connect } from 'react-redux'
import { ToastsStore } from 'react-toasts';

import { addCartItem } from '../redux/cart/cart-actions'
import ProgressiveImage from './ProgressiveImage'
import '../styles/shared/preview-card.scss'

// TODO: needs to show price and have add to cart functionality
const PackPreviewCard = ({ pack, dispatch, cartItems }) => {

    const handleAddToCartButtonClicked = () => {
        if (cartItems.some(item => item._id === pack._id)) {
            ToastsStore.warning('Sample pack already in cart!');
        } else {
            dispatch(addCartItem({
                packName: pack.packName, 
                packID: pack.stripeProduct, 
                price: pack.price, 
                priceID: pack.stripePrice, 
                coverArtUrl: pack.coverArtUrl, 
                _id: pack._id 
            }));
            ToastsStore.success('Sample pack added to cart!');
        }
    };

    return (
        <div className="col-md-4">
            <div className='card mx-1 mb-4 preview-card'>
                <ProgressiveImage preview="/placeholder.jpg" image={pack.coverArtUrl} alt={`${pack.packName}-cover`} />
                <div className='card-body'>
                    <p className='card-text'>{pack.packName}</p>
                    <div className='pack-card-btns d-flex align-items-end justify-content-between'>
                        <span>${pack.price}</span>
                        <span type='button' className='add-to-cart-btn' onClick={() => handleAddToCartButtonClicked()}>
                            <img className='add-to-cart-icon' alt='add to cart' src='/bag-plus.svg' />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    cartItems: state.cart.cartItems
})

export default connect(mapStateToProps)(PackPreviewCard)