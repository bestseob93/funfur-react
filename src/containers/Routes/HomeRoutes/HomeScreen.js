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

    componentDidMount() {
        const { AuthActions } = this.props;
        storage.get('token').then(async (value) => {
        try {
            await AuthActions.checkToken(value);
            // 로그인 되있으면 대쉬보드로 이동
            if(this.props.authenticated) {
                document.location = "/ceo";
            }
        } catch (e) {
            if(e) throw e;
        }
        }).catch(err => {
            if(err) throw err;
        });    
    }

    handleLogout() {
        const { AuthActions } = this.props;
        AuthActions.authLogout();
        storage.remove('token');
        console.log('hi');
    }
    render() {
        const loginBtn = (
            <div className="btn-container">
                <Link className="btn btn-common btn-prev" to="/login" role="button">로그인</Link>
                <Link className="btn btn-common btn-prev" to="/register">회원가입</Link>
            </div>
        );

        const logoutBtn = (
            <div className="btn-container">
                <Link className="btn btn-common btn-prev" to="/" role="button" onClick={this.handleLogout}>로그아웃</Link>
            </div>           
        );

        return (
            <div className="carousel-inner" role="listbox">
                <div className="funfur-wrapper">
                    <div className="funfur-description">
                        <h1>대한민국 최초의<br/>
                            모바일 가구거리<br/>
                        </h1>
                        <p>오프라인 스토어를 온라인으로!</p>
                        <p>뻔뻐로 사업을 확장하세요.</p>
                        { this.props.authenticated ? logoutBtn : loginBtn }
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