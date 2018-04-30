import React, { Component } from "react";
import { Provider } from "mobx-react";
import App from "./App";
import authState from "../states/authState";

class MobxWrapper extends Component {
  render() {
    return (
      <Provider store={authState}>
        <App {...this.props}/>
      </Provider>
    );
  }
}

export default MobxWrapper;