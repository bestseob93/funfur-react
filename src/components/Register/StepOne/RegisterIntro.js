import React from 'react';
import { Link } from 'react-router-dom';

function RegisterIntro() {
    return (
        <div className="container register-intro">
            <h4 className="register-intro-advantage text-center ns-B">
                뻔뻐와 함께하신다면..
            </h4>
            <div className="intro-image-wrapper row">
                <div className="col-md-4 text-center intro-box">
                    <div className="intro-images" id="intro-1"></div>
                    <h4 className="intro-txt"><span className="ns-EB">01. </span> <span className="ns-R" style={{fontSize: 14}}>모바일 가구거리에<br/> 입주할 수 있습니다.</span></h4>
                </div>
                <div className="col-md-4 text-center intro-box">
                    <div className="intro-images" id="intro-2"></div>
                    <h4 className="intro-txt"><span className="ns-EB">02.</span> <span className="ns-R" style={{fontSize: 14}}>뻔뻐의 광고효과를<br/> 누릴 수 있습니다.</span></h4>
                </div>
                <div className="col-md-4 text-center intro-box">
                    <div className="intro-images" id="intro-3"></div>
                    <h4 className="intro-txt"><span className="ns-EB">03.</span> <span className="ns-R" style={{fontSize: 14}}>가구 관련 각종 정보를<br/> 받아볼 수 있습니다.</span></h4>
                </div>                
            </div>
            <div className="text-container">
                <p className="text-center intro-contents ns-B" style={{marginBottom: 0}}>* 가구 소매/도매 업체를 운영 중이신 사장님만 가입이 가능합니다. *</p>
                <p className="text-center intro-contents ns-R" style={{marginTop: 0, right: 30}}>가입 승인 후, 서비스 이용 가능하십니다.</p>
            </div>
            <p className="text-center"><Link className="btn register-btn funfur-btn ns-EB" to="/register_2" style={{border: 0}}>회 원 가 입</Link></p>
        </div>
    );
};

export default RegisterIntro;