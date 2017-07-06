import { Map, fromJS } from 'immutable';
import * as requestStatus from 'helpers/requestStatus';
import * as auth from 'helpers/request/auth';

/* Action Types */
const CHECK_COMPANY_REGISTERATION = "registser/CHECK_COMPANY_REGISTERATION";
const CHECK_USER_ID = "register/CHECK_USER_ID";
const REGISTER_CEO = "register/REGISTER_CEO";

console.log(requestStatus.request);
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
        }
    },
    valid: {
        bizId: false,
        userId: false
    },
    isSuccess: false
});

/* REDUCER */
export default function reducer(state = initialState, action) {
    switch(action.type) {
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
        default:
            return state;
    }
}