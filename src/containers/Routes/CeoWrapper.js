import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    CeoHome,
    CeoSellingProduct,
    CeoProductUpload,
    MyPage,
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

    // ceo 페이지 들어올 시 기존 header / footer 컨트롤
    handleUiAction(hide) {
        const { UiActions } = this.props;
        if(hide) {
            UiActions.hideHeaderFooter();
        } else {
            UiActions.showHeaderFooter();
        }
    }

    // 왼쪽 border 애니메이션 처리
    handleSideMenu(index) {
        const { UiActions } = this.props;
        UiActions.setListIndex(index);
    }

    render() {
        const { match } = this.props;
        const { handleSideMenu } = this;
        console.log(this.props);
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
                    <Route path={`${match.url}/upload`} component={CeoProductUpload}/>
                    <Route path={`${match.url}/mypage`} component={MyPage}/>
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