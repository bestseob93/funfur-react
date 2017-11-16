import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import auth from 'ducks/auth.duck';
import contact from 'ducks/contact.duck';
import product from 'ducks/product.duck';
import form from 'ducks/form.duck';
import ui from 'ducks/ui.duck';
import mypage from 'ducks/mypage.duck';
import order from 'ducks/order.duck';

const rootReducer = {
    auth,
    contact,
    product,
    form,
    ui,
    mypage,
    order
};

// const reducer = combineReducers(auth);
const reducer = combineReducers(rootReducer);

const middlewares = applyMiddleware(promiseMiddleware());

/* safari 에서 에러 */
// const configureStore = createStore(reducer, compose(middlewares, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

/* 해결법 */
const composeEnhancers =
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    
const configureStore = createStore(reducer, composeEnhancers(middlewares));

export default configureStore;