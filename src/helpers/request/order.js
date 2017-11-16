import axios from 'axios';
import storage from '../localForage.helper';

const FUNFUR = process.env.REACT_APP_URL;

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
}
