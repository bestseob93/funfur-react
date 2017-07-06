import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import 'styles/style.css';
import { Header, Footer } from 'components/Base';
import { 
  HomeScreen,
  RegisterFormScreen,
  RegisterIntroScreen,
  RegisterPolicyScreen,
  RegisterPendingScreen } from './Routes';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          {/* 관리자 페이지에서 다른 헤더 or 헤더 아예 없애고.. */}
          <Header/>
          <div className="spacer">
              &nbsp;
          </div>
            <Route exact path="/" component={HomeScreen}/>
            <Route path="/register" component={RegisterIntroScreen}/>
            <Route path="/register_2" component={RegisterPolicyScreen}/>
            <Route path="/register_3" component={RegisterFormScreen}/>
            <Route path="/register_4" component={RegisterPendingScreen}/>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
