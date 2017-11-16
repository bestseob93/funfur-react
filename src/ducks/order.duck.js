import { fromJS } from 'immutable';
import * as requestStatus from 'helpers/requestStatus';
import * as order from 'helpers/request/order';

const ORDER_LIST = "product/ORDER_LIST";

export const getOrderList = () => ({
    type: ORDER_LIST,
    payload: order.requestOrderList()
});

const initialState = fromJS({
    requests: {
        orderList: {
            ...requestStatus.request
        }
    },
    valid: {
        orderList: false
    },
    orders: []
});

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case `${ORDER_LIST}_PENDING`:
            return state.mergeIn(['requests', 'orderList'], fromJS(requestStatus.pending));
        case `${ORDER_LIST}_FULFILLED`:
            return state.mergeIn(['requests', 'orderList'], fromJS(requestStatus.fulfilled))
                        .set('orders', action.payload.data.results)
                        .setIn(['valid', 'orderList'], true);
        case `${ORDER_LIST}_REJECTED`:
            return state.mergeIn(['requests', 'orderList'], fromJS(requestStatus.rejected))
                        .setIn(['valid', 'orderList'], false);
        default:
            return state;
    }
}