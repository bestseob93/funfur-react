import React from 'react';
import { Link } from 'react-router-dom';
import NavSecondDepth from './NavSecondDepth';

function NavList(props) {
    const {
        index,
        iconIndex,
        iconActive,
        onIconActiveClick,
        text,
        faIcon,
        faArrow,
        pathName,
        secondDepth,
        active,
        onClick
    } = props;
    
    const emptyComponent = undefined;
    return (
        <li className={active ? index === 'navIndex-1' || index === 'navIndex-4' ? 'nav-list active icon-active' : 'nav-list active' : 'nav-list'}
            onClick={(li) => onClick(li.target.id, index)}
        >
            <Link
                id={index === 'navIndex-1' ? 'iconIndex-0' : index === 'navIndex-4' ? 'iconIndex-9' : null}
                className="nav-link"
                to={pathName}
            >
                <i className={`fa ${faIcon}`}></i>
                <span className="nav-label">{text}<img className="label-image" src={require('img/ex-funfur-logo.jpg')} /></span>
                { faArrow ? active ? (<i className="fa fa-angle-down side-menu-right"></i>) : (<i className="fa fa-angle-left side-menu-right"></i>) : emptyComponent}
            </Link>
            { secondDepth ? <NavSecondDepth onClick={onIconActiveClick} iconIndex={iconIndex} depthCategory={text} /> : emptyComponent }
        </li>
    );
}

export default NavList;