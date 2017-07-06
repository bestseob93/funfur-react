import React, { Component } from 'react';
import { RegisterPending, RegisterTitle, RegisterFour } from 'components/Register';

class RegisterPendingScreen extends Component {
    render() {
        return (
            <RegisterFour>
                <RegisterTitle title={'pending'}/>
                <RegisterPending/>
            </RegisterFour>
        );
    }
}

export default RegisterPendingScreen;