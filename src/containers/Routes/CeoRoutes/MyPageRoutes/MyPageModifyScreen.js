import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    MyPageModify,
    ModifyForm
} from 'components/Ceo/MyPage';

import * as formDuck from 'ducks/form.duck';
import * as mypageDuck from 'ducks/mypage.duck';

class MyPageModifyScreen extends Component {
    render() {
        return (
            <MyPageModify>
                <ModifyForm {...this.props} />
            </MyPageModify>
        );
    }
}

export default connect(
    state => ({
        form: state.form.get('modify'),
        status: {
            myInfo: state.mypage.getIn(['requests', 'myInfo']),
            modify: state.mypage.getIn(['requests', 'modify'])
        },
        valid: state.mypage.getIn(['valid', 'modify']),
        profile: state.mypage.get('profile')
    }),
    dispatch => ({
        FormActions: bindActionCreators(formDuck, dispatch),
        MyPageActions: bindActionCreators(mypageDuck, dispatch)
    })
)(MyPageModifyScreen);