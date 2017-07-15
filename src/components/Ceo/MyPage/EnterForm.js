import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EnterForm extends Component {
    constructor(props) {
        super(props);

        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler(ev) {
        const { FormActions } = this.props;
        FormActions.formChange({
            formName: 'myPageEnter',
            name: ev.target.name,
            value: ev.target.value
        });
    }

    handleSubmit(ev) {
        ev.preventDefault();

        this.props.router.history.push('/ceo/mypage_2');
    }

    render() {
        const {
            changeHandler,
            handleSubmit
        } = this;

        return (
            <div className="enter-form">
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
                            ref={(btn) => { this.submitBtn = btn }}>확인
                        </button>
                    </div>
                </div>
            </div>
        );
    }

}

export default EnterForm;