import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  CeoHome,
  CeoSellingProduct,
  CeoProductUpload,
  CeoProductModify,
  ExchangeScreen,
  MyPageEnterScreen,
  MyPageModifyScreen,
  MyPageFinishScreen,
  ConsumerScreen,
  OrderScreen
} from "./CeoRoutes";

import { CeoHeader, SideBar, MobileHamburger } from "components/Base";

import { PasswordModal } from "components/Ceo/Home";

import storage from "helpers/localForage.helper";

import * as uiDuck from "ducks/ui.duck";
import * as authDuck from "ducks/auth.duck";
import * as formDuck from "ducks/form.duck";

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
    this.handleHamburgerPress = this.handleHamburgerPress.bind(this);
  }

  componentDidUpdate() {
    this.handleUiAction(true); // ceo 페이지 마운트 시 기존 헤더 / 푸터 하이드

    storage
      .get("token")
      .then(async value => {
        try {
          await AuthActions.checkToken(value).then(res => {
            console.log("response", res);
            if (res.status === 401 || res.status === 404) {
              console.log("세선만료. 로그아웃 진행", value);
              AuthActions.authLogout();
              storage.remove("auth");
              storage.remove("token");

              document.location = "/";
            }
          });
        } catch (e) {
          console.log("ceoWrapper check token 오류발생", e);
          window.bugsnagClient.notify(new Error("제품 업로드 에러 - 토큰"), {
            severity: "error",
            user: window.bugsnagClient.user,
            context: "Ceo Wrapper checkToken 오류",
            strageValue: value,
            error: e,
            storage: storage
          });
          //document.location="/";
          // pathname이 /ceo 로 시작하는지 검사.
          // const pathNameRegx = /^\/ceo/g;

          // // // 로그인 안되어 있는데, ceo 페이지 진입 시 홈으로 강제 이동
          // if (
          //   !this.props.authenticated &&
          //   window.location.pathname.search(pathNameRegx) === 0
          // ) {
          //   document.location = "/";
          // }
        }
      })
      .catch(err => {
        if (err) throw err;
      });

    // TODO. 리프레쉬 해도 localforage에 있는 프로필 가져오기.
    const { AuthActions } = this.props;
    storage
      .get("auth")
      .then(async value => {
        await AuthActions.setProfile(value);
      })
      .catch(e => {
        if (e) throw e;
      });

    const auth = this.props.authInfo.toJS();
    window.bugsnagClient.user = {
      name: auth.ceoName,
      companyName: auth.companyName,
      id: window.userID
    };
  }

  componentWillUnmount() {
    this.handleUiAction(false); // ceo 페이지 언마운트 시 기존 헤더 / 푸터 쇼
  }

  // ceo 페이지 들어올 시 기존 header / footer 컨트롤
  handleUiAction(hide) {
    const { UiActions } = this.props;
    if (hide) {
      UiActions.hideHeaderFooter();
    } else {
      UiActions.showHeaderFooter();
    }
  }

  // 왼쪽 border 애니메이션 처리
  handleSideMenu(iconIndex, index) {
    const { UiActions } = this.props;
    //console.log(iconIndex);
    if (iconIndex === "iconIndex-9" || iconIndex === "iconIndex-0") {
      UiActions.setIconIndex(iconIndex);
      UiActions.hideMobileMenu();
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
    if (!ev) {
      UiActions.hideModal();
    } else {
      ev.preventDefault();
      FormActions.formReset("modifyPw");
      UiActions.hideModal();
    }
  }
  onIconActiveClick(iconIndex) {
    const { UiActions } = this.props;
    UiActions.setIconIndex(iconIndex);
    UiActions.hideMobileMenu();
  }

  handleLogout() {
    const { AuthActions } = this.props;
    AuthActions.authLogout();
    storage.remove("token");
  }

  handleHamburgerPress() {
    const { UiActions } = this.props;
    if (this.props.visible.mobileMenu) {
      UiActions.hideMobileMenu();
    } else {
      UiActions.showMobileMenu();
    }
  }

  render() {
    const { match } = this.props;
    const {
      handleSideMenu,
      showModal,
      hideModal,
      onIconActiveClick,
      handleLogout,
      handleHamburgerPress
    } = this;
    return (
      <div>
        {window.innerWidth < 767 ? (
          <MobileHamburger
            mobileVisible={this.props.visible.mobileMenu}
            toggleMenu={handleHamburgerPress}
          />
        ) : (
          undefined
        )}
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
          mobileVisible={this.props.visible.mobileMenu}
        />
        <div className="ceo-page-wrapper">
          <CeoHeader showModal={showModal} handleLogout={handleLogout} />
          <Route exact path={match.url} component={CeoHome} />
          <Switch>
            <Route
              exact
              path={`${match.url}/products`}
              component={CeoSellingProduct}
            />
            <Route
              path={`${match.url}/products/:id`}
              component={CeoProductModify}
            />
          </Switch>
          <Route path={`${match.url}/upload`} component={CeoProductUpload} />
          <Route path={`${match.url}/exchange`} component={ExchangeScreen} />
          <Route path={`${match.url}/mypage`} component={MyPageEnterScreen} />
          <Route
            path={`${match.url}/mypage_2`}
            component={MyPageModifyScreen}
          />
          <Route
            path={`${match.url}/mypage_3`}
            component={MyPageFinishScreen}
          />
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
      modal: state.ui.getIn(["visible", "modal"]),
      mobileMenu: state.ui.getIn(["visible", "mobileMenu"])
    },
    listIndex: state.ui.get("listIndex"),
    iconIndex: state.ui.get("iconIndex"),
    authInfo: state.auth.get("authInfo"),
    form: state.form.get("modifyPw"),
    valid: {
      modifyPw: state.auth.getIn(["valid", "modifyPw"])
    },
    status: {
      modifyPw: state.auth.getIn(["requests", "modifyPassword"])
    }
  }),
  dispatch => ({
    UiActions: bindActionCreators(uiDuck, dispatch),
    AuthActions: bindActionCreators(authDuck, dispatch),
    FormActions: bindActionCreators(formDuck, dispatch)
  })
)(CeoWrapper);
