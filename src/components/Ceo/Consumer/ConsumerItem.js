import React, { Component} from 'react';
import PropTypes from 'prop-types';
import {
    Spinner
} from 'components/Common';

class ConsumerItem extends Component {
    static propTypes = {
        productModel: PropTypes.string.isRequired,
        productName: PropTypes.string.isRequired,
        productPic: PropTypes.string.isRequired,
        question: PropTypes.string.isRequired,
        userNickname: PropTypes.string.isRequired,
        answer: PropTypes.string,
    }

    static defaultProps = {
        productModel: '제품모델',
        productName: '제품명',
        productPic: '제품사진',
        question: '질문내용',
        userNickname: '닉네임'
    }
    
    constructor(props) {
        super(props);

        this.state = {
            answerText: '',
            editMode: false,
        };

        this.changeHandler = this.changeHandler.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    changeHandler(ev) {
        this.setState({
            answerText: ev.target.value
        });
    }

    toggleEditMode() {
        this.setState({
            editMode: !this.state.editMode
        });
    }

    async handleSubmit(ev) {
        const { ProductActions, UiActions } = this.props;
        if(this.state.answerText === "" || typeof this.state.answerText !== 'string') {
            UiActions.showSweetAlert({
                value: 'warning',
                alertTitle: '',
                message: "답변 내용을 입력해주세요!"
            });
        } else {
            try {
                await ProductActions.answerConsumerInquiry(this.props.index, this.state.answerText);
                await ProductActions.getConsumerList();
                this.cleanState();
            } catch (e) {
                if(e) throw e;
            }
        }
    }

    cleanState() {
        this.setState({
            editMode: false,
            answerText: ''
        });
    }

    render() {
        console.log(this.props);
        if(this.props.status.answerPost.get('fetching')) return <Spinner />;
        else {
            return (
                <li className="item-box">
                    <div className="thumbnail">
                        <a className="img-area">
                            <img src={this.props.productPic} />
                        </a>
                    </div>
                    <div className="info-body">
                        <div className="item-title">
                            <span><strong>{this.props.productName} </strong></span>
                            <span>({this.props.productModel})</span>
                        </div>
                        <div className="item-area">
                            <p>{this.props.userNickname}</p>
                            <p>날짜</p>
                            <p className="texts">질문: {this.props.question}</p>
                            {
                                this.props.answer ? this.state.editMode ?  
                                <textarea
                                    onChange={this.changeHandler}
                                    value={this.state.answerText}
                                    className="answer-form"
                                    placeholder="답변을 등록해주세요"
                                    style={{resize: 'none', height: 60}}
                                /> : this.props.answer : <textarea
                                                            onChange={this.changeHandler}
                                                            value={this.state.answerText}
                                                            className="answer-form"
                                                            placeholder="답변을 등록해주세요"
                                                            style={{resize: 'none', height: 60}}
                                                        />
                            }
                        </div>
                        {
                            this.props.answer ? 
                            this.state.editMode ? 
                            <button
                                onClick={this.handleSubmit}
                                type="button"
                                className="btn funfur-btn"
                                style={{marginTop: '10px'}}
                            >
                                답변 등록
                            </button> : 
                            <button
                                onClick={this.toggleEditMode}
                                type="button"
                                className="btn funfur-btn"
                                style={{marginTop: '10px'}}
                            >
                                답변 수정
                            </button> :
                            <button
                                onClick={this.handleSubmit}
                                type="button"
                                className="btn funfur-btn"
                                style={{marginTop: '10px'}}
                            >
                                답변 등록
                            </button> 
                        }
                        
                    </div>
                </li>
            );
        }
    }
}

export default ConsumerItem;