import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from 'containers/App';
import { AppContainer } from 'react-hot-loader';
import registerServiceWorker from './registerServiceWorker';
import configureStore from 'store/configureStore';
import './index.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import 'animate.css/animate.min.css';

const store = configureStore;

const rootElement = document.getElementById('root');

const render = Component =>
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component/>
            </Provider>
        </AppContainer>,
    rootElement
);

window.onload = function () {
    render(App);
}
if (module.hot) {
  module.hot.accept('./containers/App', () => { render(App) })
}

registerServiceWorker();