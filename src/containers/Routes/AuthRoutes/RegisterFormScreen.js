import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    RegisterForm,
    RegisterThree,
    RegisterTitle
} from 'components/Register';

import * as authDuck from 'ducks/auth.duck';
import * as formDuck from 'ducks/form.duck';

const contextTypes = {
    router: PropTypes.object
};

class RegisterFormScreen extends Component {
    render() {
        return (
            <RegisterThree>
                <RegisterTitle title={'form'} />
                <RegisterForm
                    {...this.props}
                    router={this.context.router}
                />
            </RegisterThree>
        );
    }
}

RegisterFormScreen.contextTypes = contextTypes;

export default connect(
    state => ({
        form: state.form.get('register'),
        status: {
            chkCompanyRegi: state.auth.getIn(['requests', 'checkCompanyRegistration']),
            chkUserId: state.auth.getIn(['requests', 'checkUserId']),
            register: state.auth.getIn(['requests', 'register']),
            isSuccess: state.auth.get('isSuccess')
        },
        valid: {
            bizId: state.auth.getIn(['valid', 'bizId']),
            userId: state.auth.getIn(['valid', 'userId'])
        }
    }),
    dispatch => ({
        AuthActions: bindActionCreators(authDuck, dispatch),
        FormActions: bindActionCreators(formDuck, dispatch)
    })
)(RegisterFormScreen);