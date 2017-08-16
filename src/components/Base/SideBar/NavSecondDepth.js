import React from 'react';
import { Link } from 'react-router-dom';

function NavSecondDepth({onClick, iconIndex, depthCategory}) {
    if(depthCategory === "가입상품") {
        return (
            <ul className="side-nav">
                <li onClick={(s) => onClick(s.target.id)} className={iconIndex === 'iconIndex-1' ? 'icon-active' : undefined}>
                    <Link id="iconIndex-1" to="/ceo/item_list" className="nav-link second-depth">모든 현황 보기<img alt="로고" className="label-image" src={require('img/ex-funfur-logo.jpg')} /></Link>
                </li>
                <li onClick={(s) => onClick(s.target.id)} className={iconIndex === 'iconIndex-2' ? 'icon-active' : undefined}>
                    <Link id="iconIndex-2" to="/ceo/bought_list" className="nav-link second-depth">가입된 상품 보기<img alt="로고" className="label-image" src={require('img/ex-funfur-logo.jpg')} /></Link>
                </li>
                <li onClick={(s) => onClick(s.target.id)} className={iconIndex === 'iconIndex-3' ? 'icon-active' : undefined}>
                    <Link id="iconIndex-3" to="/ceo/buy_new_item" className="nav-link second-depth">새로 상품 가입하기<img alt="로고" className="label-image" src={require('img/ex-funfur-logo.jpg')} /></Link>
                </li>
            </ul>         
        );
    } else if(depthCategory === "판매관리") {
        return (
            <ul className="side-nav">
                <li onClick={(s) => onClick(s.target.id)} className={iconIndex === 'iconIndex-4'  ? 'icon-active' : undefined}>
                    <Link id="iconIndex-4" to="/ceo/products" className="nav-link second-depth">제품 관리 / 등록<img alt="로고" className="label-image" src={require('img/ex-funfur-logo.jpg')} /></Link>
                </li>
                <li onClick={(s) => onClick(s.target.id)} className={iconIndex === 'iconIndex-5' ? 'icon-active' : undefined}>
                    <Link id="iconIndex-5" to="/ceo/product_exchange" className="nav-link second-depth">교환 / 반품 관리<img alt="로고" className="label-image" src={require('img/ex-funfur-logo.jpg')} /></Link>
                </li>
                <li onClick={(s) => onClick(s.target.id)} className={iconIndex === 'iconIndex-6' ? 'icon-active' : undefined}>
                    <Link id="iconIndex-6" to="/ceo/consumer" className="nav-link second-depth">소비자 문의<img alt="로고" className="label-image" src={require('img/ex-funfur-logo.jpg')} /></Link>
                </li>
                <li onClick={(s) => onClick(s.target.id)} className={iconIndex === 'iconIndex-7' ? 'icon-active' : undefined}>
                    <Link id="iconIndex-7" to="/ceo/data_analysis" className="nav-link second-depth">데이터 분석<img alt="로고" className="label-image" src={require('img/ex-funfur-logo.jpg')} /></Link>
                </li>
                <li onClick={(s) => onClick(s.target.id)} className={iconIndex === 'iconIndex-8' ? 'icon-active' : undefined}>
                    <Link id="iconIndex-8" to="/ceo/whole_sales" className="nav-link second-depth">전체 판매내역<img alt="로고" className="label-image" src={require('img/ex-funfur-logo.jpg')} /></Link>
                </li>
            </ul>
        );
    }

}

export default NavSecondDepth;