import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import registerServiceWorker from './registerServiceWorker';
import { unregister } from './registerServiceWorker';

import configureStore from "src/main/store";
import Transition from 'src/main/transition';
import "./styles/css/main.css"; // compiled sass


const store = configureStore()


ReactDOM.render(<Provider store={store}>
    <Transition />
</Provider>,
    document.getElementById('root'));

if (module.hot) {
    module.hot.accept('src/main/transition', () => {
        ReactDOM.render(
            <Provider store={store}>
                <Transition />
            </Provider>,
            document.getElementById('root'),
        )
    })
}

// registerServiceWorker();
unregister()
