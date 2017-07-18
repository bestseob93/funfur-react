import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    MyPageEnter,
    EnterForm,
    EnterHeader
} from 'components/Ceo/MyPage';

import * as formDuck from 'ducks/form.duck';
import * as mypageDuck from 'ducks/mypage.duck';

class MyPageEnterScreen extends Component {
    render() {
        return (
            <MyPageEnter>
                <EnterHeader authInfo={this.props.authInfo.toJS()} />
                <EnterForm {...this.props} />
            </MyPageEnter>
        );
    }
}

export default connect(
    state => ({
        form: state.form.get('myPageEnter'),
        authInfo: state.auth.get('authInfo'),
        status: state.mypage.getIn(['requests', 'checkPasword']),
        confirmed: state.mypage.getIn(['valid', 'confirmed'])
    }),
    dispatch => ({
        FormActions: bindActionCreators(formDuck, dispatch),
        MyPageActions: bindActionCreators(mypageDuck, dispatch)
    })
)(MyPageEnterScreen);