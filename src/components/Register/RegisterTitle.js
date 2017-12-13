import React from 'react';

function RegisterTitle({title}) {
    if(title === 'policy') {
        return (
            <div className="register-title" style={{paddingTop: 25}}>
                <h3 className="ns-R">
                    <span className="funfur-color bm-dohyeon">뻔뻐</span> 사장님사이트 이용약관 및 동의
                </h3>
                <ol>
                    <li className="active ns-EB"><span className="active-detail">01.</span> 약관 동의 ></li>
                    <li>02. 정보 입력 ></li>
                    <li>03. 승인 요청</li>
                </ol>
                <p className="register-sub-desc">* 아래의 이용약관을 읽고 동의 해주세요.</p>
            </div>
        );
    } else if(title === 'form') {
        return (
            <div className="register-title" style={{paddingTop: 25}}>
                <h3 className="ns-R">
                    <span className="funfur-color bm-dohyeon">뻔뻐</span> 업체 / 사장님 정보 입력
                </h3>
                <ol>
                    <li>01. 약관 동의 ></li>
                    <li className="active ns-EB"><span className="active-detail">02.</span> 정보 입력 ></li>
                    <li>03. 승인 요청</li>
                </ol>
                <p className="register-sub-desc text-center">
                * 가입하신 정보는 회원님의 동의 없이 공개되지 않으며
                개인정보 보호정책에 의해 보호를 받습니다.</p>
            </div>
        );
    } else if(title === 'pending') {
        return (
            <div className="register-title" style={{paddingTop: 25}}>
                <h3 className="ns-R">
                    <span className="funfur-color bm-dohyeon">뻔뻐</span> 등록 요청 완료
                </h3>
                <ol>
                    <li>01. 약관 동의 ></li>
                    <li>02. 정보 입력 ></li>
                    <li className="active ns-EB"><span className="active-detail">03.</span> 등록요청 완료</li>
                </ol>
                <p className="register-sub-desc text-center">* 등록하신 아이디로 뻔뻐 사장님 사이트 로그인이 가능합니다.</p>
            </div>
        );
    }
};

export default RegisterTitle;