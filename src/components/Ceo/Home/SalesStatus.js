import React from 'react';

function SalesStatus({children}) {
    return (
        <div>
            <div className="">2017.07.10 ~ 2017.07.17 내 판매 현황</div>
            {children}
        </div>
    );
}

export default SalesStatus;