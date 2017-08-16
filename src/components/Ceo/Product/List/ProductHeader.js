import React from 'react';

function productHeader() {
    return (
        <div className="my-product-header">
            <ul className="product-howto">
                <li>HOW TO...</li>
                <li>+ 버튼을 눌러 제품을 추가해주세요.</li>
                <li>수정할 제품의 사진을 눌러주세요.</li>
                <li>제품 삭제는 제품 수정에서 가능합니다.</li>
            </ul>
        </div>
    );
}

export default productHeader;