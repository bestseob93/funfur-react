import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { connect } from 'react-redux';
import 'styles/style.css';
import {
  Header,
  Footer
} from 'components/Base';

import { 
  HomeScreen,
  RegisterFormScreen,
  RegisterIntroScreen,
  RegisterPolicyScreen,
  RegisterPendingScreen,
  LoginScreen,
  CeoWrapper,
} from './Routes';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          {/* 관리자 페이지에서 다른 헤더 or 헤더 아예 없애고.. */}
          { this.props.visible.base ? <Header /> : null }
          { this.props.visible.base ? (<div className="spacer">&nbsp;</div>) : null }

            <Route
              exact
              path="/"
              component={HomeScreen}
            />
            <Route
              path="/register"
              component={RegisterIntroScreen}
            />
            <Route
              path="/register_2"
              component={RegisterPolicyScreen}
            />
            <Route
              path="/register_3"
              component={RegisterFormScreen}
            />
            <Route
              path="/register_4"
              component={RegisterPendingScreen}
            />
            <Route
              path="/login"
              component={LoginScreen}
            />
            <Route
              path="/ceo"
              component={CeoWrapper}
            />
          { this.props.visible.base ? <Footer /> : null }
        </div>
      </Router>
    );
  }
}

export default connect(
    state => ({
        visible: {
          base: state.ui.getIn(['visible', 'base']),
          dashboard: state.ui.getIn(['visible', 'dashboard'])
        }
    }),
    null
)(App);