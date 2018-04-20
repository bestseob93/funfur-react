import axios from 'axios';

const FUNFUR = process.env.REACT_APP_URL | "/api/v1";

export const requestSendContact = (contactInfo) => {
    return axios.post(`${FUNFUR}/contact_web`, {
        userName: contactInfo.userName,
        userEmail: contactInfo.userEmail,
        contents: contactInfo.contents
    }).then(res => {
        return res;
    }).catch(err => {
        if(err) throw err;
    });
}