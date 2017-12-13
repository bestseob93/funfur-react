import React from 'react';

function ProductContainer({children}) {
    return (
        <div style={{overflowX: 'hidden'}}>
            {children}
        </div>
    );
}

export default ProductContainer;