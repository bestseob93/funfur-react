import axios from 'axios';
const FUNFUR = process.env.URL;

export const requestChkCompanyRegi = (companyNumber) => {
    return axios.post(`${FUNFUR}/auth_web/chkBusinessId`, {
        companyNumber
    });
}