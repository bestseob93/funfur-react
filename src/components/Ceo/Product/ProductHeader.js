import React from 'react';

function productHeader() {
    return (
        <div>
            <h3>내가 등록한 상품</h3>
            <ol className="breadcrumb">
                <li>홈</li>
                <li>판매관리</li>
                <li><strong>제품관리/등록</strong></li>
            </ol>
        </div>
    );
}

export default productHeader;