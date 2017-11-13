import React from 'react';
import NavList from './NavList';
import NavHeader from './NavHeader';

function SideBar({onClick, listIndex, iconIndex, onIconActiveClick, authInfo, mobileVisible}) {
    return (
        <nav className={`${mobileVisible ? 'mobile-navbar' : window.innerWidth < 767 ? 'mobileview' : 'navbar-static-side'}`}>
            <div className="side-collaspe">
                <ul className="side-nav">
                    <NavHeader authInfo={authInfo} />
                    <NavList
                        index={'navIndex-1'}
                        iconIndex={'iconIndex-0'}
                        text="홈"
                        faIcon="fa-th-large"
                        faArrow={false}
                        pathName="/ceo"
                        active={'navIndex-1' === listIndex}
                        onClick={onClick}
                        onIconActiveClick={onIconActiveClick}
                    />
                    <NavList
                        index={'navIndex-2'}
                        iconIndex={iconIndex}
                        text="가입상품"
                        faIcon="fa-fa-files-o"
                        faArrow={true}
                        pathName="#"
                        secondDepth={true}
                        active={'navIndex-2' === listIndex}
                        onClick={onClick}
                        onIconActiveClick={onIconActiveClick}
                    />
                    <NavList
                        index={'navIndex-3'}
                        iconIndex={iconIndex}
                        text="판매관리"
                        faIcon="fa-shopping-cart"
                        faArrow={true}
                        pathName="#"
                        secondDepth={true}
                        active={'navIndex-3' === listIndex}
                        onClick={onClick}
                        onIconActiveClick={onIconActiveClick}
                    />
                    <NavList
                        index={'navIndex-4'}
                        iconIndex={'iconIndex-9'}
                        text="발주서 / 물건 보내기"
                        faIcon="fa-magic"
                        faArrow={false}
                        pathName="/ceo/order"
                        active={'navIndex-4' === listIndex}
                        onClick={onClick}
                        onIconActiveClick={onIconActiveClick}
                    />
                </ul>
            </div>
        </nav>
    );
}

export default SideBar;