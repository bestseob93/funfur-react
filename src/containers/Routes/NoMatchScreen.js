import React from 'react';

function NoMatchScreen() {
    return (
        <div className="auth-top-border container _mb" style={{height: '100%', overflow: 'visible'}}>
            <h2 className="text-center">404, Page Not Found. 아직 준비 중이에요!</h2>
            <img style={{margin: '0 auto', display: 'block'}} src={require('../../img/notfound.png')} alt="404" />
        </div>
    )
};

export default NoMatchScreen;