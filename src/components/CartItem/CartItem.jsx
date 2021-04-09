import React from 'react';
import { connect } from 'react-redux';

import { removeCartItem } from '../../redux/cart/cart-actions';

const CartItem = ({item, dispatch}) => {
    return (
        <div className="card border-light mb-3">
            <div className="row g-0">
                <div className="card-header col-md-4">Header</div>
                <div className="card-body col-md-8 d-flex justify-content-between">
                    <div>
                        <h5 className="card-title">{item.trackName} - {item.prices.leasePriceStems}</h5>
                        <p className="card-text">{item.meta.description}</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-end">
                        <img src="/x-square.svg" height='24px' width='24px' alt={`remove ${item.trackName} from cart`} onClick={() => dispatch(removeCartItem(item))}/>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default connect()(CartItem);