import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { CountryProvider } from './context.js'

ReactDOM.render(
    <CountryProvider>
        <App />
    </CountryProvider>, document.getElementById('root'));
serviceWorker.unregister();
