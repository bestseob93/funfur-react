import { fromJS } from 'immutable';
import { createAction } from 'redux-actions';
import * as requestStatus from 'helpers/requestStatus';
import * as auth from 'helpers/request/auth';

/* Action Types */
const CHECK_COMPANY_REGISTERATION = "registser/CHECK_COMPANY_REGISTERATION";
const CHECK_USER_ID = "register/CHECK_USER_ID";
const REGISTER_CEO = "register/REGISTER_CEO";
const LOGIN_CEO = "login/LOGIN_CEO";
const TOKEN_TEST = "login/TOKEN_TEST";
const CHECK_TOKEN = "auth/CHECK_TOKEN";
const AUTH_LOGOUT = "auth/AUTH_LOGOUT";

/* Action Creators */
export const tokenTest = (token) => ({
    type: TOKEN_TEST,
    payload: auth.requestTokenTest(token)
});

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
        }
    },
    token: null,
    authenticated: false,
    valid: {
        login: false,
        bizId: false,
        userId: false
    },
    isSuccess: false
});

/* REDUCER */
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case `${TOKEN_TEST}_PENDING`:
            return state;
        case `${TOKEN_TEST}_FULFILLED`:
            return state;
        case `${TOKEN_TEST}_REJECTED`:
            return state;
        case `${CHECK_COMPANY_REGISTERATION}_PENDING`:
            return state.mergeIn(['requests', 'checkCompanyRegistration'], requestStatus.pending);
        case `${CHECK_COMPANY_REGISTERATION}_FULFILLED`:
            return state.mergeIn(['requests', 'checkCompanyRegistration'], requestStatus.fulfilled)
                        .setIn(['valid', 'bizId'], true);
        case `${CHECK_COMPANY_REGISTERATION}_REJECTED`:
            return state.mergeIn(['requests', 'checkCompanyRegistration'], requestStatus.rejected)
                        .setIn(['valid', 'bizId'], false);
        case `${CHECK_USER_ID}_PENDING`:
            return state.mergeIn(['requests', 'checkUserId'], requestStatus.pending);
        case `${CHECK_USER_ID}_FULFILLED`:
            return state.mergeIn(['requests', 'checkUserId'], requestStatus.fulfilled)
                        .setIn(['valid', 'userId'], true);
        case `${CHECK_USER_ID}_REJECTED`:
            return state.mergeIn(['requests', 'checkUserId'], requestStatus.rejected)
                        .setIn(['valid', 'userId'], false);
        case `${REGISTER_CEO}_PENDING`:
            return state.mergeIn(['requests', 'register'], requestStatus.pending);
        case `${REGISTER_CEO}_FULFILLED`:
            return state.mergeIn(['requests', 'register'], requestStatus.fulfilled)
                        .set('isSuccess', action.payload.data.success);
        case `${REGISTER_CEO}_REJECTED`:
            return state.mergeIn(['requests', 'register'], requestStatus.rejected);
        case `${LOGIN_CEO}_PENDING`:
            return state.mergeIn(['requests', 'login'], requestStatus.pending);
        case `${LOGIN_CEO}_FULFILLED`:
            return state.mergeIn(['requests', 'login'], requestStatus.fulfilled)
                        .setIn(['valid', 'login'], true)
                        .set('token', action.payload.data.token)
                        .set('authenticated', true);
        case `${LOGIN_CEO}_REJECTED`:
            return state.mergeIn(['requests', 'login'], requestStatus.rejected);
        case `${CHECK_TOKEN}_PENDING`:
            return state.mergeIn(['requests', 'checkToken'], requestStatus.pending);
        case `${CHECK_TOKEN}_FULFILLED`:
            return state.mergeIn(['requests', 'checkToken'], requestStatus.fulfilled)
                        .set('authenticated', true);
        case `${CHECK_TOKEN}_REJECTED`:
            return state.mergeIn(['requests', 'checkToken'], requestStatus.rejected)
                        .set('authenticated', false);
        case AUTH_LOGOUT:
            return state.set('authenticated', false);
        default:
            return state;
    }
}