import axios from 'axios';
import { encryptIt } from '../encrypt';
import storage from '../localForage.helper';
const FUNFUR = process.env.REACT_APP_URL;

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
};

export const requestChkUserId = (userId) => {
    return axios.post(`${FUNFUR}/auth_web/chkUserId`, {
        userId
    }).then(res => {
        return res;
    }).catch(err => {
        if(err) throw err;
    });
};

export const requestRegisterCeo = (ceoInfo) => {
    let nameOutPut = encryptIt(ceoInfo.ceoName);
    let phoneOutPut = encryptIt(ceoInfo.ceoCall);
    let emailOutPut = encryptIt(ceoInfo.ceoEmail);
    let idOutPut = encryptIt(ceoInfo.userId);
    let pwOutPut = encryptIt(ceoInfo.password);
    return Promise.all([nameOutPut, phoneOutPut, emailOutPut, idOutPut, pwOutPut]).then((values) => {
        const idImage = Array.prototype.slice.call(ceoInfo.businessIdImage.toJS());
        let formData = new FormData();

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
};

export const requestLoginCeo = (userId, pw) => {
    return axios.post(`${FUNFUR}/auth_web/signin`, {
        login_id: userId,
        password: pw
    }).then(res => {
        storage.set('auth', {
            ceoName: res.data.ceoName,
            companyName: res.data.companyName,
            loginId: res.data.loginId
        });
        return res;
    }).catch(err => {
        if(err) throw err;
    });
};

export const requestCheckToken = (token) => {
    return axios({
        method: 'GET',
            url: `${FUNFUR}/auth_web/chkToken`,
            headers: {
                Authorization: token
            }
    })
    .then(res => {

        return res;
    }).catch(err => {
        if(err) throw err;
    });
}

export const requestModifyPassword = (prevPassword, newPassword) => {
    return storage.get('token').then((token) => {
        return axios({
            method: 'PUT',
            url: `${FUNFUR}/auth_web/modify_pw`,
            headers: {
                Authorization: token
            },
            data: {
                prevPassword,
                newPassword
            }
        }).then(res => {
            return res;
        }).catch(err => {
            if(err) throw err;
        });
    });
}