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

    async componentDidMount() {
        const { MyPageActions } = this.props;
        if(this.props.confirmed) {
            try {
                MyPageActions.getMyInfo();
            } catch (e) {
                if(e) throw e;
            }
        } else {
            this.props.history.push('/ceo/mypage'); // TODO 새로 고침 문제 해결 필요.
        }

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
    async handleSubmit(ev) {
        const { MyPageActions, form } = this.props;
        ev.preventDefault();

        const ceoInfo = {
            ceoCall: form.get('ceoCall'),
            ceoEmail: form.get('ceoEmail_1') + '@' + form.get('ceoEmail_2')
        };

        if(ceoInfo.ceoCall === '' || ceoInfo.ceoEmaill === '') {
            this.addAlert('warning', '전화번호나 이메일을 입력해주세요. 변경하지 않으시려면 취소를 눌러주세요!');
        } else {
            try {
                await MyPageActions.modifyCeo(ceoInfo);
                console.log(this.props.valid);
                if(this.props.valid) {
                    console.log(this.props.history);
                    this.props.history.push('/ceo/mypage_3');
                }
            } catch (e) {
                if(e) throw e;
                this.addAlert('error', '에러가 발생했습니다. 관리자에게 문의해주세요.');
            }
        }
    }

    render() {
        const {
            changeHandler,
            handleSubmit
        } = this;

        const emptyComponent = undefined;
        console.log(this.props);
        return (
            <div className="modify-form-container">
                {/* 스피너 */}
                 { this.props.status.myInfo.get('fetching') || this.props.status.modify.get('fetching') ? (<Spinner/>)  : emptyComponent } 
                {/* 토스트 컨테이너 */}
                <ToastContainer
                    ref={(toast) => { this.toastRef = toast }}
                    toastMessageFactory={ToastMessageFactory}
                    className={ document.documentElement.clientWidth < 768 ? 'toast-bottom-center' : 'toast-top-right' }
                />
                <SubTitle title="개인 정보" />
                <div className="row form-box">
                    <FormLabel name="사장님 성함" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="ceoName"
                            value={this.props.profile.get('ceoName')}
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
                            placeholder={this.props.profile.get('ceoCall')}
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
                            placeholder={this.props.profile.get('ceoEmail').split('@')[0]}
                            required
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="col-md-2 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="ceoEmail_2"
                            placeholder={this.props.profile.get('ceoEmail').split('@')[1]}
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
                            name="cpName"
                            value={this.props.profile.get('cpName')}
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
                            name="businessId"
                            value={this.props.profile.get('businessId')}
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
                            value={this.props.profile.get('cpAddress')}
                            disabled
                        />
                    </div>
                </div>
                <div className="row form-box">
                    <FormLabel name="사업장 전화번호" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="cpAddress"
                            value={this.props.profile.get('cpCall')}
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