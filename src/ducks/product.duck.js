import { fromJS } from 'immutable';
import * as requestStatus from 'helpers/requestStatus';
import * as product from 'helpers/request/product';

/* Action Types */
const PRODUCT_LIST = "product/PRODUCT_LIST";
const PRODUCT_UPLOAD = "product/UPLOAD_PRODUCT";

/* Action Creators */
export const productList = (user_id) => ({
    type: PRODUCT_LIST
});

export const productUpload = (productInfo, token) => ({
    type: PRODUCT_UPLOAD,
    payload: product.requestProductUpload(productInfo, token)
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
    }
});

/* REDUCER */
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case `${PRODUCT_UPLOAD}_PENDING`:
            return state.mergeIn(['requests', 'upload'], fromJS(requestStatus.pending));
        case `${PRODUCT_UPLOAD}_FULFILLED`:
            return state.mergeIn(['requests', 'upload'], fromJS(requestStatus.fulfilled))
                        .setIn(['valid', 'upload'], true);
        case `${PRODUCT_UPLOAD}_REJECTED`:
            return state.mergeIn(['requests', 'upload'], fromJS(requestStatus.rejected))
                        .setIn(['valid', 'upload'], false);
        default:
            return state;
    }
}