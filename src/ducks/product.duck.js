import { fromJS } from 'immutable';
import * as requestStatus from 'helpers/requestStatus';
import * as product from 'helpers/request/product';

/* Action Types */
const GET_PRODUCT_DETAIL = "product/GET_PRODUCT_DETAIL";
const PRODUCT_LIST = "product/PRODUCT_LIST";
const PRODUCT_UPLOAD = "product/UPLOAD_PRODUCT";

/* Action Creators */
export const getProductDetail = (productId) => ({
    type: GET_PRODUCT_DETAIL,
    payload: product.requestProductDetail(productId)
});

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
        productDetail: {
            ...requestStatus.request
        },
        productList: {
            ...requestStatus.request
        },
        upload: {
            ...requestStatus.request
        }
    },
    valid: {
        productList: false,
        upload: false
    },
    products: [],
    productDetail: null
});

/* REDUCER */
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case `${GET_PRODUCT_DETAIL}_PENDING`:
            return state.mergeIn(['requests', 'productDetail'], fromJS(requestStatus.pending));
        case `${GET_PRODUCT_DETAIL}_FULFILLED`:
            return state.mergeIn(['requests', 'productDetail'], fromJS(requestStatus.fulfilled))
                        .set('productDetail', fromJS(action.payload.data.product));
        case `${GET_PRODUCT_DETAIL}_REJECTED`:
            return state.mergeIn(['requests', 'productDetail'], fromJS(requestStatus.rejected));
        case `${PRODUCT_LIST}_PENDING`:
            return state.mergeIn(['requests', 'productList'], fromJS(requestStatus.pending));
        case `${PRODUCT_LIST}_FULFILLED`:
            return state.mergeIn(['requests', 'productList'], fromJS(requestStatus.fulfilled))
                        .set('products', state.get('products').concat(action.payload.data.products))
                        .setIn(['valid', 'productList'], true);
        case `${PRODUCT_LIST}_REJECTED`:
            return state.mergeIn(['requests', 'productList'], fromJS(requestStatus.rejected))
                        .setIn(['valid', 'productList'], false);
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