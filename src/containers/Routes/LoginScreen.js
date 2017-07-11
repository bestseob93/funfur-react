import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    Login, 
    LoginForm
} from 'components/Login';

/* duck */
import * as authDuck from 'ducks/auth.duck';
import * as formDuck from 'ducks/form.duck';

/* helpers */
import storage from 'helpers/localForage.helper';

const contextTypes = {
    router: PropTypes.object
};

class LoginScreen extends Component {
    componentDidMount() {
        const { AuthActions } = this.props;
        
        storage.get('token').then((value) => {
           console.log(value);
            if(value) {
                AuthActions.tokenTest(value);
            } 
        }).catch((err) => {
            if(err) throw err;
        });

    }
    render() {
        return (
            <Login>
                <LoginForm 
                    {...this.props}
                    router={this.context.router}
                />
            </Login>
        );
    }
}

LoginScreen.contextTypes = contextTypes;

export default connect(
    state => ({
        form: state.form.get('login'),
        status: {
            login: state.auth.getIn(['requests', 'login']),
            token: state.auth.get('token')
        },
        valid: {
            login: state.auth.getIn(['valid', 'login'])
        }
    }),
    dispatch => ({
        FormActions: bindActionCreators(formDuck, dispatch),
        AuthActions: bindActionCreators(authDuck, dispatch)
    })
)(LoginScreen);