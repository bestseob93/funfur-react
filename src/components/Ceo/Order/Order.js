import React from 'react';

function Order({children}) {
    return (
        <div className="container order-wrapper">
            {children}
        </div>
    );
}

export default Order;