import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    CeoHome,
    CeoSellingProduct
} from './CeoRoutes';

import {
    CeoHeader,
    SideBar,
} from 'components/Base';

import * as uiDuck from 'ducks/ui.duck';

class CeoWrapper extends Component {
    constructor(props) {
        super(props);

        this.handleUiAction = this.handleUiAction.bind(this);
        this.handleSideMenu = this.handleSideMenu.bind(this);
    }

    componentDidMount() {
        this.handleUiAction(true); // ceo 페이지 마운트 시 기존 헤더 / 푸터 하이드
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps.visible;
    // }

    componentWillUnmount() {
        this.handleUiAction(false); // ceo 페이지 언마운트 시 기존 헤더 / 푸터 쇼
    }

    handleUiAction(hide) {
        const { UiActions } = this.props;
        if(hide) {
            UiActions.hideHeaderFooter();
        } else {
            UiActions.showHeaderFooter();
        }
    }

    handleSideMenu(index) {
        const { UiActions } = this.props;
        UiActions.setListIndex(index);
    }

    render() {
        const { match } = this.props;
        const { handleSideMenu } = this;
        return (
            <div>
                <SideBar
                    onClick={handleSideMenu}
                    listIndex={this.props.listIndex}
                />
                <div className="ceo-page-wrapper">
                    <CeoHeader/>
                    <Route exact path={match.url} component={CeoHome}/>
                    <Route path={`${match.url}/products`} component={CeoSellingProduct}/>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        visible: state.ui.getIn(['visible', 'base']),
        listIndex: state.ui.get('listIndex')
    }),
    dispatch => ({
        UiActions: bindActionCreators(uiDuck, dispatch)
    })
)(CeoWrapper);