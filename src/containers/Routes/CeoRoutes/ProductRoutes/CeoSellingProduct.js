import React from 'react';
import {
    ProductContainer,
    ProductHeader,
    ProductContents
} from 'components/Ceo/Product';

function CeoCurrentProduct() {
    return (
        <ProductContainer>
            <ProductHeader />
            <ProductContents />
        </ProductContainer>
    );
}

export default CeoCurrentProduct;