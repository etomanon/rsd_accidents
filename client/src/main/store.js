import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import reducers from 'src/reducers';

const middlewares = [promiseMiddleware()];
 
if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}

const configureStore = () => {
    const store = compose(applyMiddleware(...middlewares))(createStore)(
      reducers,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  
    if (process.env.NODE_ENV !== "production") {
      if (module.hot) {
        module.hot.accept('../reducers', () => {
          store.replaceReducer(reducers)
        })
      }
    }
  
    return store
  }

export default configureStore;