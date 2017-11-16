import React from 'react';

function Exchange({children}) {
    return (
        <div className="container order-wrapper">
            {children}
        </div>
    );
}

export default Exchange;