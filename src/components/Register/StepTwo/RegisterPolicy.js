import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    SweetAlertComponent
} from 'components/Common';

import PolicyContents from './PolicyContents';

class RegisterPolicy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseOvered: false
        };

        this.changeHandler = this.changeHandler.bind(this);
        this.handleCheckAll = this.handleCheckAll.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }

    changeHandler(ev) {
        const { FormActions } = this.props;

        if(this.props.form.get(ev.target.name) === 'on') {
            FormActions.formChange({
                formName: 'registerPolicy',
                name: ev.target.name,
                value: ''
            });
        } else {
            FormActions.formChange({
                formName: 'registerPolicy',
                name: ev.target.name,
                value: ev.target.value
            });
        }
    }

    handleCheckAll() {
        const { FormActions } = this.props;
        if(this.props.form.get('checkAll') === '') {
            FormActions.formChange({
                formName: 'registerPolicy',
                name: 'checkAll',
                value: 'on'
            });

            FormActions.formChange({
                formName: 'registerPolicy',
                name: 'site',
                value: 'on'
            });

            FormActions.formChange({
                formName: 'registerPolicy',
                name: 'sales',
                value: 'on'
            });

            FormActions.formChange({
                formName: 'registerPolicy',
                name: 'privacy',
                value: 'on'
            });
        } else {
            FormActions.formChange({
                formName: 'registerPolicy',
                name: 'checkAll',
                value: ''
            });

            FormActions.formChange({
                formName: 'registerPolicy',
                name: 'site',
                value: ''
            });

            FormActions.formChange({
                formName: 'registerPolicy',
                name: 'sales',
                value: ''
            });

            FormActions.formChange({
                formName: 'registerPolicy',
                name: 'privacy',
                value: ''
            });
        }

    }

    handleNext(ev) {
        const { UiActions, form } = this.props;
        ev.preventDefault();

        if(form.get('site') === '' || form.get('sales') === '' || form.get('privacy') === '') {
            UiActions.showSweetAlert({
                message: '모든 약관에 동의해주세요!'
            });
        } else {    
            this.props.history.push('/register_3');
        }
    }

    render() {
        const {
            changeHandler,
            handleCheckAll,
            handleNext
        } = this;

        const { form } = this.props;

        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="policy-checks">
                        <input
                            type="checkbox"
                            name="checkAll"
                            onChange={handleCheckAll}
                        />
                        <span>모든 약관 및 정책에 동의합니다.</span>
                    </div>
                    <div className="policy-box-wrapper">
                        <h5 className="policy-box-title">뻔뻐 사장님 사이트 이용약관</h5>
                        <div className="policy-box">
                            <div className="policy-scroll-content">
                                <PolicyContents contentType={'useterm'}/>
                            </div>
                        </div>
                        <p className="policy-box-agree">
                            <input
                                type="checkbox"
                                name="site"
                                checked={form.get('checkAll') === '' ? form.get('site') : form.get('checkAll') === 'on' ? true : false}
                                onChange={changeHandler}
                            />
                            위의 뻔뻐 사장님사이트 이용약관에 동의합니다.
                        </p>
                    </div>
                    <div className="policy-box-wrapper">
                        <h5 className="policy-box-title">뻔뻐 제품 판매 이용약관</h5>
                        <div className="policy-box">
                            <div className="policy-scroll-content">
                                <PolicyContents contentType={'sellterm'}/>
                            </div>
                        </div>
                        <p className="policy-box-agree">
                            <input
                                type="checkbox"
                                name="sales"
                                checked={form.get('checkAll') === '' ? form.get('sales') : form.get('checkAll') === 'on' ? true : false}
                                onChange={changeHandler}
                            />
                            위의 뻔뻐 제품 판매 이용약관에 동의합니다.
                        </p>
                    </div>
                    <div className="policy-box-wrapper" style={{borderBottom: 0}}>
                        <h5 className="policy-box-title">개인정보 수집 이용 동의</h5>
                        <div className="policy-box">
                            <div className="policy-scroll-content">
                                <PolicyContents contentType={'userinfo'}/>
                            </div>
                        </div>
                        <p className="policy-box-agree">
                            <input
                                type="checkbox"
                                name="privacy"
                                checked={form.get('checkAll') === '' ? form.get('privacy') : form.get('checkAll') === 'on' ? true : false}
                                onChange={changeHandler}
                            />
                            위의 개인정보 수집 이용에 동의합니다.
                        </p>
                    </div>
                    <div className="btn-container">
                        <Link className="btn btn-common btn-prev" to="/register">이전</Link>
                        <button className="btn btn-common btn-next" onClick={handleNext}>다음</button>
                    </div>
                </div>
            </div>
        );
    }

};

export default RegisterPolicy;