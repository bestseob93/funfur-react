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
  RegisterPolicyScreen } from 'containers';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header/>
          <div className="spacer">
              &nbsp;
          </div>
            <Route exact path="/" component={HomeScreen}/>
            <Route path="/register" component={RegisterIntroScreen}/>
            <Route path="/register_2" component={RegisterPolicyScreen}/>
            <Route path="/register_3" component={RegisterFormScreen}/>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
