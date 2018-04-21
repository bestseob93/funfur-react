import React from "react";
import { Link } from "react-router-dom";

function CeoHeader({ showModal, handleLogout }) {
  return (
    <div className="ceo-header">
      <nav className="ceo-nav-top navbar navbar-static-top">
        <Link className="brand-logo-link" to="/ceo">
          <img
            className="brand-logo"
            src={require("img/pre-funfur-logo.png")}
            alt="funfurLoGo"
          />
        </Link>
        <ul className="nav navbar-right">
          <li>
            <a onClick={showModal}>
              <span>비밀번호 변경</span>
            </a>
          </li>
          <li>
            <Link to="/ceo/mypage">
              <span>마이페이지</span>
            </Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogout}>
              <span>로그아웃</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default CeoHeader;
