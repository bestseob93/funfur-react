import { fromJS } from 'immutable';
import { createAction } from 'redux-actions';

/* Action Types */
const FORM_RESET = "form/FORM_RESET";
const FORM_CHANGE = "form/FORM_CHANGE";
const FORM_PHOTO_INDEX_UPDATE = "form/FORM_PHOTO_INDEX_UPDATE";
const FORM_UPLOAD_ADD = "form/FORM_UPLOAD_ADD";
const FORM_UPLOAD_REMOVE = "form/FORM_UPLOAD_REMOVE";
const HANDLE_CHECK_BOX = "form/HANDLE_CHECK_BOX";
const HANDLE_PROPORTION_CHK = "form/HANDLE?PROPORTION_CHK";
const DELIVER_COST_FREE = "form/DELIVER_COST_FREE";
const RESET_SECOND_SORTABLE = "form/RESET_SECOND_SORTABLE";

const ORDER_FORM_CHANGE = "form/ORDER_FORM_CHANGE";
/* Action Creators */
export const formReset = createAction(FORM_RESET);
export const formChange = createAction(FORM_CHANGE);
export const formPhotoIndexUpdate = createAction(FORM_PHOTO_INDEX_UPDATE);
export const formUploadAdd = createAction(FORM_UPLOAD_ADD);
export const formUploadRemove = createAction(FORM_UPLOAD_REMOVE);
export const handleCheckBox = createAction(HANDLE_CHECK_BOX);
export const handleProportionChk = createAction(HANDLE_PROPORTION_CHK);
export const deliverCostFree = createAction(DELIVER_COST_FREE);
export const resetSecondSortable = createAction(RESET_SECOND_SORTABLE);

export const orderFormChange = createAction(ORDER_FORM_CHANGE);

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
        isCostSame: false,
        proportionShipping: false
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
    },
    orders: {
        shippingMethod: '',
        shippingCompany: '',
        trackingNumber: '',
        id: '',
    }
});

/* Reducer */
export default function reducer(state = initialState, action) {
    console.log(action.payload);
    switch(action.type) {
        case FORM_CHANGE:
            return state.setIn([action.payload.formName, action.payload.name], fromJS(action.payload.value));
        case FORM_RESET:
            /* 폼 초기화 */
            return state.set(action.payload, initialState.get(action.payload))
        case FORM_PHOTO_INDEX_UPDATE:
            /* 사진 위치 바꾸기 */
            let item = state.getIn(['product', 'productImages', action.payload.setNewIndex]);
            return state.setIn(['product', 'productImages', action.payload.setNewIndex], state.getIn(['product', 'productImages', action.payload.dragIndex]))
                        .setIn(['product', 'productImages', action.payload.dragIndex], item);
        case FORM_UPLOAD_ADD:
            return state.setIn([action.payload.formName, action.payload.name], state.getIn([action.payload.formName, action.payload.name]).concat(action.payload.value));
        case FORM_UPLOAD_REMOVE:
            return state.setIn([action.payload.formName, action.payload.name], state.getIn([action.payload.formName, action.payload.name]).delete(action.payload.value));
        case HANDLE_CHECK_BOX:
            return state.setIn([action.payload.formName, action.payload.name], fromJS(action.payload.value));
        case HANDLE_PROPORTION_CHK:
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
        case ORDER_FORM_CHANGE:
            return state.setIn(['orders', action.payload.name], fromJS(action.payload.value))
                        .setIn(['orders', 'id'], fromJS(action.payload.id));
        default:
            return state;
    }
}