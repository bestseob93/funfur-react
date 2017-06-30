import { Map, fromJS } from 'immutable';
import * as requestStatus from 'helpers/requestStatus';
import * as auth from 'helpers/request/auth';

/* Action Types */
const CHECK_COMPANY_REGISTERATION = "registser/CHECK_COMPANY_REGISTERATION";
const CHECK_USER_ID = "register/CHECK_USER_ID";

/* Action Creators */
export const checkCompanyRegistration = (companyNumber) => ({
    type: CHECK_COMPANY_REGISTERATION,
    payload: auth.requestChkCompanyRegi(companyNumber)
});

export const checkUserId = (userId) => ({
    type: CHECK_USER_ID
});

const initialState = fromJS({
    requests: {
        checkCompanyRegistration: {
            ...requestStatus.request
        },
        checkUserId: {
            ...requestStatus.request
        },
    },
});

/* REDUCER */
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case `${CHECK_COMPANY_REGISTERATION}_PENDING`:
            return state.mergeIn(['requests', 'checkCompanyRegistration'], ...requestStatus.pending);
        case `${CHECK_COMPANY_REGISTERATION}_FULFILLED`:
            return state.mergeIn(['requests', 'checkCompanyRegistration'], ...requestStatus.fulfilled);
        case `${CHECK_COMPANY_REGISTERATION}_REJECTED`:
            return state.mergeIn(['requests', 'checkCompanyRegistration'], ...requestStatus.rejected);
        case `${CHECK_USER_ID}_PENDING`:
            return state.mergeIn(['requests', 'checkUserId'], ...requestStatus.pending);
        case `${CHECK_USER_ID}_FULFILLED`:
            return state.mergeIn(['requests', 'checkUserId'], ...requestStatus.fulfilled);
        case `${CHECK_USER_ID}_REJECTED`:
            return state.mergeIn(['requests', 'checkUserId'], ...requestStatus.rejected);
        default:
            return state;
    }
}