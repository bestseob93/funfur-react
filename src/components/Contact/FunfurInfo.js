import React from 'react';

function FunfurInfo() {
    return (
        <div className="col-md-6 col-xs-12">
            <div className="info-title-wrapper">
                <h3 className="funfur-info-title">
                    뻔뻐 문의
                </h3>
            </div>
            <div className="contact-time-wrapper">
                <p className="contact-time">평일: 9AM - 6PM</p>
                <p className="contact-time">점심: 1PM - 2PM</p>
                <p className="contact-time">토요일: 10AM - 2PM</p>
                <p className="contact-time text-red">(점심시간 없음)</p>
            </div>
            <div className="company-profile-wrapper">
                <div className="row">
                    <div className="company-address col-md-12 col-xs-12">
                       <img src={require('img/icon/office.svg')} /><span>서울특별시 송파구 방이동 62-8 석정빌딩 502호</span>
                    </div>
                </div>
                <div className="row">
                    <div className="company-phone col-md-6 col-xs-6">
                       <img src={require('img/icon/phone.svg')} /><span>050 . 6591 . 6200</span>
                    </div>
                    <div className="company-fax col-md-6 col-xs-6">
                       <img src={require('img/icon/fax.svg')} /><span>0504 . 433 . 6202</span>
                    </div>
                </div>
                <div className="row">
                    <div className="company-email col-md-6 col-xs-6">
                        <img src={require('img/icon/email.svg')} /><span>unit9251@naver.com</span>
                    </div>
                    <div className="company-kakao col-md-6 col-xs-6">
                        <img src={require('img/icon/kakaotalk.svg')} /><span>뻔뻐</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FunfurInfo;