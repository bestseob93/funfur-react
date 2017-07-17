import React from 'react';

function OrderStatus() {
    return (
        <div className="col-md-6 col-xs-6">
            <img />
            <div className="status-txt-wrapper">
                <p>제품 문의<span>1건</span></p>
                <p>입금 대기<span>1건</span></p>
                <p>신규 주문<span>2건</span></p>
            </div>
        </div>
    );
}

export default OrderStatus;