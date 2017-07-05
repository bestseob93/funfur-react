import axios from 'axios';
import crypto from 'crypto';

console.log(process.env.REACT_APP_SK);
const FUNFUR = process.env.REACT_APP_URL;

export const requestChkCompanyRegi = (companyNumber) => {
    let cipher = crypto.createCipher('aes192', process.env.REACT_APP_SK);
    console.log(typeof companyNumber);
    cipher.update(companyNumber, 'utf8', 'base64');
    let cipherOutput = cipher.final('base64');

    return axios.post(`${FUNFUR}/auth_web/chkBusinessId`, {
        companyNumber: cipherOutput
    }).then(res => {
        return res;
    }).catch(e => {
        console.log('e');
        return e;
    });
}