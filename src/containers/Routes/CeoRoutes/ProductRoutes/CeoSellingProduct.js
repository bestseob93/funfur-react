import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    ProductContainer,
    ProductHeader,
    ProductContents
} from 'components/Ceo/Product';

import * as productDuck from 'ducks/product.duck';

function CeoCurrentProduct() {
    return (
        <ProductContainer>
            <ProductHeader />
            <ProductContents {...this.props} />
        </ProductContainer>
    );
}

export default connect(
    state => ({
        status: state.product.getIn(['requests', 'productList']),
        products: state.product.get('products')
    }),
    dispatch => ({
        ProductActions: bindActionCreators(productDuck, dispatch)
    })
)(CeoCurrentProduct);