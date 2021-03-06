import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import LocalForage from "localforage";
import store from "store";

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
    this.state = {
      info: {
        ceoName: "",
        companyName: ""
      }
    };

    this.handleUiAction = this.handleUiAction.bind(this);
    this.handleSideMenu = this.handleSideMenu.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.onIconActiveClick = this.onIconActiveClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleHamburgerPress = this.handleHamburgerPress.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.location.key !== nextProps.location.key;
  }

  checkAndSetToken = (LocalForage, AuthActions) => {
    LocalForage.getItem("token").then(value => {
      // const { AuthActions } = this.props;

      AuthActions.checkToken(value)
        .then(res => {
          if (res.status === 401 || res.status === 404) {
            // LocalForage.clear().then(() => AuthActions.authLogout());
            // setTimeout(() => (document.location = "/"), 2000);
            throw new Error("not authorized");
          }
          LocalForage.getItem("auth")
            .then(value => {
              AuthActions.setProfile(value);
            })
            .catch(e => {
              if (e) throw e;
            });
        })
        .catch(e => {
          window.bugsnagClient.notify(new Error("제품 업로드 에러 - 토큰"), {
            severity: "error",
            user: window.bugsnagClient.user,
            context: "Ceo Wrapper checkToken 오류",
            strageValue: value,
            error: e,
            storage: storage
          });

          setTimeout(() => {
            document.location = "/";
            this.props.history.push("/");
          }, 100);
        });
    });

    // TODO. 리프레쉬 해도 localforage에 있는 프로필 가져오기.

    const auth = this.props.authInfo.toJS();
    window.bugsnagClient.user = {
      name: auth.ceoName,
      companyName: auth.companyName,
      id: window.userID
    };
  };

  checkTokenStore = () => {
    const token = store.get("token");
    this.props.AuthActions.checkToken(token)
      .then(res => {
        if (res.value.status !== 200) {
          throw new Error("not valid");
        }
      })
      .catch(e => {
        this.props.history.push("/login");

        store.clearAll();
        this.props.UiActions.showSweetAlert({
          message: "세션이 만료되었습니다. 재로그인 해주세요.",
          alertTitle: "",
          value: "warning"
        });
      });
  };

  componentDidMount() {
    this.handleUiAction(true); // ceo 페이지 마운트 시 기존 헤더 / 푸터 하이드
    this.checkTokenStore();

    const info = store.get("info");
    this.setState({ info });
  }

  componentDidUpdate() {
    this.checkTokenStore();
    const info = store.get("info");
    this.setState({ info });
  }

  componentWillMount() {
    this.checkTokenStore();    
    const info = store.get("info");
    this.setState({ info });
  }

  componentWillUnmount() {
    this.handleUiAction(false); // ceo 페이지 언마운트 시 기존 헤더 / 푸터 쇼
    store.clearAll();
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
          authInfo={this.state.info}
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
