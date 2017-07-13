import axios from 'axios';
import { encryptIt } from '../encrypt';
import storage from '../localForage.helper';
const FUNFUR = process.env.REACT_APP_URL;

export const requestTokenTest = (token) => {
    console.log(token);
                return axios({
                    method: 'GET',
                    url: `${FUNFUR}/auth_web/hiThere`,
                    headers: {
                        Authorization: token
                    }
                }).then(res => {
                    console.log(res);
                }).catch(err => {
                    if(err) throw err;
                });
}

export const requestChkCompanyRegi = (companyNumber) => {
    return encryptIt(companyNumber).then((result) => {
            return axios.post(`${FUNFUR}/auth_web/chkBusinessId`, {
                companyNumber: result
            }).then(res => {
                return res;
            }).catch(err => {
                if(err) throw err;
            });
    });
}

export const requestChkUserId = (userId) => {
    return axios.post(`${FUNFUR}/auth_web/chkUserId`, {
        userId
    }).then(res => {
        return res;
    }).catch(err => {
        if(err) throw err;
    });
}

export const requestRegisterCeo = (ceoInfo) => {
    var nameOutPut = encryptIt(ceoInfo.ceoName);
    var phoneOutPut = encryptIt(ceoInfo.ceoCall);
    var emailOutPut = encryptIt(ceoInfo.ceoEmail);
    var idOutPut = encryptIt(ceoInfo.userId);
    var pwOutPut = encryptIt(ceoInfo.password);
    console.log(ceoInfo);
    console.log(typeof nameOutPut);
    console.log(typeof phoneOutPut);
    console.log(typeof emailOutPut);
    console.log(typeof idOutPut);
    console.log(typeof pwOutPut);
    return Promise.all([nameOutPut, phoneOutPut, emailOutPut, idOutPut, pwOutPut]).then((values) => {
        const idImage = Array.prototype.slice.call(ceoInfo.businessIdImage);
        let formData = new FormData();

        console.log('email: ' + values[2]);
        console.log('id: ' + values[3]);
        formData.append('companyName', ceoInfo.cpName);
        formData.append('businessId', ceoInfo.businessId);
        formData.append('business_registration', idImage[0]);
        formData.append('postCode', ceoInfo.postCode);
        formData.append('company_address', ceoInfo.cpAddress);
        formData.append('company_phone_number', ceoInfo.cpCall);
        formData.append('name', values[0]);
        formData.append('phone_number', values[1]);
        formData.append('email', values[2]);
        formData.append('userId', values[3]);
        formData.append('password', values[4]);

        return axios.post(`${FUNFUR}/auth_web/signup`,
            formData
        ).then(res => {
            return res;
        }).catch(err => {
            if(err) throw err;
        });
    });
}

export const requestLoginCeo = (userId, pw) => {
    return axios.post(`${FUNFUR}/auth_web/signin`, {
        login_id: userId,
        password: pw
    }).then(res => {
        console.log(res);
        storage.set('auth', {
            ceoName: res.data.ceoName,
            companyName: res.data.companyName,
            loginId: res.data.loginId
        });
        return res;
    }).catch(err => {
        if(err) throw err;
    });
}

export const requestCheckToken = (token) => {
    console.log(token);
    return axios({
        method: 'GET',
            url: `${FUNFUR}/auth_web/chkToken`,
            headers: {
                Authorization: token
            }
    })
    .then(res => {
        console.log(res);
        return res;
    }).catch(err => {
        console.error(err);
        if(err) throw err;
    });
}