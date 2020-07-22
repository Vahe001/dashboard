import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './Components/main';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <Main />
    </BrowserRouter>, document.getElementById('root')
);

serviceWorker.unregister();
