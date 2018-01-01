import React from 'react';
import { Helmet } from 'react-helmet';
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
            <Helmet>
                <title>제품 관리 / 등록</title>
            </Helmet>
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