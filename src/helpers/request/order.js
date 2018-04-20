import axios from 'axios';
import storage from '../localForage.helper';

const FUNFUR = process.env.REACT_APP_URL + "/api/v1";

export const requestOrderList = () => {
    return storage.get('token').then((token) => {
        return axios({
            method: 'GET',
            url: `${FUNFUR}/order_web/order_sheet`,
            headers: {
                Authorization: token
            }
        }).then(res => {
            return res;
        }).catch(err => {
            if(err) throw err;
        });
    });
};

export const requestDetailShipping = (id) => {
    return storage.get('token').then((token) => {
        return axios({
            method: 'GET',
            url: `${FUNFUR}/order_web/order_sheet/${id}`,
            headers: {
                Authorization: token
            }
        }).then(res => {
            return res;
        }).catch(err => {
            if(err) throw err;
        });
    });
};

export const requestShippingRegister = (shippingInfo, id) => {
    return storage.get('token').then((token) => {
        return axios({
            method: 'POST',
            url: `${FUNFUR}/order_web/order_sheet/shipping/register/${id}`,
            headers: {
                Authorization: token
            },
            data: {
                shippingMethod: shippingInfo.shippingMethod,
                shippingCompany: shippingInfo.shippingCompany,
                trackingNumber: shippingInfo.trackingNumber
            }
        }).then(res => {
            return res;
        }).catch(err => {
            if(err) throw err;
        });
    });
};

export const requestShippingUpdate = (shippingInfo, id) => {
    return storage.get('token').then((token) => {
        return axios({
            method: 'PUT',
            url: `${FUNFUR}/order_web/order_sheet/shipping/update/${id}`,
            headers: {
                Authorization: token
            },
            data: {
                shippingMethod: shippingInfo.shippingMethod,
                shippingCompany: shippingInfo.shippingCompany,
                trackingNumber: shippingInfo.trackingNumber
            }
        }).then(res => {
            return res;
        }).catch(err => {
            if(err) throw err;
        });
    });
};