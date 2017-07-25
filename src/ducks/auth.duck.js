import { fromJS } from 'immutable';
import { createAction } from 'redux-actions';
import * as requestStatus from 'helpers/requestStatus';
import * as auth from 'helpers/request/auth';

/* Action Types */
const CHECK_COMPANY_REGISTERATION = "registser/CHECK_COMPANY_REGISTERATION";
const CHECK_USER_ID = "register/CHECK_USER_ID";
const REGISTER_CEO = "register/REGISTER_CEO";
const LOGIN_CEO = "login/LOGIN_CEO";
const CHECK_TOKEN = "auth/CHECK_TOKEN";
const AUTH_LOGOUT = "auth/AUTH_LOGOUT";
const SET_PROFILE = "auth/SET_PROFILE";
const MODIFY_PASSWORD = "auth/MODIFY_PASSWORD";

/* Action Creators */
export const checkCompanyRegistration = (companyNumber) => ({
    type: CHECK_COMPANY_REGISTERATION,
    payload: auth.requestChkCompanyRegi(companyNumber)
});

export const checkUserId = (userId) => ({
    type: CHECK_USER_ID,
    payload: auth.requestChkUserId(userId)
});

export const registerCeo = (ceoInfo) => ({
    type: REGISTER_CEO,
    payload: auth.requestRegisterCeo(ceoInfo)
});

export const loginCeo = (userId, pw) => ({
    type: LOGIN_CEO,
    payload: auth.requestLoginCeo(userId, pw)
});

export const checkToken = (token) => ({
    type: CHECK_TOKEN,
    payload: auth.requestCheckToken(token)
});

export const authLogout = createAction(AUTH_LOGOUT);
export const setProfile = createAction(SET_PROFILE);

export const modifyPassword = (prevPassword, newPassword) => ({
    type: MODIFY_PASSWORD,
    payload: auth.requestModifyPassword(prevPassword, newPassword)
});

const initialState = fromJS({
    requests: {
        checkCompanyRegistration: {
            ...requestStatus.request
        },
        checkUserId: {
            ...requestStatus.request
        },
        register: {
            ...requestStatus.request
        },
        login: {
            ...requestStatus.request
        },
        checkToken: {
            ...requestStatus.request
        },
        modifyPassword: {
            ...requestStatus.request
        }
    },
    token: null,
    authenticated: false,
    valid: {
        login: false,
        bizId: false,
        userId: false,
        modifyPw: false
    },
    isSuccess: false,
    authInfo: {
        ceoName: '',
        companyName: '',
        loginId: ''
    }
});

/* REDUCER */
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case `${CHECK_COMPANY_REGISTERATION}_PENDING`:
            return state.mergeIn(['requests', 'checkCompanyRegistration'], fromJS(requestStatus.pending));
        case `${CHECK_COMPANY_REGISTERATION}_FULFILLED`:
            return state.mergeIn(['requests', 'checkCompanyRegistration'], fromJS(requestStatus.fulfilled))
                        .setIn(['valid', 'bizId'], true);
        case `${CHECK_COMPANY_REGISTERATION}_REJECTED`:
            return state.mergeIn(['requests', 'checkCompanyRegistration'], fromJS(requestStatus.rejected))
                        .setIn(['valid', 'bizId'], false);
        case `${CHECK_USER_ID}_PENDING`:
            return state.mergeIn(['requests', 'checkUserId'], fromJS(requestStatus.pending));
        case `${CHECK_USER_ID}_FULFILLED`:
            return state.mergeIn(['requests', 'checkUserId'], fromJS(requestStatus.fulfilled))
                        .setIn(['valid', 'userId'], true);
        case `${CHECK_USER_ID}_REJECTED`:
            return state.mergeIn(['requests', 'checkUserId'], fromJS(requestStatus.rejected))
                        .setIn(['valid', 'userId'], false);
        case `${REGISTER_CEO}_PENDING`:
            return state.mergeIn(['requests', 'register'], fromJS(requestStatus.pending));
        case `${REGISTER_CEO}_FULFILLED`:
            return state.mergeIn(['requests', 'register'], fromJS(requestStatus.fulfilled))
                        .set('isSuccess', action.payload.data.success);
        case `${REGISTER_CEO}_REJECTED`:
            return state.mergeIn(['requests', 'register'], fromJS(requestStatus.rejected));
        case `${LOGIN_CEO}_PENDING`:
            return state.mergeIn(['requests', 'login'], fromJS(requestStatus.pending));
        case `${LOGIN_CEO}_FULFILLED`:
            return state.mergeIn(['requests', 'login'], fromJS(requestStatus.fulfilled))
                        .setIn(['valid', 'login'], true)
                        .set('token', action.payload.data.token)
                        .set('authenticated', true)
                        .setIn(['authInfo', 'loginId'], action.payload.data.loginId)
                        .setIn(['authInfo', 'ceoName'], action.payload.data.ceoName)
                        .setIn(['authInfo', 'companyName'], action.payload.data.companyName);
        case `${LOGIN_CEO}_REJECTED`:
            return state.mergeIn(['requests', 'login'], fromJS(requestStatus.rejected));
        case `${CHECK_TOKEN}_PENDING`:
            return state.mergeIn(['requests', 'checkToken'], fromJS(requestStatus.pending));
        case `${CHECK_TOKEN}_FULFILLED`:
            return state.mergeIn(['requests', 'checkToken'], fromJS(requestStatus.fulfilled))
                        .set('authenticated', true);
        case `${CHECK_TOKEN}_REJECTED`:
            return state.mergeIn(['requests', 'checkToken'], fromJS(requestStatus.rejected))
                        .set('authenticated', false);
        case AUTH_LOGOUT:
            return state.set('authenticated', false);
        case SET_PROFILE:
            return state.mergeIn(['authInfo'], action.payload);
        case `${MODIFY_PASSWORD}_PENDING`:
            return state.mergeIn(['requests', 'modifyPassword'], fromJS(requestStatus.pending));
        case `${MODIFY_PASSWORD}_FULFILLED`:
            return state.mergeIn(['requests', 'modifyPassword'], fromJS(requestStatus.fulfilled))
                        .setIn(['valid', 'modifyPw'], true);
        case `${MODIFY_PASSWORD}_REJECTED`:
            return state.mergeIn(['requests', 'modifyPassword'], fromJS(requestStatus.rejected))
                        .setIn(['valid', 'modifyPw'], false);
        default:
            return state;
    }
}