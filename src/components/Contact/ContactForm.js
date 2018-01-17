import React, { Component } from 'react';
import FormHeader from './FormHeader';
import {
    Spinner,
    FormLabel
} from 'components/Common';

class ContactForm extends Component {
    constructor(props) {
        super(props);

        this.changeHandler = this.changeHandler.bind(this);
        this.handleEnterPress = this.handleEnterPress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    changeHandler(ev) {
        const { FormActions } = this.props;

        FormActions.formChange({
            formName: 'contact',
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

    async handleSubmit(ev) {
        const { UiActions, FormActions, ContactActions, form } = this.props;
        
        const contactInfo = {
            userName: form.get('userName'),
            userEmail: form.get('userEmail'),
            contents: form.get('contents')
        };
        
        try {
            await ContactActions.sendContact(contactInfo);
            
            if(this.props.valid) {
                UiActions.showSweetAlert({
                    message: "성공적으로 메일이 전송되었습니다."
                });
                FormActions.formReset('contact');
            }

        } catch (e) {
            if(e) throw e;
        }
    }

    render() {
        const {
            changeHandler,
            handleEnterPress,
            handleSubmit
        } = this;

        return (
            <div className="col-md-6 col-xs-12">
                <FormHeader />
                {/* Spinner */}
                { this.props.status.get('fetching') && <Spinner /> }
                <div className="row form-box">
                    <FormLabel name="성함" contact={true} />
                    <div className="col-md-6 col-xs-12" style={{padding: 0}}>
                        <input
                            type="text"
                            name="userName"
                            className="form-control"
                            placeholder="성함을 입력해주세요"
                            required
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <div className="row form-box">
                    <FormLabel name="이메일" contact={true} />
                    <div className="col-md-10 col-xs-12" style={{padding: 0}}>
                        <input
                            type="email"
                            name="userEmail"
                            className="form-control"
                            placeholder="회신받을 이메일을 입력해주세요"
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <div className="row form-box">
                    <FormLabel name="궁금한 점" contact={true} />
                    <div className="col-md-10 col-xs-12" style={{padding: 0}}>
                        <textarea
                            style={{resize: 'none', height: 130}}
                            className="form-control"
                            name="contents"
                            placeholder="문의하실 내용을 적어주세요"
                            required
                            onKeyPress={handleEnterPress}
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-offset-10 col-md-2" style={{padding: 0}}>
                        <button
                            type="button"
                            className="btn ns-B width100"
                            style={{color: 'black'}}
                            onClick={handleSubmit}
                        >보내기
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContactForm;