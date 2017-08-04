import React from 'react';

function SalesStatus({children}) {
    return (
        <div className="sales-status-wrapper">
            <div className="status-title">2017.07.10 ~ 2017.07.17
                <span style={{
                    marginLeft: 40,
                    borderBottom: '1px solid #000',
                    paddingLeft: 20,
                    paddingRight: 20
                }}>내 판매 현황</span>
            </div>
            {children}
        </div>
    );
}

export default SalesStatus;