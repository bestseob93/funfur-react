import React from 'react';

function SalesAmountStatus() {
    return (
        <div className={`col-md-5 col-xs-12 col-md-offset-1 col-xs-offset-0 ${window.innerWidth < 767 ? 'non-border' : ''} status-box`}>
            <div className="status-box-table row">
                <div className="status-icon-wrapper">
                    <img alt="selling" className="status-icon" src={require('img/icon/selling_record.svg')} />
                </div>
                <div className="status-txt-wrapper">
                    <p>판매액<span>10,000원</span></p>
                </div>
            </div>
        </div>
    );
}

export default SalesAmountStatus;