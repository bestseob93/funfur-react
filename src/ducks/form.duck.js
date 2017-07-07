import { Map } from 'immutable';
import { createAction } from 'redux-actions';

const FORM_RESET = "form/FORM_RESET";
const FORM_CHANGE = "form/FORM_CHANGE";

export const formReset = createAction(FORM_RESET);
export const formChange = createAction(FORM_CHANGE);

const initialState = Map({
    register: Map({
        cpName: '',
        businessId: '',
        businessIdImage: [],
        postCode: '',
        cpAddress_1: '',
        cpAddress_2: '',
        cpCall: '',
        ceoName: '',
        ceoCall: '',
        ceoEmail_1: '',
        ceoEmail_2: '',
        userId: '',
        password: '',
        repassword: ''
    }),
    login: Map({
        userId: '',
        password: ''
    })
});

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case FORM_CHANGE:
            const { formName, name, value } = action.payload;
            console.log(action.payload);
            return state.setIn([formName, name], value);
        case FORM_RESET:
            /* 폼 초기화 */
            return state.set(action.payload, initialState.get(action.payload))
        default:
            return state;
    }
}