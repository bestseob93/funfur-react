import React from 'react';

function DeliverStatus() {
    return (
        <div className="col-md-5 col-xs-6 col-md-offset-1 col-xs-offset-0 status-box non-border">
            <div className="status-box-table row">
                <div className="status-icon-wrapper">
                    <img className="status-icon" src={require('img/icon/delivery.svg')} />
                </div>
                <div className="status-txt-wrapper">
                    <p>배송중<span>1건</span></p>
                    <p>배송완료<span>1건</span></p>
                </div>
            </div>
        </div>
    );
}

export default DeliverStatus;