import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    ProductContainer,
    ProductHeader,
    ProductContents
} from 'components/Ceo/Product';

import * as productDuck from 'ducks/product.duck';

function CeoCurrentProduct(props) {
    return (
        <ProductContainer>
            <ProductHeader />
            <ProductContents {...props} />
        </ProductContainer>
    );
}

export default connect(
    state => ({
        status: state.product.getIn(['requests', 'productList']),
        valid: state.product.getIn(['valid', 'productList']),
        products: state.product.get('products')
    }),
    dispatch => ({
        ProductActions: bindActionCreators(productDuck, dispatch)
    })
)(CeoCurrentProduct);