import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as formDuck from 'ducks/form.duck';

import {
    RegisterPolicy,
    RegisterTitle,
    RegisterTwo
} from 'components/Register';

class RegisterPolicyScreen extends Component {
    render() {
        return (
            <RegisterTwo>
                <RegisterTitle title={'policy'} />
                <RegisterPolicy {...this.props} />
            </RegisterTwo>
        );
    }
}

export default connect(
    state => ({
        form: state.form.get('registerPolicy')
    }),
    dispatch => ({
        FormActions: bindActionCreators(formDuck, dispatch)
    })
)(RegisterPolicyScreen);