import React from 'react';

function NavHeader() {
    return (
        <li className="nav-header">
            <div className="nav-header-contents">
                <h3 className="text-center">아이디</h3>
                <h3 className="text-center">업체명</h3>
                <h3 className="text-center">홍길동 대표님</h3>
            </div>
        </li>
    );
}

export default NavHeader;