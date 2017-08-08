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

export const CeoSellingProduct = asyncRoute(()=> import('./ProductRoutes/CeoSellingProduct'));
export const CeoProductUpload = asyncRoute(()=> import('./ProductRoutes/CeoProductUpload'));
export const CeoProductModify = asyncRoute(()=> import('./ProductRoutes/CeoProductModify'));
export const CeoHome = asyncRoute(()=> import('./CeoHome'));
export const MyPageEnterScreen = asyncRoute(()=> import('./MyPageRoutes/MyPageEnterScreen'));
export const MyPageModifyScreen = asyncRoute(()=> import('./MyPageRoutes/MyPageModifyScreen'));
export const MyPageFinishScreen = asyncRoute(()=> import('./MyPageRoutes/MyPageFinishScreen'));
export const ConsumerScreen = asyncRoute(()=> import('./ConsumerScreen'));