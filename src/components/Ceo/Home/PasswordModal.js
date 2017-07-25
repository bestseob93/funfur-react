import React, { Component } from 'react';

class PasswordModal extends Component {
    constructor(props) {
        super(props);

        this.changeHandler = this.changeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrorMessage = this.renderErrorMessage.bind(this);
    }

    changeHandler(ev) {
        const { FormActions } = this.props;

        FormActions.formChange({
            formName: 'modifyPw',
            name: ev.target.name,
            value: ev.target.value
        });
    }

    async handleSubmit(ev) {
        const { FormActions, AuthActions, form, hideModal } = this.props;
        ev.preventDefault();

        const pwRegex = /^[a-zA-Z0-9]{4,20}$/; // 비밀번호 정규표현식

        if(form === undefined || form.size < 2) {
            FormActions.formChange({
                formName: 'modifyPw',
                name: 'errCode',
                value: 0
            });
        } else {
            const chkNum = form.get('newPassword').search(/[0-9]/g); // 숫자 확인
            const chkEng = form.get('newPassword').search(/[a-z]/ig); // 영어 확인

            if(!pwRegex.test(form.get('newPassword'))) {
                FormActions.formChange({
                    formName: 'modifyPw',
                    name: 'errCode',
                    value: 1
                }); // 영문 숫자 포함 4-20자여야 함.
            } else if(chkNum < 0 || chkEng < 0) {
                FormActions.formChange({
                    formName: 'modifyPw',
                    name: 'errCode',
                    value: 2
                }); // 숫자 영문 혼합 확인.
            } else if(form.get('newPassword') === form.get('rePassword')) { 
                try {
                    await AuthActions.modifyPassword(form.get('prevPassword'), form.get('newPassword'));
                    console.log(this.props.pwValid);
                    if(this.props.pwValid) {
                        console.log('aaa');
                        this.props.hideModal();
                    }
                } catch (e) {
                    console.log(e);
                    if(e.response.data.code === 5) {
                        FormActions.formChange({
                            formName: 'modifyPw',
                            name: 'errCode',
                            value: 5
                        }); // 기존 비밀번호 다름
                    } else {
                        FormActions.formChange({
                            formName: 'modifyPw',
                            name: 'errCode',
                            value: 4
                        }); // 토큰이 만료되었습니다. 재로그인해주세요.
                    }
                }
            } else {
                FormActions.formChange({
                    formName: 'modifyPw',
                    name: 'errCode',
                    value: 3
                }); // 패스워드 확인값과 일치하지 않음.
            }
        }
    }

    renderErrorMessage() {
        switch(this.props.form.get('errCode')) {
            case 0:
                return <p style={{color: 'red'}}>칸을 빠짐없이 채워주세요!</p>;
            case 1:
                return <p style={{color: 'red'}}>새 패스워드는 영문자와 숫자를 포함한 4-20자여야 합니다.</p>;
            case 2:
                return <p style={{color: 'red'}}>숫자와 영문을 혼합해야 합니다.</p>;
            case 3:
                return <p style={{color: 'red'}}>새 비밀번호와 비밀번호 확인 값이 다릅니다.</p>;
            case 4:
                return <p style={{color: 'red'}}>토큰이 만료되었습니다. 재로그인해주세요.</p>;
            case 5:
                return <p style={{color: 'red'}}>기존 비밀번호가 일치하지 않습니다.</p>;
            default:
                return;
        }
    }

    render() {
        const {
            hideModal,
            modalVisible
        } = this.props;

        const { 
            changeHandler,
            handleSubmit,
            renderErrorMessage
        } = this;
        
        return (
            <div
                className={`modal ${modalVisible ? 'fade in animated fadeIn' : 'fade'}`}
                style={modalVisible ? {display: 'block'} : {display: 'none'}}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="myModalLabel"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={hideModal}><span>&times;</span></button>
                            <h4 className="modal-title" id="myModalLabel">비밀번호 변경</h4>
                        </div>
                        <div className="modal-body">
                            <p>띄어쓰기 없이 영문과 숫자 포함 8 ~ 20자 사용 가능.</p>
                            <p>
                                <input
                                    type="password"
                                    name="prevPassword"
                                    className="form-control"
                                    placeholder="기존 비밀번호 입력"
                                    required
                                    value={this.props.form.get('prevPassword')}
                                    onChange={changeHandler}
                                />
                            </p>
                            <p>
                                <input
                                    type="password"
                                    name="newPassword"
                                    className="form-control"
                                    placeholder="새 비밀번호 입력"
                                    required
                                    value={this.props.form.get('newPassword')}
                                    onChange={changeHandler}
                                />
                            </p>
                            <p>
                                <input
                                    type="password"
                                    name="rePassword"
                                    className="form-control"
                                    placeholder="새 비밀번호 확인"
                                    required
                                    value={this.props.form.get('rePassword')}
                                    onChange={changeHandler}
                                />
                            </p>
                            {renderErrorMessage()}
                        </div>
                        <div className="modal-footer">
                            <div className="btn-container">
                                <button
                                    type="button"
                                    className="btn btn-common btn-next"
                                    disabled={this.props.status.fetching ? true : false}
                                    onClick={handleSubmit}
                                >
                                    { this.props.status.fetching ? '전송중..' : '확인' }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PasswordModal;