import axios from 'axios';
import { encryptIt } from '../encrypt';
import storage from '../localForage.helper';

const FUNFUR = process.env.REACT_APP_URL | "/api/v1";

export const requestCheckPassword = (password) => {
    let passwordOutPut = encryptIt(password);
    return storage.get('token').then((token) => {
        return passwordOutPut.then((value) => {
            return axios({
                method: 'POST',
                    url: `${FUNFUR}/mypage_web/confirm_me`,
                    headers: {
                        Authorization: token
                    },
                    data: {
                        password: value
                    }
            }).then(res => {
                return res;
            }).catch(err => {
                if(err) throw err;
            });
        });
    });
};

export const requestGetMyInfo = () => {
    return storage.get('token').then((token) => {
        return axios({
            method: 'GET',
            url: `${FUNFUR}/mypage_web/profile`,
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

export const requestModifyCeo = (ceoInfo) => {
    return storage.get('token').then((token) => {
        return axios({
            method: 'PUT',
            url: `${FUNFUR}/mypage_web/profile`,
            headers: {
                Authorization: token
            },
            data: {
                phone_number: ceoInfo.ceoCall,
                email: ceoInfo.ceoEmail
            }
        }).then(res => {
            return res;
        }).catch(err => {
            if(err) throw err;
        });
    });
}