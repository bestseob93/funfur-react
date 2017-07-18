import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    MyPageModify,
    ModifyForm
} from 'components/Ceo/MyPage';

import * as formDuck from 'ducks/form.duck';

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
        status: state.mypage.getIn(['requests', 'modify']),
    }),
    dispatch => ({
        FormActions: bindActionCreators(formDuck, dispatch)
    })
)(MyPageModifyScreen);