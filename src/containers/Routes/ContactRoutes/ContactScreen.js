import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Contact,
    ContactForm,
    FunfurInfo
} from 'components/Contact';

import * as uiDuck from 'ducks/ui.duck';
import * as formDuck from 'ducks/form.duck';
import * as contactDuck from 'ducks/contact.duck';

class ContactScreen extends Component {
    render() {
        console.log(this.props.status.toJS());
        return (
            <Contact>
                <div className="row">
                    <ContactForm {...this.props} />
                    <FunfurInfo />
                </div>
            </Contact>
        );
    }
}

export default connect(
    state => ({
        form: state.form.get('contact'),
        status: state.contact.getIn(['requests', 'contact']),
        valid: state.contact.get('valid')
    }),
    dispatch => ({
        UiActions: bindActionCreators(uiDuck, dispatch),
        FormActions: bindActionCreators(formDuck, dispatch),
        ContactActions: bindActionCreators(contactDuck, dispatch)
    })
)(ContactScreen);