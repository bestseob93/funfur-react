import React from 'react';

function EnterHeader({authInfo}) {
    const { ceoName, companyName, loginId } = authInfo;
    return (
        <div className="text-center">
            <p>{loginId}</p>
            <p>{companyName}</p>
            <p>{ceoName} 님</p>
            <p><strong>* 본인 확인을 위해 비밀번호를 입력해주세요 !</strong></p>
        </div>
    );
}

export default EnterHeader;