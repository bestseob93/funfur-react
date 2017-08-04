import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ProductUpload, ProductForm } from 'components/Ceo/Product';

import * as formDuck from 'ducks/form.duck';
import * as uiDuck from 'ducks/ui.duck';
import * as productDuck from 'ducks/product.duck';

class CeoProductUploadModify extends Component {
    render() {
        console.log(this.props);
        return (
            <ProductUpload>
                { this.props.location.pathname === '/ceo/upload' ? <ProductForm {...this.props} /> : <ProductForm {...this.props} editable={true} />}
            </ProductUpload>
        );
    }
}

export default connect(
    state => ({
        form: state.form.get('product'),
        isSecondSortable: state.ui.get('secondSortable'),
        status: {
            upload: state.product.getIn(['requests', 'upload'])
        },
        valid: {
            upload: state.product.getIn(['valid', 'upload'])
        },
        productDetail: state.product.get('productDetail')
    }),
    dispatch => ({
        FormActions: bindActionCreators(formDuck, dispatch),
        UiActions: bindActionCreators(uiDuck, dispatch),
        ProductActions: bindActionCreators(productDuck, dispatch)
    })
)(CeoProductUploadModify);