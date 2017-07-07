import axios from 'axios';
import { encryptIt } from '../encrypt';

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

    return Promise.all([nameOutPut, phoneOutPut, emailOutPut, idOutPut, pwOutPut]).then((values) => {
        const idImage = Array.prototype.slice.call(ceoInfo.businessIdImage);
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
        formData.append('login_id', values[3]);
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
        userId,
        password: pw
    }).then(res => {
        return res;
    }).catch(err => {
        if(err) throw err;
    });
}