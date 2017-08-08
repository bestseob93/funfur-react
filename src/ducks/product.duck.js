import { fromJS } from 'immutable';
import * as requestStatus from 'helpers/requestStatus';
import * as product from 'helpers/request/product';

/* Action Types */
const GET_PRODUCT_DETAIL = "product/GET_PRODUCT_DETAIL";
const PRODUCT_LIST = "product/PRODUCT_LIST";
const PRODUCT_UPLOAD = "product/PRODUCT_UPLOAD";
const PRODUCT_MODIFY = "product/PRODUCT_MODIFY";
const REMOVE_PRODUCT_DETAIL_PHOTO = "product/REMOVE_PRODUCT_DETAIL_PHOTO";
const PRODUCT_REMOVE = "product/PRODUCT_REMOVE";

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

export const productModify = (productId, productInfo) => ({
    type: PRODUCT_MODIFY,
    payload: product.requestProductModify(productId, productInfo)
});

export const removeProductDetailPhoto = (productId, photoIndex) => ({
    type: REMOVE_PRODUCT_DETAIL_PHOTO,
    payload: product.requestRemoveProductDetailPhoto(productId, photoIndex)
});

export const productRemove = (productId) => ({
    type: PRODUCT_REMOVE,
    payload: product.requestProductRemove(productId)
});

const initialState = fromJS({
    requests: {
        productDetail: {
            ...requestStatus.request
        },
        productDetailPhoto: {
            ...requestStatus.request
        },
        productList: {
            ...requestStatus.request
        },
        upload: {
            ...requestStatus.request
        },
        modify: {
            ...requestStatus.request
        },
        remove: {
            ...requestStatus.request
        }
    },
    valid: {
        productList: false,
        upload: false,
        productDetail: false,
        modify: false,
        remove: false
    },
    products: [],
    productDetail: {
        productAndDeliver: null,
        productPhotos: null,
        productSpace: {
            space: [],
            first: [],
            second: []
        }
    }
});

/* REDUCER */
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case `${GET_PRODUCT_DETAIL}_PENDING`:
            return state.mergeIn(['requests', 'productDetail'], fromJS(requestStatus.pending));
        case `${GET_PRODUCT_DETAIL}_FULFILLED`:
            return state.mergeIn(['requests', 'productDetail'], fromJS(requestStatus.fulfilled))
                        .setIn(['productDetail', 'productAndDeliver'], fromJS(action.payload.data.productAndDeliveryFee))
                        .setIn(['productDetail', 'productPhotos'], fromJS(action.payload.data.productPhotos))
                        .setIn(['productDetail', 'productSpace', 'space'], fromJS(action.payload.data.space))
                        .setIn(['productDetail', 'productSpace', 'first'], fromJS(action.payload.data.first))
                        .setIn(['productDetail', 'productSpace', 'second'], fromJS(action.payload.data.second))
                        .setIn(['valid', 'productDetail'], true);
        case `${GET_PRODUCT_DETAIL}_REJECTED`:
            return state.mergeIn(['requests', 'productDetail'], fromJS(requestStatus.rejected))
                        .setIn(['valid', 'productDetail'], false);
        case `${PRODUCT_LIST}_PENDING`:
            return state.mergeIn(['requests', 'productList'], fromJS(requestStatus.pending));
        case `${PRODUCT_LIST}_FULFILLED`:
            return state.mergeIn(['requests', 'productList'], fromJS(requestStatus.fulfilled))
                        .set('products', action.payload.data.products)
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
        case `${PRODUCT_MODIFY}_PENDING`:
            return state.mergeIn(['requests', 'modify'], fromJS(requestStatus.pending));
        case `${PRODUCT_MODIFY}_FULFILLED`:
            return state.mergeIn(['requests', 'modify'], fromJS(requestStatus.fulfilled))
                        .setIn(['valid', 'modify'], true);
        case `${PRODUCT_MODIFY}_REJECTED`:
            return state.mergeIn(['requests', 'modify'], fromJS(requestStatus.rejected))
                        .setIn(['valid', 'modify'], false);
        case `${REMOVE_PRODUCT_DETAIL_PHOTO}_PENDING`:
            return state.mergeIn(['requests', 'productDetailPhoto'], fromJS(requestStatus.pending));
        case `${REMOVE_PRODUCT_DETAIL_PHOTO}_FULFILLED`:
            return state.mergeIn(['requests', 'productDetailPhoto'], fromJS(requestStatus.fulfilled));
        case `${REMOVE_PRODUCT_DETAIL_PHOTO}_REJECTED`:
            return state.mergeIn(['requests', 'productDetailPhoto'], fromJS(requestStatus.rejected));
        case `${PRODUCT_REMOVE}_PENDING`:
            return state.mergeIn(['requests', 'remove'], fromJS(requestStatus.pending));
        case `${PRODUCT_REMOVE}_FULFILLED`:
            return state.mergeIn(['requests', 'remove'], fromJS(requestStatus.fulfilled))
                        .setIn(['valid', 'remove'], true);
        case `${PRODUCT_REMOVE}_REJECTED`:
            return state.mergeIn(['requests', 'remove'], fromJS(requestStatus.rejected))
                        .setIn(['valid', 'remove'], false);
        default:
            return state;
    }
}