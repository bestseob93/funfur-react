import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ReactGA from "react-ga";

import "styles/style.css";
import { Header, Footer } from "components/Base";
import { SweetAlertComponent } from "components/Common";
import storage from "helpers/localForage.helper";
import {
  HomeScreen,
  ContactScreen,
  PolicyScreen,
  RegisterFormScreen,
  RegisterIntroScreen,
  RegisterPolicyScreen,
  RegisterPendingScreen,
  LoginScreen,
  NoMatchScreen,
  CeoWrapper
} from "./Routes";

import * as authDuck from "ducks/auth.duck";
import * as uiDuck from "ducks/ui.duck";
import * as productDuck from "ducks/product.duck";

class App extends Component {
  constructor(props, context) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
    this.handleProductDelete = this.handleProductDelete.bind(this);
    this.sendPageChange(props.location.pathname, props.location.search);
  }

  // TODO ceo 직접 접근할 시 예외 처리 , catch에 넣어서 일단은 해결
  componentDidMount() {
    const { AuthActions } = this.props;
    storage
      .get("token")
      .then(async value => {
        try {
          await AuthActions.checkToken(value);
        } catch (e) {
          //document.location="/";
          // pathname이 /ceo 로 시작하는지 검사.
          const pathNameRegx = /^\/ceo/g;

          // // 로그인 안되어 있는데, ceo 페이지 진입 시 홈으로 강제 이동
          if (
            !this.props.authenticated &&
            window.location.pathname.search(pathNameRegx) === 0
          ) {
            document.location = "/";
          }
        }
      })
      .catch(err => {
        if (err) throw err;
      });
  }

  componentWillReceiveProps(nextProps) {
    // https://github.com/react-ga/react-ga/issues/122
    if (
      this.props.location.pathname !== nextProps.location.pathname ||
      this.props.location.search !== nextProps.location.search
    ) {
      this.sendPageChange(
        nextProps.location.pathname,
        nextProps.location.search
      );
    }
  }

  sendPageChange(pathname, search = "") {
    const page = pathname + search;
    console.log("sendPageChange", page);
    ReactGA.set({ page });
    ReactGA.pageview(page);
  }

  handleLogout() {
    const { AuthActions } = this.props;
    AuthActions.authLogout();
    storage.remove("token");
    storage.remove("auth");
  }

  async handleProductDelete() {
    const { ProductActions } = this.props;
    const productId = window.location.pathname.split("/");

    try {
      await ProductActions.productRemove(productId[3]);
      if (this.props.valid) {
        this.props.UiActions.hideSweetAlert();
        document.location = "/ceo/products";
      }
    } catch (e) {
      if (e) throw e;
    }
  }

  render() {
    return (
      <div>
        {/* 관리자 페이지에서 다른 헤더 or 헤더 아예 없애고.. */}
        {this.props.visible.base ? (
          <Header
            authenticated={this.props.authenticated}
            handleLogout={this.handleLogout}
          />
        ) : null}
        {/* { this.props.visible.base ? (<div className="spacer">&nbsp;</div>) : null } */}
        <SweetAlertComponent
          showCancel={this.props.sweetAlert.get("showCancel")}
          alertType={this.props.sweetAlert.get("alertType")}
          isAlertShow={this.props.sweetAlert.get("isAlertShow")}
          alertTitle={this.props.sweetAlert.get("alertTitle")}
          alertMessage={this.props.sweetAlert.get("alertMessage")}
          confirmText={this.props.sweetAlert.get("confirmText")}
          hideAlert={this.props.UiActions.hideSweetAlert}
          onDelete={this.handleProductDelete}
        />
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/policy" component={PolicyScreen} />
          <Route path="/register" component={RegisterIntroScreen} />
          <Route path="/register_2" component={RegisterPolicyScreen} />
          <Route path="/register_3" component={RegisterFormScreen} />
          <Route path="/register_4" component={RegisterPendingScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/contact" component={ContactScreen} />
          <Route path="/ceo" component={CeoWrapper} />
          <Route component={NoMatchScreen} />
        </Switch>
        {this.props.visible.base ? <Footer /> : undefined}
      </div>
    );
  }
}

export default connect(
  state => ({
    visible: {
      base: state.ui.getIn(["visible", "base"]),
      dashboard: state.ui.getIn(["visible", "dashboard"])
    },
    valid: state.product.getIn(["valid", "remove"]),
    authenticated: state.auth.get("authenticated"),
    sweetAlert: state.ui.get("sweetAlert")
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authDuck, dispatch),
    UiActions: bindActionCreators(uiDuck, dispatch),
    ProductActions: bindActionCreators(productDuck, dispatch)
  })
)(App);
