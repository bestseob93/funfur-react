import React from 'react';

function ServiceStatus() {
    return (
        <div className="col-md-5 col-xs-6 status-box non-border">
            <div className="status-box-table row">
                <div className="status-icon-wrapper">
                    <img className="status-icon" src={require('img/icon/un-purchasing.svg')} />
                </div>
                <div className="status-txt-wrapper">
                    <p>구매 취소<span>1건</span></p>
                    <p>반품 요청<span>1건</span></p>
                    <p>교환 요청<span>2건</span></p>
                </div>
            </div>
        </div>
    );
}

export default ServiceStatus;