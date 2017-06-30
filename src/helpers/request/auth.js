import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();
const FUNFUR = process.env.URL || 'http://52.78.80.125:4000/api/v1';
console.log(FUNFUR);

export const requestChkCompanyRegi = (companyNumber) => {
    return axios.post(`${FUNFUR}/auth_web/chkBusinessId`, {
        companyNumber
    });
}