import React from 'react';

function DeliverStatus() {
    return (
        <div className="col-md-6 col-xs-6">
            <img />
            <div className="status-txt-wrapper">
                <p>배송중<span>1건</span></p>
                <p>배송완료<span>2건</span></p>
            </div>
        </div>
    );
}

export default DeliverStatus;