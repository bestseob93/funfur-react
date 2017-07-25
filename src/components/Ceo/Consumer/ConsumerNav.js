import React from 'react';

function ConsumerNav() {
    return (
        <div className="nav">
            <div className="btn-container">
                <button type="button" className="btn btn-common btn-next">진행중인 문의</button>
                <button type="button" className="btn btn-common btn-prev">완료된 문의</button>
                <button type="button" className="btn btn-common btn-prev">전체보기</button>
            </div>
        </div>
    );
}

export default ConsumerNav;