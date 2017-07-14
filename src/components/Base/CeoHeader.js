import React from 'react';
import { Link } from 'react-router-dom';

function CeoHeader() {
    return (
        <nav className="ceo-nav-top navbar navbar-static-top">
            <ul className="nav navbar-right">
                <li>로고자리</li>
                <li><Link to="/ceo/mypage"><i className="fa fa-user-circle-o"></i><span>마이페이지</span></Link></li>
                <li><Link to="/logout"><i className="fa fa-sign-out"></i><span>로그아웃</span></Link></li>
            </ul>
        </nav>
    );
}

export default CeoHeader;