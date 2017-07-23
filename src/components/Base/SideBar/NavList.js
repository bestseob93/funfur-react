import React from 'react';
import { Link } from 'react-router-dom';
import NavSecondDepth from './NavSecondDepth';

function NavList(props) {
    const {
        index,
        text,
        faIcon,
        faArrow,
        pathName,
        hasLabel,
        secondDepth,
        active,
        onClick
    } = props;
    
    const emptyComponent = undefined;
    return (
        <li className={active ? 'nav-list active' : 'nav-list'} onClick={() => onClick(index)}>
            <Link className="nav-link" to={pathName}>
                <i className={`fa ${faIcon}`}></i>
                <span className="nav-label">{text}</span>
                { faArrow ? (<i className="fa fa-angle-left side-menu-right"></i>) : emptyComponent }
                { hasLabel ? (<span className="side-menu-right label label-info">7</span>) : emptyComponent }
            </Link>
            { secondDepth ? <NavSecondDepth /> : emptyComponent }
        </li>
    );
}

export default NavList;