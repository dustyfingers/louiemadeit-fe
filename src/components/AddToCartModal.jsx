import React, { useRef } from 'react'
import { connect } from 'react-redux'
import { Modal } from "bootstrap"
import { ToastsStore } from 'react-toasts'

import { addCartItem } from '../redux/cart/cart-actions'

const AddToCartModal = ({ track, cartItems, dispatch }) => {
    const modalRef = useRef()

    const handleAddToCartButtonClicked = (priceID, price) => {
        if (cartItems.some(item => item._id === track._id)) {
            ToastsStore.warning('Track already in cart!')
        } else {
            const cartItem = {
                trackName: track.trackName, 
                trackID: track.stripeProduct, 
                priceID, price,  
                coverArtUrl: track.coverArtUrl, 
                _id: track._id,
                type: 'track'
            }
            dispatch(addCartItem(cartItem))
            
            let localCart = JSON.parse(localStorage.getItem('louiemadeit_cart'))
            localCart.push(cartItem)
            localStorage.setItem('louiemadeit_cart', JSON.stringify(localCart))

            ToastsStore.success('Track added to cart!')
            
            const modalElement = modalRef.current
            const bsModal = Modal.getInstance(modalElement)
            bsModal.hide()
        }
    }

    return (
    <div ref={modalRef} className="modal fade" id={`add${track.trackName.replace(/ /g, "_")}ToCartModal`} tabIndex="-1" aria-labelledby="addToCartModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Choose License Type - {track.trackName}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body container">
                    <div className="row">
                        <span className='col-8 text-start'>BUY AS EXCLUSIVE</span> 
                        <span className='col'>{track.prices.exclusivePrice}</span>
                        <span type='button' className='add-to-cart-btn col' onClick={() => handleAddToCartButtonClicked(track.prices.exclusiveStripePrice, track.prices.exclusivePrice)}>
                            <img className='add-to-cart-icon' alt='add to cart' src='/bag-plus.svg' />
                        </span>
                    </div>
                    <div className="row">
                        <span className='col-8 text-start'>BUY AS LEASE (stems)</span>
                        <span className='col'>{track.prices.leasePriceStems}</span>
                        <span type='button' className='add-to-cart-btn col' onClick={() => handleAddToCartButtonClicked(track.prices.leaseStripePriceMaster, track.prices.leasePriceStems)}>
                            <img className='add-to-cart-icon' alt='add to cart' src='/bag-plus.svg' />
                        </span>
                    </div>
                    <div className="row">
                        <span className='col-8 text-start'>BUY AS LEASE (master only)</span>
                        <span className='col'>{track.prices.leasePriceMaster}</span>
                        <span type='button' className='add-to-cart-btn col' onClick={() => handleAddToCartButtonClicked(track.prices.leaseStripePriceStems, track.prices.leasePriceMaster)}>
                            <img className='add-to-cart-icon' alt='add to cart' src='/bag-plus.svg' />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

const mapStateToProps = state => ({
    cartItems: state.cart.cartItems
})

export default connect(mapStateToProps)(AddToCartModal)