import React, { Component } from 'react';

class ExchangeModal extends Component {
    constructor(props) {
        super(props);

        this.changeHandler = this.changeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrorMessage = this.renderErrorMessage.bind(this);
    }

    changeHandler(ev) {

    }

    async handleSubmit(ev) {

    }

    renderErrorMessage() {

    }

    render() {

        const {modalVisible, hideModal} = this.props;

        return (
            <div
                className={`modal ${modalVisible ? 'fade in animated fadeIn' : 'fade'}`}
                style={modalVisible ? {display: 'block'} : {display: 'none'}}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="myModalLabel"
            >
            <div>
                <div className="modal-dialog exchange" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={hideModal}><div id="modal-x" /></button>
                            <h4 className="modal-title" id="myModalLabel">반품 처리하기</h4>
                            <h5 className="modal-title" id="myModalLabel">반품완료는 수거완료처리 후 가능합니다.</h5>
                        </div>
                        <div className="modal-body">
                            <div className="can-return">
                                <span className="message">반품이 가능하다면,</span><button className="modal-dialog-btn" id="btn-complete">수거 완료</button>
                            </div>
                            <div className="cannot-return">
                                <span className="message">반품이 불가하다면,</span><button className="modal-dialog-btn" id="btn-reject">거부 처리</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default ExchangeModal;