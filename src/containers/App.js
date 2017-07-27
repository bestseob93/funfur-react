import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import 'styles/style.css';
import {
  Header,
  Footer
} from 'components/Base';

import storage from 'helpers/localForage.helper';
import { 
  HomeScreen,
  RegisterFormScreen,
  RegisterIntroScreen,
  RegisterPolicyScreen,
  RegisterPendingScreen,
  LoginScreen,
  CeoWrapper,
} from './Routes';

import * as authDuck from 'ducks/auth.duck';

class App extends Component {
  constructor(props, context) {
    super(props);
    
    this.handleLogout = this.handleLogout.bind(this);
  }


  // TODO ceo 직접 접근할 시 예외 처리 , catch에 넣어서 일단은 해결
  componentDidMount() {
    const { AuthActions } = this.props;
    console.log(this.props.authenticated);
    console.log('a');
    
    storage.get('token').then(async (value) => {
      try {
        await AuthActions.checkToken(value);

      } catch (e) {
        //document.location="/";
        // pathname이 /ceo 로 시작하는지 검사.
        const pathNameRegx = /^\/ceo/g;

        // // 로그인 안되어 있는데, ceo 페이지 진입 시 홈으로 강제 이동
        if(!this.props.authenticated && window.location.pathname.search(pathNameRegx) === 0) {
          document.location = "/";
        }
        
        if(e) throw e;
      }
    }).catch(err => {
      if(err) throw err;
    });

  }
  
  handleLogout() {
    const { AuthActions } = this.props;
    AuthActions.authLogout();
    storage.remove('token');
    storage.remove('auth');
  }

  render() {
    console.log(this.props.authenticated);
    return (
      <Router>
        <div>
          {/* 관리자 페이지에서 다른 헤더 or 헤더 아예 없애고.. */}
          { this.props.visible.base ? <Header authenticated={this.props.authenticated} handleLogout={this.handleLogout}/> : null }
          {/* { this.props.visible.base ? (<div className="spacer">&nbsp;</div>) : null } */}

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
      },
      authenticated: state.auth.get('authenticated')
    }),
    dispatch => ({
      AuthActions:  bindActionCreators(authDuck, dispatch)
    })
)(App);