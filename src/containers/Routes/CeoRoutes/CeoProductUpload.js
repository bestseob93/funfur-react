import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ProductUpload, ProductForm } from 'components/Ceo/Product';
import { SubTitle } from 'components/Common';

import * as formDuck from 'ducks/form.duck';

class CeoProductUpload extends Component {
    render() {
        return (
            <ProductUpload>
                <ProductForm {...this.props} />
            </ProductUpload>
        );
    }
}

export default connect(
    state => ({
        form: state.form.get('product'),
    }),
    dispatch => ({
        FormActions: bindActionCreators(formDuck, dispatch)
    })
)(CeoProductUpload);