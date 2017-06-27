import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import auth from 'ducks/auth.duck';

// const reducer = combineReducers(auth);
const reducer = auth;

const middlewares = [promiseMiddleware()];

const configStore = createStore(reducer, applyMiddleware(...middlewares), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default configStore;