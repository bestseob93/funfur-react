import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    ProductModify,
    ProductModifyForm
} from 'components/Ceo/Product';

import * as formDuck from 'ducks/form.duck';
import * as productDuck from 'ducks/product.duck';
import * as uiDuck from 'ducks/ui.duck';

class CeoProductModify extends Component {

    render() {
        return (
            <ProductModify>
                <Helmet>
                    <title>제품 정보 수정</title>
                </Helmet>
                <ProductModifyForm {...this.props} />
            </ProductModify>
        );
    }
}

export default connect(
    state => ({
        status: {
            productDetail: state.product.getIn(['requests', 'productDetail']),
            modify: state.product.getIn(['requests', 'modify']),
            remove: state.product.getIn(['requests', 'modify'])
        },
        valid: {
            productDetail: state.product.getIn(['valid', 'productDetail']),
            modify: state.product.getIn(['valid', 'modify']),
            remove: state.product.getIn(['valid', 'remove'])
        },
        productDetail: {
            productAndDeliver: state.product.getIn(['productDetail', 'productAndDeliver']),
            productPhotos: state.product.getIn(['productDetail', 'productPhotos']),
            productSpace: state.product.getIn(['productDetail', 'productSpace'])
        },
        form: state.form.get('product')
    }),
    dispatch => ({
        FormActions: bindActionCreators(formDuck, dispatch),
        ProductActions: bindActionCreators(productDuck, dispatch),
        UiActions: bindActionCreators(uiDuck, dispatch)
    })
)(CeoProductModify);