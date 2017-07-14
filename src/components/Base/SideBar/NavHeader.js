import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    authInfo: PropTypes.object
};

const defaultProps = {
    authInfo: {
        ceoName: '사장님 성함',
        companyName: '회사명',
        loginId: '아이디'
    }
};

function NavHeader({authInfo}) {
    const { ceoName, companyName, loginId } = authInfo;
    return (
        <li className="nav-header">
            <div className="nav-header-contents">
                <h3 className="text-center">{loginId}</h3>
                <h3 className="text-center">{companyName}</h3>
                <h3 className="text-center">{ceoName}</h3>
            </div>
        </li>
    );
}

NavHeader.propTypes = propTypes;
NavHeader.defaultProps = defaultProps;

export default NavHeader;