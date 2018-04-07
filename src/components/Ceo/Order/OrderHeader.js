import * as React from 'react';
import Hello from './Hello';

function OrderHeader() {
    return (
        <div className="order-header ns-EB">
            발주서 확인/물건 보내기
            <Hello />
        </div>
    );
}

export default OrderHeader;