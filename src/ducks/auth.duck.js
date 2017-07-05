import { Map, fromJS } from 'immutable';
import * as requestStatus from 'helpers/requestStatus';
import * as auth from 'helpers/request/auth';

/* Action Types */
const CHECK_COMPANY_REGISTERATION = "registser/CHECK_COMPANY_REGISTERATION";
const CHECK_USER_ID = "register/CHECK_USER_ID";

console.log(requestStatus.request);
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
    valid: {
        bizId: false,
        userId: false
    },
    message: '',
    isSuccess: false
});

/* REDUCER */
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case `${CHECK_COMPANY_REGISTERATION}_PENDING`:
            console.log(state.toJS());
            return state.mergeIn(['requests', 'checkCompanyRegistration'], requestStatus.pending);
        case `${CHECK_COMPANY_REGISTERATION}_FULFILLED`:
            console.log(action.payload);
            return state.mergeIn(['requests', 'checkCompanyRegistration'], requestStatus.fulfilled)
                        .set('isSuccess', action.payload.data.success)
                        .setIn(['valid', 'bizId'], true);
        case `${CHECK_COMPANY_REGISTERATION}_REJECTED`:
            console.error(action.payload.body);
            return state.mergeIn(['requests', 'checkCompanyRegistration'], requestStatus.rejected)
                        .setIn(['valid', 'bizId'], false)
                        .set('message', action.payload.data.message);
        case `${CHECK_USER_ID}_PENDING`:
            return state.mergeIn(['requests', 'checkUserId'], requestStatus.pending);
        case `${CHECK_USER_ID}_FULFILLED`:
            return state.mergeIn(['requests', 'checkUserId'], requestStatus.fulfilled);
        case `${CHECK_USER_ID}_REJECTED`:
            return state.mergeIn(['requests', 'checkUserId'], requestStatus.rejected);
        default:
            return state;
    }
}