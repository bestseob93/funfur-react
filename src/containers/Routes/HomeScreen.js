import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import storage from 'helpers/localForage.helper';

import * as authDuck from 'ducks/auth.duck';

class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        const { AuthActions } = this.props;
        AuthActions.authLogout();
        storage.remove('token');
        console.log('hi');
    }
    render() {
        const loginBtn = (
            <p>
                <Link className="btn btn-lg" to="/login" role="button">로그인</Link>
                <Link className="btn btn-lg" to="/register">회원가입</Link>
            </p>
        );

        const logoutBtn = (
            <p>
                <Link className="btn btn-lg" to="/" role="button" onClick={this.handleLogout}>로그아웃</Link>
            </p>           
        );

        return (
            <div className="carousel-inner" role="listbox">
                <div className="container funfur-wrapper">
                    <div className="funfur-description">
                        <h1>한국, 최초의 모바일 가구거리에<br/>
                            오신걸 환영합니다.<br/>
                        </h1>
                        <p>뻔뻐가구거리에 지금 바로 입주하시고 3개월간 무료로 상품등록 해보세요.</p>
                        { this.props.authenticated ? logoutBtn : loginBtn }
                    </div>
                    <div className="funfur-description youtube-wrapper">
                        <iframe src="https://www.youtube.com/embed/fNDzegpZdPg" frameBorder={0} allowFullScreen></iframe>
                    </div>
                </div>
                {/*<!-- Set background for slide in css -->*/}

            </div>
        );
    }
}

export default connect(
    state => ({
      authenticated: state.auth.get('authenticated')
    }),
    dispatch => ({
      AuthActions:  bindActionCreators(authDuck, dispatch)
    })
)(HomeScreen);