import React from 'react';
import { connect } from 'react-redux';

import { addCartItem } from '../../redux/cart/cart-actions';

const AddToCartModal = ({track, cartItems, dispatch}) => {

    const handleAddToCartButtonClicked = (priceID, price) => {
        if (cartItems.some(item => item._id === track._id)) console.log('item already in cart!');
        else dispatch(addCartItem({trackName: track.trackName, trackID: track.stripeProduct, price, priceID, coverArtUrl: track.coverArtUrl, _id: track._id }));
    };

    return (
    <div className="modal fade" id="addToCartModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Choose License Type</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body container">
                    <div className="row">
                        <span className='col-8 text-start'>ADD TO CART AS EXCLUSIVE</span> 
                        <span className='col'>{track.prices.exclusivePrice}</span>
                        <span type='button' className='add-to-cart-btn col' onClick={() => handleAddToCartButtonClicked(track.prices.exclusiveStripePrice, track.prices.exclusivePrice)}>
                            <img className='add-to-cart-icon' alt='add to cart' src='/plus-square.svg' />
                        </span>
                    </div>
                    <div className="row">
                        <span className='col-8 text-start'>ADD TO CART AS LEASE</span>
                        <span className='col'>{track.prices.leasePriceStems}</span>
                        <span type='button' className='add-to-cart-btn col' onClick={() => handleAddToCartButtonClicked(track.prices.leaseStripePriceMaster, track.prices.leasePriceStems)}>
                            <img className='add-to-cart-icon' alt='add to cart' src='/plus-square.svg' />
                        </span>
                    </div>
                    <div className="row">
                        <span className='col-8 text-start'>ADD TO CART AS LEASE (master only)</span>
                        <span className='col'>{track.prices.leasePriceMaster}</span>
                        <span type='button' className='add-to-cart-btn col' onClick={() => handleAddToCartButtonClicked(track.prices.leaseStripePriceStems, track.prices.leasePriceMaster)}>
                            <img className='add-to-cart-icon' alt='add to cart' src='/plus-square.svg' />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

const mapStateToProps = state => ({
    cartItems: state.cart.cartItems
});

export default connect(mapStateToProps)(AddToCartModal);