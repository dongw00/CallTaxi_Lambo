import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';

import './Components/css/Index.css';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Routes />, document.getElementById('root'));

serviceWorker.register();
