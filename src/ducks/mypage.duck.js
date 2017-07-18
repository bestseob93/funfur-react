import { fromJS } from 'immutable';
import * as requestStatus from 'helpers/requestStatus';
import * as mypage from 'helpers/request/mypage';

/* Action Types */
const CHECK_PASSWORD = "mypage/CHECK_PASSWORD";

/* Action Creators */
export const checkPassword = (password) => ({
    type: CHECK_PASSWORD,
    payload: mypage.requestCheckPassword(password)
});

const initialState = fromJS({
    requests: {
        checkPasword: {
            ...requestStatus.request
        },
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
        default:
            return state;
    }
}