import React from 'react';

function MobileHamburger(props) {
    return (
        <div className="mobile-hamburger" onClick={props.UiActions}>
            <i className="fa fa-bars"></i>
        </div>
    );
}

export default MobileHamburger;