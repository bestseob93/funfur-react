import React, { Component } from 'react';
import { RegisterIntro, RegisterOne } from 'components/Register';

class RegisterIntroScreen extends Component {
    render() {
        return (
            <RegisterOne>
                <RegisterIntro/>
            </RegisterOne>
        );
    }
}

export default RegisterIntroScreen;