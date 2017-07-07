import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Login, 
         LoginForm } from 'components/Login';
import * as authDuck from 'ducks/auth.duck';
import * as formDuck from 'ducks/form.duck';

class LoginScreen extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    render() {
        return (
            <Login>
                <LoginForm {...this.props} router={this.context.router}/>
            </Login>
        );
    }
}

export default connect(
    state => ({
        form: state.form.get('login'),
        status: {
            login: state.auth.getIn(['requests', 'login'])
        }
    }),
    dispatch => ({
        FormActions: bindActionCreators(formDuck, dispatch),
        AuthActions: bindActionCreators(authDuck, dispatch)
    })
)(LoginScreen);