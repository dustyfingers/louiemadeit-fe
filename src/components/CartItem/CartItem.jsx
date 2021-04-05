import React from 'react';

const CartItem = ({item}) => {
    return (
        <div>
            {item.trackName} - 29.99
        </div>
    );
};

export default CartItem;