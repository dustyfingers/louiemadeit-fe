import React from 'react';
import { connect } from 'react-redux';

import './CheckoutItem.scss';

const CheckoutItem = ({ item }) => {
    return (
        <div className="card border-light mb-3">
            <div className="row g-0">
                <div className="col-md-4"><img className="h-100 w-100" alt={item.trackName} src={item.coverArtUrl}/></div>
                <div className="card-body col-md-8 d-flex justify-content-center align-items-center">
                    <div>
                        <h5 className="card-title">{item.trackName} - {item.price}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default connect()(CheckoutItem);