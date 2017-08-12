import React from 'react';

function OrderContents({children}) {
    return (
        <div className="order-table-wrapper">
            {children}
        </div>
    );
}

export default OrderContents;