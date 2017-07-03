import React, { Component } from 'react';

function asyncRoute(getComponent) {
  return class AsyncComponent extends Component {
    static Component = null;
    mounted = false;

    state = {
      Component: AsyncComponent.Component
    };

    componentWillMount() {
      if ( this.state.Component === null ) {
        getComponent().then(m => m.default).then(Component => {
         AsyncComponent.Component = Component;
          if ( this.mounted ) {
            this.setState({Component});
          }
        })
      }
    }

    componentDidMount() {
      this.mounted = true;
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    render() {
      const {Component} = this.state;

      if ( Component !== null ) {
        return <Component {...this.props} />
      }
      return null; // or <div /> with a loading spinner, etc..
    }
  }
}

export const HomeScreen = asyncRoute(()=> import('./HomeScreen'));
export const NoMatchScreen = asyncRoute(()=> import('./NoMatchScreen'));
export const RegisterFormScreen = asyncRoute(()=> import('./RegisterFormScreen'));
export const RegisterIntroScreen = asyncRoute(()=> import('./RegisterIntroScreen'));
export const RegisterPolicyScreen = asyncRoute(()=> import('./RegisterPolicyScreen'));