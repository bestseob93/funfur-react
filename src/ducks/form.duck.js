import { fromJS } from 'immutable';
import { createAction } from 'redux-actions';

/* Action Types */
const FORM_RESET = "form/FORM_RESET";
const FORM_CHANGE = "form/FORM_CHANGE";
const FORM_UPLOAD_ADD = "form/FORM_UPLOAD_ADD";
const FORM_UPLOAD_REMOVE = "form/FORM_UPLOAD_REMOVE";

/* Action Creators */
export const formReset = createAction(FORM_RESET);
export const formChange = createAction(FORM_CHANGE);
export const formUploadAdd = createAction(FORM_UPLOAD_ADD);
export const formUploadRemove = createAction(FORM_UPLOAD_REMOVE);

const initialState = fromJS({
    register: {
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
    },
    login: {
        userId: '',
        password: ''
    },
    product: {
        productName: '',
        productPosition: '',
        firstSort: '',
        secondSort: '',
        modelName: '',
        modelOption: '',
        productColor: '',
        sizeWidth: '',
        sizeHeight: '',
        mainMaterial: '',
        prManufacturer: '',
        productOrigin: '',
        productPrice: '',
        asIntro: '',
        productImages: []
    },
    myPageEnter: {
        password: ''
    },
    modify: {
        password: '',
        repassword: '',
        ceoCall: '',
        ceoEmail_1: '',
        ceoEmail_2: ''
    }
});

/* Reducer */
export default function reducer(state = initialState, action) {
    console.log(action.payload);
    switch(action.type) {
        case FORM_CHANGE:
            // const { formName, name, value } = action.payload;
            return state.setIn([action.payload.formName, action.payload.name], fromJS(action.payload.value));
        case FORM_RESET:
            /* 폼 초기화 */
            return state.set(action.payload, initialState.get(action.payload))
        case FORM_UPLOAD_ADD:
            return state.setIn([action.payload.formName, action.payload.name], state.getIn([action.payload.formName, action.payload.name]).concat(action.payload.value));
        case FORM_UPLOAD_REMOVE:
            return state.setIn([action.payload.formName, action.payload.name], state.getIn([action.payload.formName, action.payload.name]).delete(action.payload.value));
        default:
            return state;
    }
}