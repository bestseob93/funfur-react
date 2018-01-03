import React from "react";
import { mount, shallow } from "enzyme";
import ConnectedHomeScreen, { HomeScreen } from "containers/Routes/HomeRoutes/HomeScreen";
import configureStore from 'redux-mock-store'

describe("HomeScreen", () => {
  let props, store;
  let mountedHomeScreen, connectedHomeScreen;

  const initialState = { authenticated : false }
  const mockStore = configureStore();

  const homeScreen = () => {
    if (!mountedHomeScreen) {
      mountedHomeScreen = shallow(
        <HomeScreen store={store} {...props} />
      );
    }
    return mountedHomeScreen;
  }

  beforeEach(() => {
    store = mockStore(initialState);
    connectedHomeScreen = shallow(
      <ConnectedHomeScreen store={store} /> 
    ); 

    props = {
      authenticated: undefined,
      AuthActions: undefined
    };
    mountedHomeScreen = undefined;
  });

  // 모든 테스트들은 여기에 쓰여질 것입니다.
  it("always renders a div", () => {
    const divs = homeScreen().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it('authenticated matches with initialState', () => {
    expect(connectedHomeScreen().prop('authenticated')).toEqual(initialState.authenticated)
  });
  

});