import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);

        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    /* scroll 시 header 배경 변경 */
    handleScroll(ev) {
        // let scrollTop = ev.srcElement.body.scrollTop;
        let scrollTop = ev.currentTarget.scrollY;
        console.log(scrollTop);
        let isScrolling = false;
        if(scrollTop > 20) {
            isScrolling = true;
        } else {
            isScrolling = false;
        }
        if(isScrolling) {
            this.navbar.classList.add('scrolling-nav');
        } else {
            this.navbar.classList.remove('scrolling-nav');
        }
    }

    render() {
        const { authenticated, handleLogout } = this.props;
        const pathName = document.location.pathname;
        const renderBtn = () => {
            if(!authenticated) {
                return (
                    <ul className={`nav navbar-nav navbar-right ${pathName === '/' ? 'home-route' : ''}`}>
                        <li><Link to="/login" className="page-scroll">로그인</Link></li>
                        <li><Link to="/register" className="page-scroll">회원가입</Link></li>
                        <li><Link to="/contact" className="page-scroll">문의하기</Link></li>
                        <li><Link to="/items" className="page-scroll">상품소개</Link></li>
                        <li><a className="page-scroll" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/bbeonbbeo/?ref=bookmarks"><i className="fa fa-facebook"></i></a></li>
                        <li><a className="page-scroll" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/funfurofficial/"><i className="fa fa-instagram"></i></a></li>
                    </ul>
                );
            } else {
                return (
                    <ul className={`nav navbar-nav navbar-right ${pathName === '/' ? 'home-route' : ''}`}>
                        <li><Link to="/" type="button" className="page-scroll" onClick={handleLogout}>로그아웃</Link></li>
                        <li><Link to="/contact" className="page-scroll">문의하기</Link></li>
                        <li><Link to="/items" className="page-scroll">상품소개</Link></li>
                        <li><a className="page-scroll" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/bbeonbbeo/?ref=bookmarks"><i className="fa fa-facebook"></i></a></li>
                        <li><a className="page-scroll" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/funfurofficial/"><i className="fa fa-instagram"></i></a></li>
                    </ul>
                )
            }
        };
        return (
            <div className="navbar-wrapper">
                <nav ref={ (nav) => this.navbar = nav } className="navbar navbar-default navbar-fixed-top">
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
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">
                            { renderBtn() }
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;