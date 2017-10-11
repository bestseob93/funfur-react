import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'components/Common';
import storage from 'helpers/localForage.helper';

var ReactToastr = require('react-toastr');
var { ToastContainer } = ReactToastr; // This is a React Element.
// For Non ES6...
// var ToastContainer = ReactToastr.ToastContainer;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.addAlert = this.addAlert.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.handleEnterPress = this.handleEnterPress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleToastOff = this.handleToastOff.bind(this);
    }

    /* toast 창띄우기 */
    addAlert(types, msg) {  /* enum of types: ['warning', 'success', 'error', 'info'],  msg: String */
        switch(types) {
            case 'warning':
                return this.toastRef.warning(`${msg}`);
            case 'success':
                return this.toastRef.success(`${msg}`);
            case 'error':
                return this.toastRef.error(`${msg}`);
            default:
                break;
        }
    }

    /* input 값에 따라 redux에 form store 값 업데이트 */
    changeHandler(ev) {
        const { FormActions } = this.props;
        
        FormActions.formChange({
            formName: 'login',
            name: ev.target.name,
            value: ev.target.value
        });
    }

    handleEnterPress(ev) {
        const { handleSubmit } = this;
        if(ev.charCode === 13) {
            handleSubmit(ev);
        }
    }

    /* 로그인 요청 */
    async handleSubmit(ev) {
        const { AuthActions, form } = this.props;
        ev.preventDefault();

        if(form.get('userId') === '' || typeof form.get('userId') !== 'string') {
            this.addAlert('warning', '아이디를 입력해주세요!');
            this.idInput.focus();
        } else if(form.get('password') === '' || typeof form.get('password') !== 'string') {
            this.addAlert('warning', '비밀번호를 입력해주세요!');
            this.pwInput.focus();
        } else {
            try {
                await AuthActions.loginCeo(form.get('userId'), form.get('password'));
                if(this.props.valid.login) {
                    storage.set('token', this.props.status.token);
                    this.props.router.history.push('/ceo');
                }
            } catch (e) {
                if(e) {
                    this.addAlert('error', '아이디나 패스워드를 확인해주세요!');
                }
            }
        }
    }

    // 토스트 창 껐을 때 인풋 포커스
    handleToastOff() {
        const { form } = this.props;
        let userId = form.get('userId');
        let pw = form.get('password');

        if(userId === '' || typeof userId !== 'string') {
            this.idInput.focus();
        } else if(pw === '' || typeof pw !== 'string') {
            this.pwInput.focus();
        } else {
            this.idInput.focus();
        }
    }

    render() {
        const {
            changeHandler,
            handleEnterPress,
            handleSubmit,
            handleToastOff
        } = this;

        return (
            <div className="login-form">
                {/* 스피너 */}
                { this.props.status.login.get('fetching') && (<Spinner />) }
                {/* 토스트 컨테이너 */}
                <ToastContainer
                    ref={(toast) => { this.toastRef = toast }}
                    toastMessageFactory={ToastMessageFactory}
                    className={ document.documentElement.clientWidth < 768 ? 'toast-bottom-center' : 'toast-top-right' }
                    onClick={handleToastOff}
                />
                <Link to="/"><h1 className="funfur-color bm-dohyeon" style={{marginBottom: '20px'}}>뻔뻐</h1></Link>
                <div className="form-group">
                    <input
                        ref={(input) => { this.idInput = input }}
                        type="text"
                        className="form-control login-input"
                        name="userId"
                        placeholder="아이디"
                        required
                        onChange={changeHandler}
                    />
                </div>
                <div className="form-group">
                    <input
                        ref={(input) => { this.pwInput = input }}
                        type="password"
                        className="form-control login-input"
                        name="password"
                        placeholder="비밀번호"
                        required
                        onChange={changeHandler}
                        onKeyPress={handleEnterPress}
                    />
                </div>
                <button
                    type="button"
                    className="ns-EB btn funfur-btn width100"
                    onClick={handleSubmit}
                >로그인
                </button>
                <div className="find-wrapper">
                    <Link to="/findAuth" className="blue-text">아이디/패스워드 찾기</Link>
                    <p>뻔뻐에 아직 입주 안했나요?</p>
                </div>
                <Link
                    to="/register"
                    className="btn btn-prev btn-common width100"
                    style={{ margin: 0 }}>회원가입
                </Link>
            </div>
        );
    }
}

export default LoginForm;