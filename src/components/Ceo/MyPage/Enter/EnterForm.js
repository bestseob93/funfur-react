import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'components/Common';

var ReactToastr = require('react-toastr');
var { ToastContainer } = ReactToastr; // This is a React Element.
// For Non ES6...
// var ToastContainer = ReactToastr.ToastContainer;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

class EnterForm extends Component {
    constructor(props) {
        super(props);

        this.addAlert = this.addAlert.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /* toast 창띄우기 */
    addAlert(types, msg) {  /* enum of types: ['warning', 'success', 'error', 'info'],  msg: String */
        switch(types) {
            case 'warning':
                return this.toastRefs.warning(`${msg}`);
            case 'success':
                return this.toastRefs.success(`${msg}`);
            case 'error':
                return this.toastRefs.error(`${msg}`);
            default:
                break;
        }
    }

    /* input 값에 따라 redux에 form store 값 업데이트 */
    changeHandler(ev) {
        const { FormActions } = this.props;
        FormActions.formChange({
            formName: 'myPageEnter',
            name: ev.target.name,
            value: ev.target.value
        });
    }

    /* 비밀번호 확인 요청 */
    async handleSubmit(ev) {
        const { MyPageActions, form } = this.props;
        ev.preventDefault();

        let password = form.get('password');

        if(password === '') {
            this.addAlert('error', '비밀번호를 입력해주세요!');
        } else {
            try {
                await MyPageActions.checkPassword(password);
                console.log(this.props.confirmed);
                if(this.props.confirmed) {
                    this.props.history.push('/ceo/mypage_2');
                }
            } catch (e) {
                this.addAlert('error', '비밀번호가 맞지 않습니다!');
            }
        }
    }

    render() {
        const {
            changeHandler,
            handleSubmit
        } = this;

        return (
            <div className="enter-form">
                {/* 스피너 */}
                { this.props.status.get('fetching') && (<Spinner/>) }
                {/* 토스트 컨테이너 */}
                <ToastContainer
                    ref={(toast) => { this.toastRefs = toast }}
                    toastMessageFactory={ToastMessageFactory}
                    className={ document.documentElement.clientWidth < 768 ? 'toast-bottom-center' : 'toast-top-right' }
                />
                <div className="row">
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="비밀번호 입력"
                            required
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                 <div className="row form-box">
                    <div className="btn-container">
                        <Link
                            to="/ceo"
                            className="btn btn-common btn-prev">뒤로가기
                        </Link>
                        <button
                            type="button"
                            className="btn btn-common btn-next"
                            onClick={handleSubmit}
                        >확인
                        </button>
                    </div>
                </div>
            </div>
        );
    }

}

export default EnterForm;