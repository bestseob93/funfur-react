import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    RegisterForm,
    RegisterThree,
    RegisterTitle } from 'components/Register';
import * as authDuck from 'ducks/auth.duck';
import * as formDuck from 'ducks/form.duck';

class RegisterFormScreen extends Component {
    render() {
        console.log(this.props.status.chkCompanyRegi.toJS());
        return (
            <RegisterThree>
                <RegisterTitle title={'form'}/>
                <RegisterForm {...this.props}/>
            </RegisterThree>
        );
    }
}

export default connect(
    state => ({
        form: state.form.get('register'),
        status: {
            chkCompanyRegi: state.auth.getIn(['requests', 'checkCompanyRegistration'])
        }
    }),
    dispatch => ({
        AuthActions: bindActionCreators(authDuck, dispatch),
        FormActions: bindActionCreators(formDuck, dispatch)
    })
)(RegisterFormScreen);