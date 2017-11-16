import React from 'react';

function ExchangeContents({children}) {
    return (
        <div className="order-table-wrapper">
            {children}
        </div>
    );
}

export default ExchangeContents;