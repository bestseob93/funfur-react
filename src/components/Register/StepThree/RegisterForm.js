import React, { Component } from 'react';

import Dropzone from 'react-dropzone';

import FormLabel from './FormLabel';
import SubTitle from './SubTitle';

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
                return this.refs.container.warning(`${msg}`);
            case 'success':
                return this.refs.container.success(`${msg}`);
            case 'error':
                return this.refs.container.error(`${msg}`);
            default:
                break;
        }
    }

    /* input 값에 따라 redux에 form store 값 업데이트 */
    changeHandler(ev) {
        const { FormActions } = this.props;
        
        FormActions.formChange({
            formName: 'register',
            name: ev.target.name,
            value: ev.target.value
        });
    }

    /* react-dropzone을 이용하여 redux의 form 업데이트 */
    handleFile(files) {
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

        this.daum.postcode.load(() => {
            const Postcode = new this.daum.Postcode({
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

            Postcode.embed(this.postWrap);
        });
    }

    /* onComplete시 실행, 우편번호와 앞주소 redux form 업데이트 */
     handleAddress = (data) => {
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

    onOpenClick() {
        this.dropzone.open();
    }

    /* businessId 인증 및 중복 확인 */
    chkBusinessIdSubmit() {
        const { AuthActions, form } = this.props;
        let businessId = form.get('businessId');
        checkBizID(businessId).then(async (checked) => {
            if(checked) {
                try {
                    await AuthActions.checkCompanyRegistration(businessId);
                } catch (e) {
                    console.error(e);
                }
            } else {
                this.addAlert('warning', '사업자 등록번호를 확인해주세요.');
            }
        });
    }

    /* userId 중복 확인 */
    chkUserIdSubmit() {
        const { AuthActions, form } = this.props;
        let userId = form.get('userId');
        console.log(userId);
        AuthActions.checkUserId(userId);
    }

    handleSubmit = async () => {
        const { AuthActions, form } = this.props;

        console.log(form.toJS());
        try {
            await AuthActions.registerSubmit();
        } catch (e) {
            
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

        /* 리덕스 form register에서 가져옴 */
        let formValues = form.toJS();

        return (
            <div className="register-form-container">
                <ToastContainer ref="container"
                toastMessageFactory={ToastMessageFactory}
                className="toast-top-right"/>
                {/* 가구업체 입력 폼 */}
                <SubTitle title={"가구업체 정보입력"}/>
                <div className="row form-box">
                    <FormLabel name="업체명"/>
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input type="text"
                               className="form-control"
                               name="cpName"
                               placeholder="업체명을 적어주세요."
                               required
                               onChange={changeHandler}/>
                    </div>
                </div>
                <div className="row form-box">
                    <FormLabel name="사업자 등록번호"/>
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input type="text"
                               className="form-control"
                               name="businessId"
                               placeholder="사업자 등록번호를 적어주세요.( '-' 제외하고 숫자만 적어주세요.)"
                               required
                               onChange={changeHandler}/>
                    </div>
                    <div className="col-md-2 col-md-offset-0 col-xs-10 col-xs-offset-1">
                        <button type="button" className="btn btn-primary" onClick={chkBusinessIdSubmit}>중복 확인</button>
                    </div>
                </div>
                <div className="row form-box">
                    <FormLabel name="사업자 등록증"/>
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        { formValues.businessIdImage.length > 0 ?  <div className="dropzone-hidden">
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
                        { formValues.businessIdImage.length > 0 ?  <div className="business-id-image flex-column">
                                                            <span onClick={onOpenClick} className="id-image-after">사진 바꾸기</span>
                                                                <div>{formValues.businessIdImage.map((file) => <img
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
                    <FormLabel name="사업자 주소"/>
                    <div className="col-md-2 col-xs-5 col-xs-offset-1 col-md-offset-0">
                        <input type="text"
                               ref={(input) => {this.postCodeInput = input}}
                               className="form-control"
                               name="postCode"
                               placeholder="우편번호"
                               required
                               onChange={changeHandler}/>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={execDaumPostCode}>우편번호 검색</button>
                </div>
                <div className="row form-box">
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-2">
                        <input type="text"
                               ref={(input) => {this.addressInput = input}}
                               className="form-control"
                               name="cpAddress_1"
                               placeholder="주소"
                               required
                               onChange={changeHandler}/>
                    </div>
                </div>
                <div className="row form-box">
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-2">
                        <input type="text"
                               className="form-control"
                               name="cpAddress_2"
                               placeholder="나머지 주소"
                               required
                               onChange={changeHandler}/>
                    </div>
                </div>
                <div className="row form-box">
                     <div ref={(post) => { this.postWrap = post }} className="col-md-offset-2 col-md-6 col-xs-10 col-xs-offset-1"></div>
                </div>
                <div className="row form-box">
                    <FormLabel name="사업장 연락처"/>
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input type="text"
                               className="form-control"
                               name="cpCall"
                               placeholder="사업장 연락처를 적어주세요.('-' 제외하고 숫자만 적어주세요.)"
                               required
                               onChange={changeHandler}/>
                    </div>
                </div>
                {/* 사장님 개인 정보 입력 폼 */}
                <SubTitle title={"개인 정보입력"}/>
                <div className="row form-box">
                    <FormLabel name="사장님 성함"/>
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input type="text"
                               className="form-control"
                               name="ceoName"
                               placeholder="성함을 적어주세요."
                               required
                               onChange={changeHandler}/>
                    </div>
                </div>
                <div className="row form-box">
                    <FormLabel name="휴대폰 번호"/>
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input type="text"
                               className="form-control"
                               name="ceoCall"
                               placeholder="휴대폰 번호를 적어주세요.('-' 제외하고 숫자만 적어주세요.)"
                               required
                               onChange={changeHandler}/>
                    </div>
                </div>
                <div className="row form-box">
                    <FormLabel name="이메일 주소"/>
                    <div className="col-md-2 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input type="text"
                               className="form-control"
                               name="ceoEmail_1"
                               required
                               onChange={changeHandler}/>
                    </div>
                    <div className="col-md-2 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input type="text"
                               className="form-control"
                               name="ceoEmail_2"
                               placeholder="gmail.com"
                               required
                               onChange={changeHandler}/>
                    </div>
                    <div className="col-md-2 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <select className="form-control">
                            <option>직접 입력</option>
                        </select>
                    </div>
                </div>
                {/*계정 정보 입력*/}
                <SubTitle title={"계정 정보입력"}/>
                <div className="row form-box">
                    <FormLabel name="아이디"/>
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input type="text"
                               className="form-control"
                               name="userId"
                               placeholder="띄어쓰기 없이 영문자나 숫자 4-20자"
                               required
                               onChange={changeHandler}/>
                    </div>
                    <div className="col-md-2 col-md-offset-0 col-xs-10 col-xs-offset-1">
                        <button type="button" className="btn btn-primary" onClick={chkUserIdSubmit}>중복 확인</button>
                    </div>
                </div>
                <div className="row form-box">
                    <FormLabel name="비밀번호 입력"/>
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input type="text"
                               className="form-control"
                               name="password"
                               placeholder="띄어쓰기 없이 영문자나 숫자 포함 4-20자"
                               required
                               onChange={changeHandler}/>
                    </div>
                </div>
                <div className="row form-box">
                    <FormLabel name="비밀번호 확인"/>
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input type="text"
                               className="form-control"
                               name="repassword"
                               placeholder="위에서 입력한 비밀번호를 다시 한번 입력해주세요."
                               required
                               onChange={changeHandler}/>
                    </div>
                </div>
                <div className="row">
                    <button type="button" className="btn">취소</button>
                    <button type="button" className="btn" onClick={handleSubmit}>다음</button>
                </div>
            </div>
        );
    }
}

export default RegisterForm;