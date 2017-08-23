import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RegisterPending extends Component {
    render() {
        return (
            <div className="text-center pending-wrapper">
                <h3 className="ns-B">사장님 사이트 업체등록 승인이 요청되었습니다.</h3>
                <h5>뻔뻐의 모든 서비스는 업체등록 요청 <span className="point-red">승인 시 접근 가능</span>합니다.</h5>
                <h5><span className="point-red">2일 내</span>에 가입하신 휴대폰 번호로 <span className="point-red">전화</span> 드리겠습니다.</h5>
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