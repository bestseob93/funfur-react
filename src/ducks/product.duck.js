import { fromJS } from 'immutable';
import * as requestStatus from 'helpers/requestStatus';
import * as product from 'helpers/request/product';

/* Action Types */
const PRODUCT_LIST = "product/PRODUCT_LIST";
const PRODUCT_UPLOAD = "product/UPLOAD_PRODUCT";

/* Action Creators */
export const productList = () => ({
    type: PRODUCT_LIST,
    payload: product.requestProductList()
});

export const productUpload = (productInfo) => ({
    type: PRODUCT_UPLOAD,
    payload: product.requestProductUpload(productInfo)
});

const initialState = fromJS({
    requests: {
        productList: {
            ...requestStatus.request
        },
        upload: {
            ...requestStatus.request
        }
    },
    valid: {
        upload: false
    },
    products: []
});

/* REDUCER */
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case `${PRODUCT_LIST}_PENDING`:
            return state.mergeIn(['requests', 'productList'], fromJS(requestStatus.pending));
        case `${PRODUCT_LIST}_FULFILLED`:
            return state.mergeIn(['requests', 'productList'], fromJS(requestStatus.fulfilled));
        case `${PRODUCT_LIST}_FULFILLED`:
            return state.mergeIn(['requests', 'productList'], fromJS(requestStatus.rejected));
        case `${PRODUCT_UPLOAD}_PENDING`:
            return state.mergeIn(['requests', 'upload'], fromJS(requestStatus.pending));
        case `${PRODUCT_UPLOAD}_FULFILLED`:
            return state.mergeIn(['requests', 'upload'], fromJS(requestStatus.fulfilled))
                        .setIn(['valid', 'upload'], true)
                        .set('products', state.get('products').concat(action.payload.data.products));
        case `${PRODUCT_UPLOAD}_REJECTED`:
            return state.mergeIn(['requests', 'upload'], fromJS(requestStatus.rejected))
                        .setIn(['valid', 'upload'], false);
        default:
            return state;
    }
}