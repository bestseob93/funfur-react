import { fromJS } from 'immutable';
import * as requestStatus from 'helpers/requestStatus';
import * as mypage from 'helpers/request/mypage';

/* Action Types */
const CHECK_PASSWORD = "mypage/CHECK_PASSWORD";
const GET_MY_INFO = "mypage/GET_MY_INFO";

/* Action Creators */
export const checkPassword = (password) => ({
    type: CHECK_PASSWORD,
    payload: mypage.requestCheckPassword(password)
});

export const getMyInfo = () => ({
    type: GET_MY_INFO,
    payload: mypage.requestGetMyInfo()
});

const initialState = fromJS({
    requests: {
        checkPasword: {
            ...requestStatus.request
        },
        myInfo: {
            ...requestStatus.request
        }
    },
    valid: {
        confirmed: false
    }
});

/* Reducer */
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case `${CHECK_PASSWORD}_PENDING`:
            return state.mergeIn(['requests', 'checkPasword'], requestStatus.pending);
        case `${CHECK_PASSWORD}_FULFILLED`:
            return state.mergeIn(['requests', 'checkPasword'], requestStatus.fulfilled)
                        .setIn(['valid', 'confirmed'], true);
        case `${CHECK_PASSWORD}_REJECTED`:
            return state.mergeIn(['requests', 'checkPasword'], requestStatus.rejected)
                        .setIn(['valid', 'confirmed'], false);
        case `${GET_MY_INFO}_PENDING`:
            return state.mergeIn(['requests', 'myInfo'], requestStatus.pending);
        case `${GET_MY_INFO}_FULFILLED`:
            return state.mergeIn(['requests', 'myInfo'], requestStatus.fulfilled);
        case `${GET_MY_INFO}_REJECTED`:
            return state.mergeIn(['requests', 'myInfo'], requestStatus.rejected);
        default:
            return state;
    }
}