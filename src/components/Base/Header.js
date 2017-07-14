import React,  { Component } from 'react';
import { Link } from 'react-router-dom';
function Header({authenticated, handleLogout}) {
    const loginBtn = (
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/login" className="page-scroll">로그인</Link></li>
                            <li><Link to="/user/register_1" className="page-scroll">회원가입</Link></li>
                            <li><Link to="/ceo" className="page-scroll">상품소개</Link></li>
                            <li><a className="page-scroll" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/bbeonbbeo/?ref=bookmarks"><i className="fa fa-facebook"></i></a></li>
                            <li><a className="page-scroll" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/bbeonbbeo/"><i className="fa fa-instagram"></i></a></li>
                        </ul>
    );

    const logoutBtn = (
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/" type="button" className="page-scroll" onClick={handleLogout}>로그아웃</Link></li>
                            <li><Link to="/" className="page-scroll">상품소개</Link></li>
                            <li><a className="page-scroll" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/bbeonbbeo/?ref=bookmarks"><i className="fa fa-facebook"></i></a></li>
                            <li><a className="page-scroll" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/bbeonbbeo/"><i className="fa fa-instagram"></i></a></li>
                        </ul>
    );
    return (
        <div className="navbar-wrapper">
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header page-scroll">
                        {/*<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>*/}
                        <a className="navbar-toggle" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/bbeonbbeo/?ref=bookmarks">
                            <i className="fa fa-facebook"></i>
                        </a>
                        <a className="navbar-toggle" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/bbeonbbeo/"><i className="fa fa-instagram"></i></a>
                        <Link className="navbar-brand" to="/">뻔뻐</Link>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        { authenticated ? logoutBtn : loginBtn }
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;