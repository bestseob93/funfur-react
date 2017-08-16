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

const initialState = fromJS({
    visible: {
        base: true,   // header & footer
        dashboard: true,
        modal: false
    },
    listIndex: null,
    iconIndex: null,
    secondSortable: false,
    sweetAlert: {
        showCancel: false,
        isAlertShow: false,
        alertTitle: '',
        alertMessage: '',
        typeSuccess: false,
        typeWarning: false,
        typeDanger: false
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
                        .setIn(['sweetAlert', action.payload.alertType], action.payload.value);
        case HIDE_SWEET_ALERT:
            return state.setIn(['sweetAlert', 'isAlertShow'], false)
                        .setIn(['sweetAlert', 'typeDanger'], false)
                        .setIn(['sweetAlert', 'typeWarning'], false)
                        .setIn(['sweetAlert', 'typeSuccess'], false);
        default:
            return state;
    }
}