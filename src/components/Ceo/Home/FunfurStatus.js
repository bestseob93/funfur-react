import React, { Component } from 'react';

class FunfurStatus extends Component {
    render() {
        return (
            <div className="sales-status-wrapper">
                <div className="status-title" style={{paddingTop: 30}}>
                    2017.07.10 ~ 2017.07.17
                    <span style={{
                        marginLeft: 40,
                        borderBottom: '1px solid #000',
                        paddingLeft: 20,
                        paddingRight: 20
                    }}>모바일 가구거리 전체 현황</span>
                </div>
                <div className="row status-box-wrapper">
                    <div className="col-md-3 col-xs-12 funfur-status-box">
                        <div className="funfur-img-wrapper"><img src={require('img/icon/store.svg')} /></div>
                        <p><span style={{float: 'left'}}>누적 입점업체</span> <span style={{float: 'right'}}><strong>35</strong>개</span></p>
                        <p><span style={{float: 'left', clear: 'both'}}>신규 입점업체</span> <span style={{float: 'right'}}><strong>5</strong>개</span></p>
                    </div>
                    <div className="col-md-3 col-xs-12 col-md-offset-1 col-xs-offset-0 funfur-status-box">
                        <div className="funfur-img-wrapper"><img src={require('img/icon/furniture.svg')} /></div>
                        <p><span style={{float: 'left'}}>누적 입점업체</span> <span style={{float: 'right'}}><strong>35</strong>개</span></p>
                        <p><span style={{float: 'left', clear: 'both'}}>신규 입점업체</span> <span style={{float: 'right'}}><strong>5</strong>개</span></p>
                    </div>
                    <div className="col-md-3 col-xs-12 col-md-offset-1 col-xs-offset-0 funfur-status-box">
                        <div className="funfur-img-wrapper"><img src={require('img/icon/contractvalue.svg')} /></div>
                        <p><span style={{float: 'left'}}>이번 달 총 판매액</span> <span style={{float: 'right'}}><strong>11,100,000</strong>원</span></p>
                        <p><span style={{float: 'left', clear: 'both'}}>이번 주 총 판매액</span> <span style={{float: 'right'}}><strong>1,100,000</strong>원</span></p>
                    </div>
                </div>
            </div>
        );
    }
}

export default FunfurStatus;