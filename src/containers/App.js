import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import 'App.css';
import 'styles/style.css';
import { Header, Footer } from 'components/Base';
import { HomeScreen, RegisterIntroScreen } from 'containers';

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
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
