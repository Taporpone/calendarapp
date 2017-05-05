import { createStore, applyMiddleware } from 'redux';
import {createLogger} from 'redux-logger';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import reducers from '../Reducers';

const middleware = applyMiddleware(promise(), thunk, createLogger());

// window.__REDUX -> ReduxDevTools extension for Chrome
const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),middleware);

export default store;