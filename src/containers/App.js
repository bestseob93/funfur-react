import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import 'App.css';
import 'styles/style.css';
import { Header, Footer } from 'components';
import { Home } from 'containers';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header/>
          <Route exact path="/" component={Home}/>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
