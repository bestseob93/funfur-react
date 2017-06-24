import React from 'react';

const RegisterIntro = () => {
    return (
        <div className="container register-intro">
            <h3 className="register-intro-advantage text-center">
                뻔뻐에 가입하시면
            </h3>
            <div className="intro-image-wrapper row">
                <div className="col-md-4 text-center intro-box">
                    <div className="intro-images" id="intro-1"></div>
                    <p>1. 모바일 가구거리에 입주할 수 있습니다.</p>
                </div>
                <div className="col-md-4 text-center intro-box">
                    <div className="intro-images" id="intro-2"></div>
                    <p>2. 뻔뻐의 광고효과를 누릴 수 있습니다.</p>
                </div>
                <div className="col-md-4 text-center intro-box">
                    <div className="intro-images" id="intro-3"></div>
                    <p>3. 가구 관련 각종 정보를 받아볼 수 있습니다.</p>
                </div>                
            </div>
            <p className="text-center intro-contents">가구 소매/도매 업체를 운영 중이신 사장님만 가입이 가능합니다.</p>
            <p className="text-center intro-contents">가입 승인 후, 서비스 이용 가능하십니다.</p>
            <button type="button" className="btn register-btn">다음</button>
        </div>
    );
};

export default RegisterIntro;