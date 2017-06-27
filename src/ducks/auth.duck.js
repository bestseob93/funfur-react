import { Map } from 'immutable';

const COMPANYNAME_CHECK = "registser/COMPANYNAME_CHECK";

export const checkCompanyName = (companyname) => ({
    type: COMPANYNAME_CHECK
});

const initialState = Map({
    pending: Map({
        checkCompanyName: false,
    }),
});

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case COMPANYNAME_CHECK:
            return state.setIn(['pending', 'checkCompanyName'], true);
        default:
            return state;
    }
}