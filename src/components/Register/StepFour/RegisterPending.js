import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RegisterPending extends Component {
    render() {
        return (
            <div className="text-center">
                <h1 className="funfur-color">뻔뻐 사장님 사이트</h1>
                <h3>업체등록 승인이 요청되었습니다.</h3>
                <h3>뻔뻐의 모든 써비스는 업체등록 요청 승인시 접근 가능합니다.</h3>
                <h3>"곧 연락드리겠습니다!" 등록해주셔서 감사합니다 :)</h3>
                <div className="padding-top50">
                    <div className="btn-container">
                        <button type="button" className="btn btn-common btn-prev">문의하기</button>
                        <Link to="/" className="btn btn-common btn-next">홈으로 가기</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterPending;