import { fromJS } from 'immutable';

import * as requestStatus from 'helpers/requestStatus';
import * as contact from 'helpers/request/contact';

const SEND_CONTACT = "contact/SEND_CONTACT";

export const sendContact = (contactInfo) => ({
    type: SEND_CONTACT,
    payload: contact.requestSendContact(contactInfo)
});

const initialState = fromJS({
    request: { ...requestStatus.request },
    valid: false
});

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case `${SEND_CONTACT}_PENDING`:
            return state.mergeIn('request', fromJS(requestStatus.pending));
        case `${SEND_CONTACT}_FULFILLED`:
            return state.mergeIn('request', fromJS(requestStatus.fulfilled))
                        .set('valid', true);
        case `${SEND_CONTACT}_REJECTED`:
            return state.mergeIn('request', fromJS(requestStatus.rejected))
                        .set('valid', false);
        default:
            return state;
    }
}