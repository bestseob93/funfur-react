import React from 'react';
import { Link } from 'react-router-dom';

function NavSecondDepth() {
    return (
        <ul className="side-nav">
            <li><Link to="/ceo/products" className="nav-link second-depth">제품 관리 / 등록</Link></li>
            <li><Link to="/ceo/consumer" className="nav-link second-depth">소비자 문의</Link></li>
            <li><Link to="/ceo/data_analysis" className="nav-link second-depth">데이터 분석</Link></li>
        </ul>
    );
}

export default NavSecondDepth;