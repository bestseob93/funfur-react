import { fromJS } from 'immutable';
import { createAction } from 'redux-actions';


/* CEO DASHBOARD */
const HIDE_HEADER_FOOTER = "ui/HIDE_HEADER_FOOTER";
const SHOW_HEADER_FOOTER = "ui/SHOW_HEADER_FOOTER";

const HIDE_DASHBOARD = "ui/HIDE_DASHBOARD";
const SHOW_DASHBOARD = "ui/SHOW_DASHBOARD";

const SHOW_MODAL = "ui/SHOW_MODAL";
const HIDE_MODAL = "ui/HIDE_MODAL";

/* CEO DASHBOARD SIDE BAR */
const SET_LIST_INDEX = "ui/SET_LIST_INDEX";
const SET_ICON_INDEX = "ui/SET_ICON_INDEX";

/* PRODUCT UPLOAD */
const ADD_SECOND_SORTABLE = "ui/ADD_SECOND_SORTABLE";
const REMOVE_SECOND_SORTABLE = "ui/REMOVE_SECOND_SORTABLE";

/* CONSUMMER */
const SET_COLLAPSE_INDEX = "ui/SET_COLLAPSE_INDEX";

/* SWEET ALERT */
const SHOW_SWEET_ALERT = "ui/SHOW_SWEET_ALERT";
const HIDE_SWEET_ALERT = "ui/HIDE_SWEET_ALERT";
const CLEAR_SWEET_ALERT = "ui/CLEAR_SWEET_ALERT";

/* Mobile Menu */
const SHOW_MOBILE_MENU = "ui/SHOW_MOBILE_MENU";
const HIDE_MOBILE_MENU = "ui/HIDE_MOBILE_MENU";

export const hideHeaderFooter = createAction(HIDE_HEADER_FOOTER);
export const showHeaderFooter = createAction(SHOW_HEADER_FOOTER);

export const hideDashboard = createAction(HIDE_DASHBOARD);
export const showDashboard = createAction(SHOW_DASHBOARD);

export const setListIndex = createAction(SET_LIST_INDEX);
export const setIconIndex = createAction(SET_ICON_INDEX);

export const addSecondSortable = createAction(ADD_SECOND_SORTABLE);
export const removeSecondSortable = createAction(REMOVE_SECOND_SORTABLE);

export const setCollapseIndex = createAction(SET_COLLAPSE_INDEX);

export const showModal = createAction(SHOW_MODAL);
export const hideModal = createAction(HIDE_MODAL);

export const showSweetAlert = createAction(SHOW_SWEET_ALERT);
export const hideSweetAlert = createAction(HIDE_SWEET_ALERT);
export const clearSweetAlert = createAction(CLEAR_SWEET_ALERT);

export const showMobileMenu = createAction(SHOW_MOBILE_MENU);
export const hideMobileMenu = createAction(HIDE_MOBILE_MENU);

const initialState = fromJS({
    visible: {
        base: true,   // header & footer
        dashboard: true,
        modal: false,
        mobileMenu: false,
    },
    listIndex: null,
    iconIndex: null,
    secondSortable: false,
    sweetAlert: {
        showCancel: false,
        isAlertShow: false,
        alertTitle: '',
        alertMessage: '',
        alertType: '',
        confirmText: '',
    },
    collapseIndex: null
});

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case HIDE_HEADER_FOOTER:
            return state.setIn(['visible', 'base'], false);
        case SHOW_HEADER_FOOTER:
            return state.setIn(['visible', 'base'], true);
        case HIDE_DASHBOARD:
            return state.setIn(['visible', 'dashboard'], false);
        case SHOW_DASHBOARD:
            return state.setIn(['visible', 'dashboard'], true);
        case SET_LIST_INDEX:
            return state.set('listIndex', action.payload);
        case SET_ICON_INDEX:
            return state.set('iconIndex', action.payload);
        case ADD_SECOND_SORTABLE:
            return state.set('secondSortable', true);
        case REMOVE_SECOND_SORTABLE:
            return state.set('secondSortable', false);
        case SET_COLLAPSE_INDEX:
            return state.set('collapseIndex', action.payload);
        case SHOW_MODAL:
            return state.setIn(['visible', 'modal'], true);
        case HIDE_MODAL:
            return state.setIn(['visible', 'modal'], false);
        case SHOW_SWEET_ALERT:
            return state.setIn(['sweetAlert', 'isAlertShow'], true)
                        .setIn(['sweetAlert', 'alertTitle'], action.payload.alertTitle)
                        .setIn(['sweetAlert', 'alertMessage'], action.payload.message)
                        .setIn(['sweetAlert', 'showCancel'], action.payload.showCancel)
                        .setIn(['sweetAlert', 'confirmText'], action.payload.confirmText)
                        .setIn(['sweetAlert', 'alertType'], action.payload.value);
        case HIDE_SWEET_ALERT:
            return state.setIn(['sweetAlert', 'isAlertShow'], false)
                        .setIn(['sweetAlert', 'alertType'], fromJS(''));
        case CLEAR_SWEET_ALERT:
            return state.setIn(['sweetAlert', 'isAlertShow'], false)
                        .setIn(['sweetAlert', 'alertTitle'], fromJS(''))
                        .setIn(['sweetAlert', 'alertMessage'], fromJS(''))
                        .setIn(['sweetAlert', 'showCancel'], false)
                        .setIn(['sweetAlert', 'alertType'], fromJS(''));
        case SHOW_MOBILE_MENU:
            return state.setIn(['visible', 'mobileMenu'], true);
        case HIDE_MOBILE_MENU:
            return state.setIn(['visible', 'mobileMenu'], false);
        default:
            return state;
    }
}