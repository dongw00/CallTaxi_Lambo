import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/routes';

import './index.scss';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Routes />, document.getElementById('root'));

serviceWorker.register();