import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
// import Home from './Components/Home';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Routes />, document.getElementById('root'));
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
