import { fromJS } from 'immutable';
import * as requestStatus from 'helpers/requestStatus';
import * as order from 'helpers/request/order';

const ORDER_LIST = "order/ORDER_LIST";
const ORDER_DETAIL_SHIPPING = "order/ORDER_DETAIL_SHIPPING";
const ORDER_SHIPPING_REGISTER = "order/ORDER_SHIPPING_REGISTER";
const ORDER_SHIPPING_UPDATE = "order/ORDER_SHIPPING_UPDATE";

export const getOrderList = () => ({
    type: ORDER_LIST,
    payload: order.requestOrderList()
});

export const getOrderDetailShipping = (id) => ({
    type: ORDER_DETAIL_SHIPPING,
    payload: order.requestDetailShipping(id)
});

export const orderShippingRegister = (shippingInfo, id) => ({
    type: ORDER_SHIPPING_REGISTER,
    payload: order.requestShippingRegister(shippingInfo, id)
});

export const orderShippingUpdate = (shippingInfo, id) => ({
    type: ORDER_SHIPPING_UPDATE,
    payload: order.requestShippingUpdate(shippingInfo, id)
});

const initialState = fromJS({
    requests: {
        orderList: {
            ...requestStatus.request
        },
        orderDetailShipping: {
            ...requestStatus.request
        },
        shippingRegister: {
            ...requestStatus.request
        },
        shippingUpdate: {
            ...requestStatus.request
        }
    },
    valid: {
        orderList: false,
        orderDetailShipping: false,
        shippingRegister: false,
        shippingUpdate: false,
    },
    orders: [],
    orderDetail: {
        product_name: '',
        buyer_id: '',
        shipping_method: '',
        product_price: 0,
        order_quantity: 0,
        shipping_cost: 0,
        proportionShipping: false,
        created_at: '',
        buyer_name: '',
        receiver_name: '',
        receiver_contact: '',
        receiver_basic_address: '',
        receiver_detail_address: '',
        receiver_post_code: '',
        shipping_message: ''
    }
});

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case `${ORDER_LIST}_PENDING`:
            return state.mergeIn(['requests', 'orderList'], fromJS(requestStatus.pending));
        case `${ORDER_LIST}_FULFILLED`:
            return state.mergeIn(['requests', 'orderList'], fromJS(requestStatus.fulfilled))
                        .set('orders', fromJS(action.payload.data.results))
                        .setIn(['valid', 'orderList'], true);
        case `${ORDER_LIST}_REJECTED`:
            return state.mergeIn(['requests', 'orderList'], fromJS(requestStatus.rejected))
                        .setIn(['valid', 'orderList'], false);

        case `${ORDER_DETAIL_SHIPPING}_PENDING`:
            return state.mergeIn(['requests', 'orderDetailShipping'], fromJS(requestStatus.pending));
        case `${ORDER_DETAIL_SHIPPING}_FULFILLED`:
            return state.mergeIn(['requests', 'orderDetailShipping'], fromJS(requestStatus.fulfilled))
                        .set('orderDetail', fromJS(action.payload.data.result[0]))
                        .setIn(['valid', 'orderDetailShipping'], true);
        case `${ORDER_DETAIL_SHIPPING}_REJECTED`:
            return state.mergeIn(['requests', 'orderDetailShipping'], fromJS(requestStatus.rejected))
                        .setIn(['valid', 'orderDetailShipping'], false);

        case `${ORDER_SHIPPING_REGISTER}_PENDING`:
            return state.mergeIn(['requests', 'shippingRegister'], fromJS(requestStatus.pending));
        case `${ORDER_SHIPPING_REGISTER}_FULFILLED`:
            return state.mergeIn(['requests', 'shippingRegister'], fromJS(requestStatus.fulfilled))
                        .setIn(['valid', 'shippingRegister'], true);
        case `${ORDER_SHIPPING_REGISTER}_REJECTED`:
            return state.mergeIn(['requests', 'shippingRegister'], fromJS(requestStatus.rejected))
                        .setIn(['valid', 'shippingRegister'], false);

        case `${ORDER_SHIPPING_UPDATE}_PENDING`:
            return state.mergeIn(['requests', 'shippingUpdate'], fromJS(requestStatus.pending));
        case `${ORDER_SHIPPING_UPDATE}_FULFILLED`:
            return state.mergeIn(['requests', 'shippingUpdate'], fromJS(requestStatus.fulfilled))
                        .setIn(['valid', 'shippingUpdate'], true);
        case `${ORDER_SHIPPING_UPDATE}_REJECTED`:
            return state.mergeIn(['requests', 'shippingUpdate'], fromJS(requestStatus.rejected))
                        .setIn(['valid', 'shippingUpdate'], false);

        default:
            return state;
    }
}