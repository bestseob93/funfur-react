import React, { Component } from 'react';
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
                <RegisterPolicy />
            </RegisterTwo>
        );
    }
}

export default RegisterPolicyScreen;