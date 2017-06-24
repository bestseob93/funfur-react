import React,  { Component } from 'react';

class Header extends Component {
    render() {
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
                            <a className="navbar-brand" href="/">뻔뻐</a>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">
                            <ul className="nav navbar-nav navbar-right">
                                <li><a className="page-scroll" href="/user/login">로그인</a></li>
                                <li><a className="page-scroll" href="/user/register_1">회원가입</a></li>
                                <li><a className="page-scroll" href="#product.html">상품소개</a></li>
                                <li><a className="page-scroll" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/bbeonbbeo/?ref=bookmarks"><i className="fa fa-facebook"></i></a></li>
                                <li><a className="page-scroll" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/bbeonbbeo/"><i className="fa fa-instagram"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;