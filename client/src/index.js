import React from 'react';
import ReactDOM from 'react-dom';
import Provider from './main/provider';
// import registerServiceWorker from './registerServiceWorker';
import { unregister } from './registerServiceWorker';

ReactDOM.render(<Provider />, document.getElementById('root'));
// registerServiceWorker();
unregister()
