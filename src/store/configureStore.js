import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import auth from 'ducks/auth.duck';
import product from 'ducks/product.duck';
import form from 'ducks/form.duck';

const rootReducer = {
    auth,
    product,
    form,
};

// const reducer = combineReducers(auth);
const reducer = combineReducers(rootReducer);

const middlewares = applyMiddleware(promiseMiddleware());

const configureStore = createStore(reducer, compose(middlewares, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default configureStore;