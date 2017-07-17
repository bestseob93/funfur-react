import React, { Component } from 'react';

class FunfurStatus extends Component {
    render() {
        return (
            <div className="row">
                <div className="status-title">
                    2017.07.10 ~ 2017.07.17 모바일 가구거리 전체 현황
                </div>
                <div className="col-md-4 col-xs-12">
                    <p>누적입점업체 35개</p>
                    <p>신규입점업체 5개</p>
                </div>
                <div className="col-md-4 col-xs-12">
                    <p>누적입점업체 35개</p>
                    <p>신규입점업체 5개</p>
                </div>
                <div className="col-md-4 col-xs-12">
                    <p>이번 달 총 판매액 11,100,000원</p>
                    <p>이번 주 총 판매액 1,100,000원</p>
                </div>
            </div>
        );
    }
}

export default FunfurStatus;