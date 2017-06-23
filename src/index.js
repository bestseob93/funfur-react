import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'containers';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import 'animate.css/animate.min.css';

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();