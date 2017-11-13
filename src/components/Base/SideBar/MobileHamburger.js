import React from 'react';

function MobileHamburger(props) {
    if(props.mobileVisible) {
        return (
            <div className="mobile-hamburger" onClick={props.toggleMenu}>
                <div className="hamburger-wrapper menu-opend">
                    <div className="top-bun"></div>
                    <div className="meat"></div>
                    <div className="bottom-bun"></div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="mobile-hamburger" onClick={props.toggleMenu}>
                <div className="hamburger-wrapper">
                    <div className="top-bun"></div>
                    <div className="meat"></div>
                    <div className="bottom-bun"></div>
                </div>
            </div>
        );
    }
}

export default MobileHamburger;