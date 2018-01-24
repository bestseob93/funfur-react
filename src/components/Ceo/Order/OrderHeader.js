import React from 'react';
import OrderSpecificInformation from './OrderSpecificInformation';


function OrderHeader() {
    return (
        <div className="order-header ns-EB">
            발주서 확인/물건 보내기
            <OrderSpecificInformation/>
        </div>
    );
}

export default OrderHeader;