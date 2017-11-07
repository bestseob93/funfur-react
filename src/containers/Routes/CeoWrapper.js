import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    CeoHome,
    CeoSellingProduct,
    CeoProductUpload,
    CeoProductModify,
    MyPageEnterScreen,
    MyPageModifyScreen,
    MyPageFinishScreen,
    ConsumerScreen,
    OrderScreen
} from './CeoRoutes';

import {
    CeoHeader,
    SideBar,
} from 'components/Base';

import {
    PasswordModal
} from 'components/Ceo/Home';

import storage from 'helpers/localForage.helper';

import * as uiDuck from 'ducks/ui.duck';
import * as authDuck from 'ducks/auth.duck';
import * as formDuck from 'ducks/form.duck';

const contextTypes = {
    router: PropTypes.object
};

class CeoWrapper extends Component {
    constructor(props) {
        super(props);

        this.handleUiAction = this.handleUiAction.bind(this);
        this.handleSideMenu = this.handleSideMenu.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.onIconActiveClick = this.onIconActiveClick.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }


    componentDidMount() {
        this.handleUiAction(true); // ceo 페이지 마운트 시 기존 헤더 / 푸터 하이드

        // TODO. 리프레쉬 해도 localforage에 있는 프로필 가져오기.
        const { AuthActions } = this.props;
        storage.get('auth').then(async (value) => {
            await AuthActions.setProfile(value);
        }).catch(e => {
            if(e) throw e;
        });
    }


    componentWillUnmount() {
        this.handleUiAction(false); // ceo 페이지 언마운트 시 기존 헤더 / 푸터 쇼
    }

    // ceo 페이지 들어올 시 기존 header / footer 컨트롤
    handleUiAction(hide) {
        const { UiActions } = this.props;
        if(hide) {
            UiActions.hideHeaderFooter();
        } else {
            UiActions.showHeaderFooter();
        }
    }

    // 왼쪽 border 애니메이션 처리
    handleSideMenu(iconIndex, index) {
        const { UiActions } = this.props;
        if(iconIndex === 'iconIndex-9' || iconIndex === 'iconIndex-0') {
            UiActions.setIconIndex(iconIndex);
        }
        UiActions.setListIndex(index);
    }

    showModal(ev) {
        const { UiActions } = this.props;
        ev.preventDefault();
        UiActions.showModal();
    }

    hideModal(ev) {
        const { FormActions, UiActions } = this.props;
        if(!ev) {
            UiActions.hideModal();
        } else {
            ev.preventDefault();
            FormActions.formReset('modifyPw');
            UiActions.hideModal();
        }
    }
    onIconActiveClick(iconIndex) {
        const { UiActions } = this.props;
        UiActions.setIconIndex(iconIndex);
    }

    handleLogout() {
        const { AuthActions } = this.props;
        AuthActions.authLogout();
        storage.remove('token');
    }

    render() {
        const { match } = this.props;
        const {
            handleSideMenu,
            showModal,
            hideModal,
            onIconActiveClick,
            handleLogout,
        } = this;
        return (
            <div>
                <PasswordModal
                    hideModal={hideModal}
                    modalVisible={this.props.visible.modal}
                    FormActions={this.props.FormActions}
                    AuthActions={this.props.AuthActions}
                    form={this.props.form}
                    pwValid={this.props.valid.modifyPw}
                    status={this.props.status.modifyPw}
                />
                <SideBar
                    onClick={handleSideMenu}
                    onIconActiveClick={onIconActiveClick}
                    listIndex={this.props.listIndex}
                    iconIndex={this.props.iconIndex}
                    authInfo={this.props.authInfo.toJS()}
                />
                <div className="ceo-page-wrapper">
                    <CeoHeader showModal={showModal} handleLogout={handleLogout} />
                    <Route exact path={match.url} component={CeoHome} />
                    <Switch>
                        <Route exact path={`${match.url}/products`} component={CeoSellingProduct} />
                        <Route path={`${match.url}/products/:id`} component={CeoProductModify} />
                    </Switch>
                    <Route path={`${match.url}/upload`} component={CeoProductUpload} />
                    <Route path={`${match.url}/mypage`} component={MyPageEnterScreen} />
                    <Route path={`${match.url}/mypage_2`} component={MyPageModifyScreen} />
                    <Route path={`${match.url}/mypage_3`} component={MyPageFinishScreen} />
                    <Route path={`${match.url}/consumer`} component={ConsumerScreen} />
                    <Route path={`${match.url}/order`} component={OrderScreen} />
                </div>
            </div>
        );
    }
}

CeoWrapper.contextTypes = contextTypes;

export default connect(
    state => ({
        visible: {
            modal: state.ui.getIn(['visible', 'modal'])
        },
        listIndex: state.ui.get('listIndex'),
        iconIndex: state.ui.get('iconIndex'),
        authInfo: state.auth.get('authInfo'),
        form: state.form.get('modifyPw'),
        valid: {
            modifyPw: state.auth.getIn(['valid', 'modifyPw'])
        },
        status: {
            modifyPw: state.auth.getIn(['requests', 'modifyPassword'])
        }
    }),
    dispatch => ({
        UiActions: bindActionCreators(uiDuck, dispatch),
        AuthActions: bindActionCreators(authDuck, dispatch),
        FormActions: bindActionCreators(formDuck, dispatch)
    })
)(CeoWrapper);