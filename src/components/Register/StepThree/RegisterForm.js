import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';

import {
    Spinner,
    SubTitle,
    FormLabel
} from 'components/Common';

import { checkBizID } from 'helpers/checkBizId';

var ReactToastr = require('react-toastr');
var { ToastContainer } = ReactToastr; // This is a React Element.
// For Non ES6...
// var ToastContainer = ReactToastr.ToastContainer;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.addAlert = this.addAlert.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.execDaumPostCode = this.execDaumPostCode.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.onOpenClick = this.onOpenClick.bind(this);
        this.chkBusinessIdSubmit = this.chkBusinessIdSubmit.bind(this);
        this.chkUserIdSubmit = this.chkUserIdSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { FormActions } = this.props;
        FormActions.formReset('register');
        try {
            this.daum = global.daum;  // 글로벌 변수를 this.daum에 담음.
        } catch (e) {
            alert("Daum 주소 스크립트 로드 에러");
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

        if(ev.target.name === 'businessId' || ev.target.name === 'ceoCall' || ev.target.name === 'postCode' || ev.target.name === 'cpCall') {
            FormActions.formChange({
                formName: 'register',
                name: ev.target.name,
                value: ev.target.value.replace(/-/g, "")
            });
        } else {
            FormActions.formChange({
                formName: 'register',
                name: ev.target.name,
                value: ev.target.value
            });
        }
    }

    /* react-dropzone을 이용하여 redux의 form 업데이트 */
    handleFile(files) {
        console.log(files);
        const { FormActions } = this.props;
        FormActions.formChange({
            formName: 'register',
            name: 'businessIdImage',
            value: files
        });
    }

    /* 다음 주소 api 검색 */
    execDaumPostCode() {
        let self = this;

        this.daum.postcode.load(function() {
            var Postcode = new self.daum.Postcode({
                oncomplete: function oncomplete(data) {
                    self.handleAddress(data);
                },
                onresize: function onresize(size) {
                    self.postWrap.style.width = size.width;
                    self.postWrap.style.height = size.height;
                },
                width: '100%',
                height: '500px'
            });

            Postcode.embed(self.postWrap);
        });
    }

    /* onComplete시 실행, 우편번호와 앞주소 redux form 업데이트 */
     handleAddress(data) {
         const { FormActions } = this.props;
         let fullAddress = data.address;
         let extraAddress = ''; 
        
         if (data.addressType === 'R') {
             if (data.bname !== '') {
                 extraAddress += data.bname;
             }
             if (data.buildingName !== '') {
                 extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
             }
             fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
         }

        this.postCodeInput.value = data.postcode1 + data.postcode2;
        this.addressInput.value = fullAddress; // address input에 전체 주소 입력.
        FormActions.formChange({  // 업데이트 부분
            formName: 'register',
            name: 'postCode',
            value: data.postcode1 + data.postcode2
        });
        FormActions.formChange({  // 상동
            formName: 'register',
            name: 'cpAddress_1',
            value: fullAddress
        });
    }

    /* 이미지 업로드 부분 클릭 으로 사진 첨부 (드래그로도 가능) */
    onOpenClick() {
        this.dropzone.open();
    }

    /* businessId 인증 및 중복 확인 */
    chkBusinessIdSubmit() {
        const { AuthActions, form } = this.props;
        let self = this;
        checkBizID(form.get('businessId')).then(async (checked) => {
            console.log(checked);
            if(checked) {
                try {
                    await AuthActions.checkCompanyRegistration(form.get('businessId'));
                    console.log(self.props.valid.bizId);
                    if(self.props.valid.bizId) {
                        this.addAlert('success', '인증되었습니다!');
                    }
                } catch (e) {
                    const { message } = e.response.data;
                    this.addAlert('error', message);
                }
            } else {
                console.log('hi');
                this.addAlert('warning', '사업자 등록번호를 확인해주세요.');
            }
        }).catch(err => {
            if(err) {
                this.addAlert('warning', '사업자 등록번호를 확인해주세요.');
            }
        });
    }

    /* userId 중복 확인 */
    async chkUserIdSubmit() {
        const { AuthActions, form } = this.props;

        // 유저네임 정규표현식 확인
        const usernameRegex = /^[0-9a-z_]{4,20}$/;
        
        if(usernameRegex.test(form.get('userId'))) {
            try {
                await AuthActions.checkUserId(form.get('userId'));
                if(this.props.valid.userId) {
                    this.addAlert('success', '인증되었습니다!');
                }
            } catch (e) {
                const { message } = e.response.data;
                this.addAlert('error', message);
            }
        } else {
            this.addAlert('warning', '영문자나 숫자 4-20자 확인해주세요!');
        }
    }

    /* 회원가입 요청 */
    async handleSubmit(ev) {
        const { AuthActions, form } = this.props;
        ev.preventDefault(); // 클릭 외의 브라우저 행동 막음

        console.log(form.get('cpName'));
        let formInfos = form.toJS();
        const pwRegex = /^[a-zA-Z0-9]{4,20}$/; // 비밀번호 정규표현식
        const chkNum = formInfos.password.search(/[0-9]/g); // 숫자 확인
        const chkEng = formInfos.password.search(/[a-z]/ig); // 영어 확인

        if(!pwRegex.test(formInfos.password)) {
            this.addAlert('warning', '영문자와 숫자를 포함한 4-20자인지 확인해주세요!');
        } else if(chkNum < 0 || chkEng < 0) {
            this.addAlert('warning', '비밀번호는 영문과 숫자를 혼합해야 합니다.');
        } else if(formInfos.password !== formInfos.repassword) {
            this.addAlert('warning', '비밀번호 확인과 비밀번호가 일치하지 않습니다.');
        } else if(!this.props.valid.bizId) {
            this.addAlert('error', '사업자 등록번호를 인증해주세요!');
        } else if(!this.props.valid.userId) {
            this.addAlert('error', '아이디 중복확인을 해주세요!');
        } else if(formInfos.businessIdImage.length < 1) {
            this.addAlert('error', '사업자 등록증 사진을 첨부해주세요!');
        } else {
                    
        let ceoInfo = {
            cpName: form.get('cpName'),
            businessId: form.get('businessId'),
            businessIdImage: form.get('businessIdImage'),
            postCode: form.get('postCode'),
            cpAddress: form.get('cpAddress_1') + form.get('cpAddress_2'),
            cpCall: form.get('cpCall'),
            ceoName: form.get('ceoName'),
            ceoCall: form.get('ceoCall'),
            ceoEmail: form.get('ceoEmail_1') + "@" + form.get('ceoEmail_2'),
            userId: form.get('userId'),
            password: form.get('password')
        };

            try {
                await AuthActions.registerCeo(ceoInfo);
                this.submitBtn.classList.add('disabled');
                if(this.props.status.isSuccess) {
                    if(this.submitBtn.classList.contains('disabled')) {
                        this.submitBtn.classList.remove('disabled');
                    }
                // router 이동
                this.props.router.history.push('/register_4');
                }
            } catch (e) {
                if(e.response) {
                    const { message } = e.response.data;
                    this.addAlert('error', message);
                }
            }
        }
    }

    render() {
        const { 
            changeHandler,
            handleFile,
            execDaumPostCode,
            onOpenClick,
            chkBusinessIdSubmit,
            chkUserIdSubmit,
            handleSubmit
        } = this;
        const { form } = this.props;
        console.log(form.get('businessIdImage'));
        /* 리덕스 form register에서 가져옴 */
        /* TODO: get으로 변경 */
        // let formValues = form.toJS();
        return (
            <div className="register-form-container">
                {/* 스피너 */}
                { this.props.status.register.get('fetching') && (<Spinner/>) }
                {/* 토스트 컨테이너 */}
                <ToastContainer
                    ref={(toast) => {this.toastRef = toast}}
                    toastMessageFactory={ToastMessageFactory}
                    className={document.documentElement.clientWidth < 768 ? 'toast-bottom-center' : 'toast-top-right'}
                />
                {/* 가구업체 입력 폼 */}
                <SubTitle title={"업체 정보 입력"} />
                <div className="row form-box">
                    <FormLabel name="업체명" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="cpName"
                            placeholder="업체명을 적어주세요."
                            required
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <div className="row form-box">
                    <FormLabel name="사업자 등록번호" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input 
                            type="tel"
                            className="form-control"
                            name="businessId"
                            value={form.get('businessId')}
                            placeholder="사업자 등록번호를 적어주세요.( '-' 제외하고 숫자만 적어주세요.)"
                            required
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="col-md-2 col-md-offset-0 col-xs-10 col-xs-offset-1">
                        <button
                            type="button"
                            className="funfur-btn btn"
                            disabled={form.get('businessId').length > 0 ? false : true}
                            onClick={chkBusinessIdSubmit}>중복 확인
                        </button>
                    </div>
                </div>
                <div className="row form-box">
                    <FormLabel name="사업자 등록증" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        { form.get('businessIdImage').size > 0 ?  <div className="dropzone-hidden">
                                                            <Dropzone
                                                                    ref={(node) => { this.dropzone = node; }}
                                                                    onDrop={handleFile}
                                                                    accept="image/jpeg, image/png"
                                                                    multiple={false}>
                                                            </Dropzone>
                                                        </div> :
                                                        <div className="business-id-image text-center">
                                                            <Dropzone
                                                                    ref={(node) => { this.dropzone = node;}}
                                                                    onDrop={handleFile}
                                                                    accept="image/jpeg, image/png"
                                                                    multiple={false}>
                                                                    <p>사업자 등록증 사진을 첨부해주세요.</p>
                                                            </Dropzone>
                                                        </div>}
                        { form.get('businessIdImage').size > 0 ?  <div className="business-id-image flex-column">
                                                            <span onClick={onOpenClick} className="id-image-after">사진 바꾸기</span>
                                                                <div>{form.get('businessIdImage').map((file) => <img
                                                                                                        className="id-image-after"
                                                                                                        key={file.name}
                                                                                                        src={file.preview}
                                                                                                        alt={file.name}
                                                                                                        onClick={onOpenClick}
                                                                                                    />)}
                                                                </div>
                                                        </div> : undefined }
                    </div>
                </div>
                <div className="row form-box">
                    <FormLabel name="사업자 주소" />
                    <div className="col-md-2 col-xs-5 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="tel"
                            ref={(input) => {this.postCodeInput = input}}
                            className="form-control"
                            name="postCode"
                            placeholder="우편번호"
                            value={form.get('postCode')}
                            required
                            onChange={changeHandler}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn funfur-btn"
                        onClick={execDaumPostCode}>우편번호 검색
                    </button>
                </div>
                <div className="row form-box">
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-3">
                        <input
                            type="text"
                            ref={(input) => {this.addressInput = input}}
                            className="form-control"
                            name="cpAddress_1"
                            placeholder="주소"
                            required
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <div className="row form-box">
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-3">
                        <input
                            type="text"
                            className="form-control"
                            name="cpAddress_2"
                            placeholder="나머지 주소"
                            required
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <div className="row form-box">
                     <div
                        ref={(post) => { this.postWrap = post }}
                        className="col-md-offset-3 col-md-6 col-xs-10 col-xs-offset-1">
                    </div>
                </div>
                <div className="row form-box">
                    <FormLabel name="사업장 연락처" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="tel"
                            className="form-control"
                            name="cpCall"
                            value={form.get('cpCall')}
                            placeholder="사업장 연락처를 적어주세요.('-' 제외하고 숫자만 적어주세요.)"
                            required
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                {/* 사장님 개인 정보 입력 폼 */}
                <SubTitle title={"개인 정보입력"} />
                <div className="row form-box">
                    <FormLabel name="사장님 성함" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="ceoName"
                            placeholder="성함을 적어주세요."
                            required
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <div className="row form-box">
                    <FormLabel name="휴대폰 번호" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="tel"
                            className="form-control"
                            name="ceoCall"
                            value={form.get('ceoCall')}
                            placeholder="현재 사용 중인 휴대폰 번호를 적어주세요.('-' 제외하고 숫자만 적어주세요.)"
                            required
                            onChange={changeHandler}
                        />
                    </div>
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
                <div className="row">
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-3" style={{color: '#4990e2', fontSize: '12px'}}>
                        실제 사용하는 이메일을 기입해 주세요. 승인 요청 처리 결과가 이메일로 전송됩니다.
                    </div>
                </div>
                {/*계정 정보 입력*/}
                <SubTitle title={"계정 정보입력"} />
                <div className="row form-box">
                    <FormLabel name="아이디" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="userId"
                            placeholder="띄어쓰기 없이 영문자나 숫자 4-20자"
                            required
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="col-md-2 col-md-offset-0 col-xs-10 col-xs-offset-1">
                        <button
                            type="button"
                            className="btn funfur-btn"
                            onClick={chkUserIdSubmit}
                            disabled={ form.get('userId').length > 0 ? false : true }
                        >중복 확인
                        </button>
                    </div>
                </div>
                <div className="row form-box">
                    <FormLabel name="비밀번호 입력" />
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
                <div className="row form-box padding-top50">
                    <div className="btn-container">
                        <button
                            type="button"
                            className="btn btn-common btn-next register-two"
                            onClick={handleSubmit}
                            ref={(btn) => { this.submitBtn = btn }}>승인 요청하기
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterForm;