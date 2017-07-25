import { fromJS } from 'immutable';
import * as requestStatus from 'helpers/requestStatus';
import * as mypage from 'helpers/request/mypage';

/* Action Types */
const CHECK_PASSWORD = "mypage/CHECK_PASSWORD";
const GET_MY_INFO = "mypage/GET_MY_INFO";
const MODIFY_CEO = "mypage/MODIFY_CEO";

/* Action Creators */
export const checkPassword = (password) => ({
    type: CHECK_PASSWORD,
    payload: mypage.requestCheckPassword(password)
});

export const getMyInfo = () => ({
    type: GET_MY_INFO,
    payload: mypage.requestGetMyInfo()
});

export const modifyCeo = (ceoInfo) => ({
    type: MODIFY_CEO,
    payload: mypage.requestModifyCeo(ceoInfo)
});

const initialState = fromJS({
    requests: {
        checkPasword: {
            ...requestStatus.request
        },
        myInfo: {
            ...requestStatus.request
        },
        modify: {
            ...requestStatus.request
        }
    },
    valid: {
        confirmed: false,
        modify: false
    },
    profile: {
        ceoName: '',
        ceoCall: '',
        ceoEmail: '',
        cpName: '',
        businessId: '',
        cpAddress: '',
        cpCall: ''
    }
});

/* Reducer */
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case `${CHECK_PASSWORD}_PENDING`:
            return state.mergeIn(['requests', 'checkPasword'], fromJS(requestStatus.pending));
        case `${CHECK_PASSWORD}_FULFILLED`:
            return state.mergeIn(['requests', 'checkPasword'], fromJS(requestStatus.fulfilled))
                        .setIn(['valid', 'confirmed'], true);
        case `${CHECK_PASSWORD}_REJECTED`:
            return state.mergeIn(['requests', 'checkPasword'], fromJS(requestStatus.rejected))
                        .setIn(['valid', 'confirmed'], false);
        case `${GET_MY_INFO}_PENDING`:
            return state.mergeIn(['requests', 'myInfo'], fromJS(requestStatus.pending));
        case `${GET_MY_INFO}_FULFILLED`:
            return state.mergeIn(['requests', 'myInfo'], fromJS(requestStatus.fulfilled))
                        .setIn(['profile', 'ceoName'], fromJS(action.payload.data.name))
                        .setIn(['profile', 'ceoCall'], fromJS(action.payload.data.phone_number))
                        .setIn(['profile', 'ceoEmail'], fromJS(action.payload.data.email))
                        .setIn(['profile', 'cpName'], fromJS(action.payload.data.company_name))
                        .setIn(['profile', 'businessId'], fromJS(action.payload.data.business_registration_number))
                        .setIn(['profile', 'cpAddress'], fromJS(action.payload.data.address))
                        .setIn(['profile', 'cpCall'], fromJS(action.payload.data.cpCall));
        case `${GET_MY_INFO}_REJECTED`:
            return state.mergeIn(['requests', 'myInfo'], fromJS(requestStatus.rejected));
        case `${MODIFY_CEO}_PENDING`:
            return state.mergeIn(['requests', 'modify'], fromJS(requestStatus.pending));
        case `${MODIFY_CEO}_FULFILLED`:
            return state.mergeIn(['requests', 'modify'], fromJS(requestStatus.fulfilled))
                        .setIn(['valid', 'modify'], true);
        case `${MODIFY_CEO}_REJECTED`:
            return state.mergeIn(['requests', 'modify'], fromJS(requestStatus.rejected))
                        .setIn(['valid', 'modify'], false);
        default:
            return state;
    }
}