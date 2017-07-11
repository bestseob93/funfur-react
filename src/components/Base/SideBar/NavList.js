import React, { Component } from 'react';
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
    
    return (
        <li className={active ? 'nav-list active' : 'nav-list'} onClick={() => onClick(index)}>
            <Link className="nav-link" to={pathName}>
                <i className={`fa ${faIcon}`}></i>
                <span className="nav-label">{text}</span>
                { faArrow ? (<i className="fa fa-angle-left side-menu-right"></i>) : undefined }
                { hasLabel ? (<span className="side-menu-right label label-info">7</span>) : undefined }
            </Link>
            { secondDepth ? <NavSecondDepth /> : undefined }
        </li>
    );
}

export default NavList;