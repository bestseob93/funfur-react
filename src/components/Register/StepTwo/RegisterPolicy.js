import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PolicyContents from './PolicyContents';

class RegisterPolicy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseOvered: false
        };
        
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }

    handleMouseOver() {
        this.setState({
            mouseOvered: !this.state.mouseOvered
        });
    }

    handleMouseOut() {
        this.setState({
            mouseOvered: !this.state.mouseOvered
        });
    }

    render() {
        const {
            handleMouseOver,
            handleMouseOut } = this;
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="policy-checks">
                        <label onMouseOver={handleMouseOver}
                               onMouseOut={handleMouseOut}
                               className={this.state.mouseOvered ? 'overed' : ''}>
                            <input type="checkbox" value=""/>
                        </label>
                        <span>모든 약관 및 정책에 동의합니다.</span>
                    </div>
                    <div className="policy-box-wrapper">
                        <h5 className="policy-box-title">뻔뻐 사장님 사이트 이용약관</h5>
                        <div className="policy-box">
                            <div className="policy-scroll-content">
                                <PolicyContents contentType={'useterm'}/>
                            </div>
                        </div>
                        <p className="policy-box-agree">위의 뻔뻐 사장님사이트 이용약관에 동의합니다.</p>
                    </div>
                    <div className="policy-box-wrapper">
                        <h5 className="policy-box-title">뻔뻐 제품 판매 이용약관</h5>
                        <div className="policy-box">
                            <div className="policy-scroll-content">
                                <PolicyContents contentType={'sellterm'}/>
                            </div>
                        </div>
                        <p className="policy-box-agree">위의 뻔뻐 제품 판매 이용약관에 동의합니다.</p>
                    </div>
                    <div className="policy-box-wrapper" style={{borderBottom: 0}}>
                        <h5 className="policy-box-title">개인정보 수집 이용 동의</h5>
                        <div className="policy-box">
                            <div className="policy-scroll-content">
                                <PolicyContents contentType={'userinfo'}/>
                            </div>
                        </div>
                        <p className="policy-box-agree">위의 개인정보 수집 이용에 동의합니다.</p>
                    </div>
                    <div className="btn-container">
                        <Link className="btn btn-common btn-prev" to="/register">이전</Link>
                        <Link className="btn btn-common btn-next" to="/register_3">다음</Link>
                    </div>
                </div>
            </div>
        );
    }

};

export default RegisterPolicy;