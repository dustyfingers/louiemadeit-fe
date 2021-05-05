import React from 'react';
import { connect } from 'react-redux';
import { ToastsStore } from 'react-toasts';

import { removeCartItem } from '../../redux/cart/cart-actions';

const CartItem = ({item, dispatch}) => {
    const handleDeleteCartItemButtonPressed = () => {
        dispatch(removeCartItem(item));
        ToastsStore.success('Item removed from cart...');
    }
    
    return (
        <div className="card border-light mb-3">
            <div className="row g-0">
                <div className="col-md-4"><img className="h-100 w-100" alt={item.trackName} src={item.coverArtUrl}/></div>
                <div className="card-body col-md-8 d-flex justify-content-between">
                    <div>
                        <h5 className="card-title">{item.trackName} - {item.price}</h5>
                    </div>
                    <div className="d-flex align-items-center justify-content-end">
                        <img 
                            src="/x-square.svg" 
                            height='24px' 
                            width='24px' 
                            alt={`remove ${item.trackName} from cart`} 
                            onClick={handleDeleteCartItemButtonPressed} />
                    </div>
                </div>
            </div>
        </div>
    );
};


export default connect()(CartItem);