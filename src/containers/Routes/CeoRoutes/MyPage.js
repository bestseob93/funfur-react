import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    MyPageEnter,
    EnterForm,
    EnterHeader
} from 'components/Ceo/MyPage';

import * as formDuck from 'ducks/form.duck';

function MyPage() {
    return (
        <MyPageEnter>
            <EnterHeader authInfo={this.props.authInfo.toJS()} />
            <EnterForm {...this.props} />
        </MyPageEnter>
    );
}

export default connect(
    state => ({
        form: state.form.get('myPageEnter'),
        authInfo: state.auth.get('authInfo')
    }),
    dispatch => ({
        FormActions: bindActionCreators(formDuck, dispatch)
    })
)(MyPage);