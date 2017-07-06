import React from 'react';

const RegisterTitle = ({title}) => {
    console.log(title);
    let contents;
    if(title === 'policy') {
        return (
            <div className="register-title">
                <h3>
                    <span className="funfur-color">뻔뻐</span> 사장님사이트 이용약관 및 동의
                </h3>
                <p>아래의 이용약관을 읽고 동의 해주세요.</p>
                <ol>
                    <li className="active"><span className="active-detail">01.</span> 약관 동의 ></li>
                    <li>02. 정보 입력 ></li>
                    <li>03. 승인 요청</li>
                </ol>
            </div>
        );
    } else if(title === 'form') {
        return (
            <div className="register-title">
                <h3>
                    사장님 정보입력
                </h3>
                <p>가입하신 정보는 회원님의 동의 없이 공개되지 않으며, <br/>개인정보 보호정책에 의해 보호를 받습니다.</p>
                <ol>
                    <li>01. 약관 동의 ></li>
                    <li className="active"><span className="active-detail">02.</span> 정보 입력 ></li>
                    <li>03. 승인 요청</li>
                </ol>
            </div>
        );
    } else if(title === 'pending') {
        return (
            <div className="register-title">
                <h3>
                    사장님 정보입력
                </h3>
                <p>등록하신 아이디로 뻔뻐 사장님 사이트 로그인이 가능합니다.<br/>
                뻔뻐에서 2일 내에 가입하신 휴대폰번호로 전화 드릴예정입니다. 항상 최선의<br/>
                서비스로 보답하는[<span className="funfur-color">뻔.뻐</span>]가 되겠습니다.
                </p>
                <ol>
                    <li>01. 약관 동의 ></li>
                    <li>02. 정보 입력 ></li>
                    <li className="active"><span className="active-detail">03.</span> 승인 요청</li>
                </ol>
            </div>
        );
    }
};

export default RegisterTitle;