import React from 'react';
import { Link } from 'react-router-dom';

function SideBar() {
    return (
        <nav className="navbar-static-side">
            <div className="side-collaspe">
                <ul className="side-nav">
                    <li className="nav-header">
                        <div className="nav-header-contents">
                            <h3 className="text-center">아이디</h3>
                            <h3 className="text-center">업체명</h3>
                            <h3 className="text-center">홍길동 대표님</h3>
                        </div>
                    </li>
                    <li><Link className="nav-link" to="/ceo"><i className="fa fa-th-large"></i><span className="nav-label">홈</span></Link></li>
                    <li><Link className="nav-link" to="/"><i className="fa fa-files-o"></i><span className="nav-label">가입상품</span><i className="fa fa-arrow"></i></Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default SideBar;