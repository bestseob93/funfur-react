import React from 'react';
import NavList from './NavList';
import NavHeader from './NavHeader';
import MobileHamburger from './MobileHamburger';

function SideBar({onClick, listIndex, authInfo}) {
    
    if(window.innerWidth < 767) {
        return (
            <MobileHamburger />
        );
    } else {
        return (
            <nav className="navbar-static-side">
                <div className="side-collaspe">
                    <ul className="side-nav">
                        <NavHeader authInfo={authInfo} />
                        <NavList
                            index={'navIndex-1'}
                            text="홈"
                            faIcon="fa-th-large"
                            pathName="/ceo"
                            active={'navIndex-1' === listIndex}
                            onClick={onClick}
                        />
                        <NavList
                            index={'navIndex-2'}
                            text="가입상품"
                            faIcon="fa-fa-files-o"
                            faArrow={true}
                            pathName="#"
                            secondDepth={true}
                            active={'navIndex-2' === listIndex}
                            onClick={onClick}
                        />
                        <NavList
                            index={'navIndex-3'}
                            text="판매관리"
                            faIcon="fa-shopping-cart"
                            faArrow={true}
                            pathName="#"
                            secondDepth={true}
                            active={'navIndex-3' === listIndex}
                            onClick={onClick}
                        />
                        <NavList
                            index={'navIndex-4'}
                            text="발주서 / 물건 보내기"
                            faIcon="fa-magic"
                            pathName="#"
                            hasLabel={true}
                            active={'navIndex-4' === listIndex}
                            onClick={onClick}
                        />
                    </ul>
                </div>
            </nav>
        );
    }
}

export default SideBar;