import { fromJS } from 'immutable';
import { createAction } from 'redux-actions';

/* Action Types */
const FORM_RESET = "form/FORM_RESET";
const FORM_CHANGE = "form/FORM_CHANGE";
const FORM_UPLOAD_ADD = "form/FORM_UPLOAD_ADD";
const FORM_UPLOAD_REMOVE = "form/FORM_UPLOAD_REMOVE";
const HANDLE_CHECK_BOX = "form/HANDLE_CHECK_BOX";
const DELIVER_COST_FREE = "form/DELIVER_COST_FREE";
const RESET_SECOND_SORTABLE = "form/RESET_SECOND_SORTABLE";

/* Action Creators */
export const formReset = createAction(FORM_RESET);
export const formChange = createAction(FORM_CHANGE);
export const formUploadAdd = createAction(FORM_UPLOAD_ADD);
export const formUploadRemove = createAction(FORM_UPLOAD_REMOVE);
export const handleCheckBox = createAction(HANDLE_CHECK_BOX);
export const deliverCostFree = createAction(DELIVER_COST_FREE);
export const resetSecondSortable = createAction(RESET_SECOND_SORTABLE);

const initialState = fromJS({
    registerPolicy: {
        checkAll: '',
        site: '',
        sales: '',
        privacy: ''
    },
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
    contact: {
        userName: '',
        userEmail: '',
        contents: ''
    },
    product: {
        productName: '',
        productPosition: '',
        firstSort_1: '',
        secondSort_1: '',
        productPosition_2: '',
        firstSort_2: '',
        secondSort_2: '',
        modelName: '',
        modelOption: '',
        productColor: '',
        sizeWidth: '',
        sizeDepth: '',
        sizeHeight: '',
        mainMaterial: '',
        prManufacturer: '',
        productOrigin: '',
        productPrice: '',
        asIntro: '',
        productImages: [],
        isDeliverFree: '',
        SeoulGyungki: '',
        GangWon: '',
        ChungNam: '',
        ChungBuk: '',
        GyeongBuk: '',
        GyeongNam: '',
        JeonBuk: '',
        JeonNam: '',
        JeJuSanGan: '',
        isCostSame: false
    },
    myPageEnter: {
        password: ''
    },
    modify: {
        ceoCall: '',
        ceoEmail_1: '',
        ceoEmail_2: ''
    },
    modifyPw: {
        prevPassword: '',
        newPassword: '',
        rePassword: '',
        errCode: null
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
        case HANDLE_CHECK_BOX:
            return state.setIn([action.payload.formName, action.payload.name], fromJS(action.payload.value));
        case DELIVER_COST_FREE:
            return state.setIn(['product', 'SeoulGyungki'], fromJS(''))
                        .setIn(['product', 'GangWon'], fromJS(''))
                        .setIn(['product', 'ChungNam'], fromJS(''))
                        .setIn(['product', 'ChungBuk'], fromJS(''))
                        .setIn(['product', 'GyeongBuk'], fromJS(''))
                        .setIn(['product', 'GyeongNam'], fromJS(''))
                        .setIn(['product', 'JeonBuk'], fromJS(''))
                        .setIn(['product', 'JeonNam'], fromJS(''))
                        .setIn(['product', 'JeJuSanGan'], fromJS(''));
        case RESET_SECOND_SORTABLE:
            return state.setIn(['product', 'productPosition_2'], fromJS(''))
                        .setIn(['product', 'firstSort_2'], fromJS(''))
                        .setIn(['product', 'secondSort_2'], fromJS(''));
        default:
            return state;
    }
}