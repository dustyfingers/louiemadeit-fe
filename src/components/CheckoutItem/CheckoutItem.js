import React from 'react';
import { connect } from 'react-redux';

import './CheckoutItem.scss';

const CheckoutItem = ({ item: { type, trackName, packName, coverArtUrl, price } }) => {
    return (
        <div className="card border-light mb-3">
            <div className="row g-0">
                <div className="col-md-4">
                    <img
                        className="h-100 w-100"
                        alt={type === 'track' ? trackName : packName}
                        src={coverArtUrl}
                    />
                </div>
                <div className="card-body col-md-8 d-flex justify-content-center align-items-center">
                    <div>
                        <h5 className="card-title">
                            {type === 'track' ? trackName : packName} - {price}
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect()(CheckoutItem);
