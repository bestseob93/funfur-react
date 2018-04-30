import { computed, observable, action, autorun } from "mobx";

let authState = observable(
  {
    token: "",
    get getToken() {
      return this.token;
    },
    setToken(token) {
      this.token = token;
    },

    info: {ceoName: "", companyName: ""},
    get getInfo() {
      return this.token;
    },
    setInfo(info) {
      this.info = info;
    }
  },
  {
    getToken: computed,
    setToken: action,
    getInfo: computed,
    setInfo: action
  }
);

autorun(() => {
    console.log(authState.getToken);
    console.log(authState.getInfo);
})

export default authState;
