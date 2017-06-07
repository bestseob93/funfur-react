import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import './styles/style.css';
import { Header } from './components';

class App extends Component {
  render() {
    return (
      <Router>
          <Header/>
      </Router>
    );
  }
}

export default App;
