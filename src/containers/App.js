import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import logo from 'logo.svg';
import 'App.css';
import 'styles/style.css';
import { Header, Footer } from 'components';
import { NoMatch } from 'containers';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header/>
          <Route component={NoMatch}/>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
