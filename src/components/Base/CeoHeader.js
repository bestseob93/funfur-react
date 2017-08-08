import React from 'react';
import { Link } from 'react-router-dom';

function CeoHeader({showModal}) {
    return (
        <nav className="ceo-nav-top navbar navbar-static-top">
            <ul className="nav navbar-right">
                <li>로고자리</li>
                <li><a onClick={showModal}><span>비밀번호 변경</span></a></li>
                <li><Link to="/ceo/mypage"><span>마이페이지</span></Link></li>
                <li><Link to="/logout"><span>로그아웃</span></Link></li>
            </ul>
        </nav>
    );
}

export default CeoHeader;