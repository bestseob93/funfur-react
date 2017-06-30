import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    RegisterForm,
    RegisterThree,
    RegisterTitle } from 'components/Register';
import * as authDuck from 'ducks/auth.duck';

class RegisterFormScreen extends Component {
    render() {
        console.log(this.props.status.chkCompanyRegi.toJS());
        return (
            <RegisterThree>
                <RegisterTitle title={'form'}/>
                <RegisterForm/>
            </RegisterThree>
        );
    }
}

export default connect(
    state => ({
        status: {
            chkCompanyRegi: state.auth.getIn(['requests', 'checkCompanyRegistration'])
        }
    }),
    dispatch => ({
        AuthActions: bindActionCreators(authDuck.checkCompanyRegistration, dispatch)
    })
)(RegisterFormScreen);