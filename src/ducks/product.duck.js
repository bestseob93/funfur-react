import { fromJS } from 'immutable';
import * as requestStatus from 'helpers/requestStatus';

/* Action Types */
const PRODUCT_LIST = "product/PRODUCT_LIST";

/* Action Creators */
export const productList = (user_id) => ({
    type: PRODUCT_LIST
});

const initialState = fromJS({
    requests: {
        productList: {
            ...requestStatus.request
        }
    },
});

/* REDUCER */
export default function reducer(state = initialState, action) {
    switch(action.type) {
        default:
            return state;
    }
}