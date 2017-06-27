import React, { Component } from 'react';
import {
    RegisterForm,
    RegisterThree,
    RegisterTitle } from 'components/Register';

class RegisterFormScreen extends Component {
    render() {
        return (
            <RegisterThree>
                <RegisterTitle title={'form'}/>
                <RegisterForm/>
            </RegisterThree>
        );
    }
}

export default RegisterFormScreen;