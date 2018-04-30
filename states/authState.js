import { observable, action,  } from "mobx-react";
import { computed } from "mobx";

class AuthState {
  @observable token = "";
  @computed
  get getToken() {
      return this.token;
  }
  @action.bind
  setToken(token) {
      this.token = token;
  }
}

export default AuthState;