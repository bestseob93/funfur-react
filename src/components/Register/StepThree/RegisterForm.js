import React, { Component } from 'react';
import FormLabel from './FormLabel';
import SubTitle from './SubTitle';

class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.changeHandler = this.changeHandler.bind(this);
        this.chkBusinessIdSubmit = this.chkBusinessIdSubmit.bind(this);
    }

    changeHandler(ev) {
        const { FormActions } = this.props;
        
        FormActions.formChange({
            formName: 'register',
            name: 'businessId',
            value: ev.target.value
        });
        console.log(this.props.form.toJS());
    }

    chkBusinessIdSubmit() {
        const { AuthActions, form } = this.props;
        let businessId = form.get('businessId');
        
        AuthActions.checkCompanyRegistration(businessId);
    }

    render() {
        const { 
            changeHandler,
            chkBusinessIdSubmit
        } = this;

        return (
            <div className="register-form-container">
                {/* 가구업체 입력 폼 */}
                <SubTitle title={"가구업체 정보입력"}/>
                <div className="row">
                    <FormLabel name="업체명"/>
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input type="text"
                               className="form-control"
                               placeholder="업체명을 적어주세요."
                               required/>
                    </div>
                </div>
                <div className="row">
                    <FormLabel name="사업자 등록번호"/>
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input type="text"
                               className="form-control"
                               placeholder="사업자 등록번호를 적어주세요.( '-' 제외하고 숫자만 적어주세요.)"
                               required
                               onChange={changeHandler}/>
                    </div>
                    <div className="col-md-2 col-md-offset-0 col-xs-10 col-xs-offset-1">
                        <button type="button" className="btn btn-primary" onClick={chkBusinessIdSubmit}>중복 확인</button>
                    </div>
                </div>
                <div className="row">
                    <FormLabel name="사업자 등록증"/>
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input type="text"
                               className="form-control"
                               required/>
                    </div>
                    <div className="col-md-2 col-md-offset-0 col-xs-10 col-xs-offset-1">
                        <button type="button" className="btn btn-primary">첨부 하기</button>
                    </div>
                </div>
                <div className="row">
                    <FormLabel name="사업자 주소"/>
                    <div className="col-md-2 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <select className="form-control">
                            <option>서울시</option>
                        </select>
                    </div>
                    <div className="col-md-2 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <select className="form-control">
                            <option>광진구</option>
                        </select>
                    </div>
                    <div className="col-md-2 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input type="text"
                               className="form-control"
                               placeholder="상세 주소를 입력해주세요."
                               required/>
                    </div>
                </div>
                <div className="row">
                    <FormLabel name="사업장 연락처"/>
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input type="text"
                               className="form-control"
                               placeholder="사업장 연락처를 적어주세요.('-' 제외하고 숫자만 적어주세요.)"
                               required/>
                    </div>
                </div>
                {/* 사장님 개인 정보 입력 폼 */}
                <SubTitle title={"개인 정보입력"}/>
                <div className="row">
                    <FormLabel name="사장님 성함"/>
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input type="text"
                               className="form-control"
                               placeholder="성함을 적어주세요."
                               required/>
                    </div>
                </div>
                <div className="row">
                    <FormLabel name="휴대폰 번호"/>
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input type="text"
                               className="form-control"
                               placeholder="휴대폰 번호를 적어주세요.('-' 제외하고 숫자만 적어주세요.)"
                               required/>
                    </div>
                </div>
                <div className="row">
                    <FormLabel name="이메일 주소"/>
                    <div className="col-md-2 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input type="text"
                               className="form-control"
                               required/>
                    </div>
                    <div className="col-md-2 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input type="text"
                               className="form-control"
                               placeholder="gmail.com"
                               required/>
                    </div>
                    <div className="col-md-2 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <select className="form-control">
                            <option>직접 입력</option>
                        </select>
                    </div>
                </div>
                {/*계정 정보 입력*/}
                <SubTitle title={"계정 정보입력"}/>
                <div className="row">
                    <FormLabel name="아이디"/>
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input type="text"
                               className="form-control"
                               placeholder="띄어쓰기 없이 영문자나 숫자 4-20자"
                               required/>
                    </div>
                    <div className="col-md-2 col-md-offset-0 col-xs-10 col-xs-offset-1">
                        <button type="button" className="btn btn-primary">중복 확인</button>
                    </div>
                </div>
                <div className="row">
                    <FormLabel name="비밀번호 입력"/>
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input type="text"
                               className="form-control"
                               placeholder="띄어쓰기 없이 영문자나 숫자 포함 4-20자"
                               required/>
                    </div>
                </div>
                <div className="row">
                    <FormLabel name="비밀번호 확인"/>
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input type="text"
                               className="form-control"
                               placeholder="위에서 입력한 비밀번호를 다시 한번 입력해주세요."
                               required/>
                    </div>
                </div>
                <div className="row">
                    <button type="button" className="btn">취소</button>
                    <button type="button" className="btn">다음</button>
                </div>
            </div>
        );
    }
}

export default RegisterForm;