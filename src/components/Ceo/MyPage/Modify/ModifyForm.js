import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import {
    Spinner,
    SubTitle,
    FormLabel
} from 'components/Common';

var ReactToastr = require('react-toastr');
var { ToastContainer } = ReactToastr; // This is a React Element.
// For Non ES6...
// var ToastContainer = ReactToastr.ToastContainer;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

class ModifyForm extends Component {
    constructor(props) {
        super(props);

        this.addAlert = this.addAlert.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        
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
            formName: 'modify',
            name: ev.target.name,
            value: ev.target.value
        });
    }
    /* 회원 정보 수정 요청 */
    handleSubmit(ev) {
        const { MyPageActions, form } = this.props;
        ev.preventDefault();
    }

    render() {
        const {
            changeHandler,
            handleSubmit
        } = this;

        return (
            <div className="modify-form-container">
                {/* 스피너 */}
                { this.props.status.get('fetching') && (<Spinner/>) }
                {/* 토스트 컨테이너 */}
                <ToastContainer
                    ref={(toast) => { this.toastRef = toast }}
                    toastMessageFactory={ToastMessageFactory}
                    className={ document.documentElement.clientWidth < 768 ? 'toast-bottom-center' : 'toast-top-right' }
                />
                <SubTitle title="계정 정보" />
                <div className="row form-box">
                    <FormLabel name="비밀번호 수정" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="띄어쓰기 없이 영문자나 숫자 포함 4-20자"
                            required
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <div className="row form-box">
                    <FormLabel name="비밀번호 확인" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="password"
                            className="form-control"
                            name="repassword"
                            placeholder="위에서 입력한 비밀번호를 다시 한번 입력해주세요."
                            required
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <SubTitle title="개인 정보" />
                <div className="row form-box">
                    <FormLabel name="사장님 성함" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="ceoName"
                            value="배사장"
                            disabled
                        />
                    </div>
                </div>
                <div className="row form-box">
                    <FormLabel name="생년월일" />
                    <div className="col-md-2 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="birthYear"
                            value="1993년"
                            disabled
                        />
                    </div>
                    <div className="col-md-2 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="birthMonth"
                            value="3월"
                            disabled
                        />
                    </div>
                    <div className="col-md-2 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="birthDay"
                            value="30일"
                            disabled
                        />
                    </div>
                </div>
                <div className="row form-box has-helper">
                    <FormLabel name="휴대폰 번호" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="ceoCall"
                            placeholder="휴대폰 번호를 적어주세요.('-' 제외하고 숫자만 적어주세요.)"
                            required
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <div className="row">
                    <p className="input-helper">
                        *현재 사용하는 휴대폰 번호를 기입해 주세요.
                    </p>
                </div>
                <div className="row form-box">
                    <FormLabel name="이메일 주소" />
                    <div className="col-md-2 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="ceoEmail_1"
                            required
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="col-md-2 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="ceoEmail_2"
                            placeholder="gmail.com"
                            required
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="col-md-2 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <select className="form-control">
                            <option>직접 입력</option>
                        </select>
                    </div>
                </div>
                <SubTitle title="업체 정보" />
                <div className="row form-box">
                    <FormLabel name="업체명" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="ceoName"
                            value="배달의민족"
                            disabled
                        />
                    </div>
                </div>
                <div className="row form-box">
                    <FormLabel name="사업자 등록번호" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="cpId"
                            value="131313131"
                            disabled
                        />
                    </div>
                </div>
                <div className="row form-box">
                    <FormLabel name="사업장 주소" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="cpAddress"
                            value="서울특별시 강남구 신사동"
                            disabled
                        />
                    </div>
                </div>
                <div className="row form-box padding-top50">
                    <div className="btn-container">
                        <Link
                            to="/ceo"
                            className="btn btn-common btn-prev">취소
                        </Link>
                        <button
                            type="button"
                            className="btn btn-common btn-next"
                            onClick={handleSubmit}
                        >변경하기
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModifyForm;