import { fromJS } from 'immutable';
import { createAction } from 'redux-actions';

const HIDE_HEADER_FOOTER = "ui/HIDE_HEADER_FOOTER";
const SHOW_HEADER_FOOTER = "ui/SHOW_HEADER_FOOTER";
const HIDE_DASHBOARD = "ui/HIDE_DASHBOARD";
const SHOW_DASHBOARD = "ui/SHOW_DASHBOARD";
const SET_LIST_INDEX = "ui/SET_LIST_INDEX";

export const hideHeaderFooter = createAction(HIDE_HEADER_FOOTER);
export const showHeaderFooter = createAction(SHOW_HEADER_FOOTER);
export const hideDashboard = createAction(HIDE_DASHBOARD);
export const showDashboard = createAction(SHOW_DASHBOARD);
export const setListIndex = createAction(SET_LIST_INDEX);

const initialState = fromJS({
    visible: {
        base: true,   // header & footer
        dashboard: true,
    },
    listIndex: null,
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
        default:
            return state;
    }
}