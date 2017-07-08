import React from 'react';
import { Link } from 'react-router-dom';

function RegisterIntro() {
    return (
        <div className="container register-intro">
            <h3 className="register-intro-advantage text-center">
                뻔뻐에 가입하시면
            </h3>
            <div className="intro-image-wrapper row">
                <div className="col-md-4 text-center intro-box">
                    <div className="intro-images" id="intro-1"></div>
                    <h4 className="intro-txt"><span className="funfur-color">01. </span> 모바일 가구거리에<br/>입주할 수 있습니다.</h4>
                </div>
                <div className="col-md-4 text-center intro-box">
                    <div className="intro-images" id="intro-2"></div>
                    <h4 className="intro-txt"><span className="funfur-color">02.</span> 뻔뻐의 광고효과를<br/>누릴 수 있습니다.</h4>
                </div>
                <div className="col-md-4 text-center intro-box">
                    <div className="intro-images" id="intro-3"></div>
                    <h4 className="intro-txt"><span className="funfur-color">03.</span> 가구 관련 각종 정보를<br/> 받아볼 수 있습니다.</h4>
                </div>                
            </div>
            <p className="text-center intro-contents" style={{marginBottom: 0}}>가구 소매/도매 업체를 운영 중이신 사장님만 가입이 가능합니다.</p>
            <p className="text-center intro-contents" style={{marginTop: 0}}>가입 승인 후, 서비스 이용 가능하십니다.</p>
            <p className="text-center"><Link className="btn register-btn funfur-btn" to="/register_2">회원가입</Link></p>
        </div>
    );
};

export default RegisterIntro;