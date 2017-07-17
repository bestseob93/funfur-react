import React from 'react';

function ServiceStatus() {
    return (
        <div className="col-md-6 col-xs-6">
            <img />
            <div className="status-txt-wrapper">
                <p>구매 취소<span>1건</span></p>
                <p>반품 요청<span>1건</span></p>
                <p>교환 요청<span>2건</span></p>
            </div>
        </div>
    );
}

export default ServiceStatus;