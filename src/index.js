import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from 'containers/App';
import { AppContainer } from 'react-hot-loader';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import configureStore from 'store/configureStore';
import ReactGA from 'react-ga';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import 'animate.css/animate.min.css';

const store = configureStore;

const rootElement = document.getElementById('root');

// Google Analytics Initial
ReactGA.initialize(process.env.REACT_APP_GA);

const render = Component =>
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Router>
                    <Route component={Component} />
                </Router>
            </Provider>
        </AppContainer>,
    rootElement
);

window.onload = function () {
    render(App);
}
if (module.hot) {
  module.hot.accept('./containers/App', () => { 
      const NextApp = require('./containers/App').default;
      render(NextApp) })
}

registerServiceWorker();