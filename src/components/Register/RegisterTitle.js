import React from 'react';

const RegisterTitle = () => {
    return (
        <div className="register-title">
            <h3>
                <span className="funfur-color">뻔뻐</span> 사장님사이트 이용약관 및 동의
            </h3>
            <p>아래의 이용약관을 읽고 동의 해주세요.</p>
            <ol>
                <li className="active"><span className="active-detail">1.</span> 약관 동의 ></li>
                <li>2. 정보 입력</li>
                <li>3. 승인 요청</li>
            </ol>
        </div>
    );
};

export default RegisterTitle;