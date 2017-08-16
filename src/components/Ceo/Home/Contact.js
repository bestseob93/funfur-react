import React from 'react';

function Contact() {
    return (
        <div className="row ceo-home-contact">
            <div className="col-md-3 col-md-offset-1 col-xs-offset-0 col-xs-12">
                <div className="contact-time-wrapper">
                    <p className="contact-time">평일: 9AM - 6PM</p>
                    <p className="contact-time">점심: 1PM - 2PM</p>
                    <p className="contact-time">토요일: 10AM - 2PM</p>
                    <p className="contact-time text-red">(점심시간 없음)</p>
                </div>
            </div>
            <div className="col-md-6 col-md-offset-1 col-xs-offset-0 col-xs-12">
                <div className="company-profile-wrapper ceo-home">
                    <div className="row info-row">
                        <div className="company-address col-md-12 col-xs-12">
                        <img src={require('img/icon/office.svg')} alt="office" /><span>서울특별시 송파구 방이동 62-8 석정빌딩 502호</span>
                        </div>
                    </div>
                    <div className="row info-row">
                        <div className="company-phone col-md-6 col-xs-12">
                        <img src={require('img/icon/phone.svg')} alt="phone" /><span>050 . 6591 . 6200</span>
                        </div>
                        <div className="company-fax col-md-6 col-xs-12">
                        <img src={require('img/icon/fax.svg')} alt="fax" /><span>0504 . 433 . 6202</span>
                        </div>
                    </div>
                    <div className="row info-row">
                        <div className="company-email col-md-6 col-xs-12">
                            <img src={require('img/icon/email.svg')} alt="email" /><span>unit9251@naver.com</span>
                        </div>
                        <div className="company-kakao col-md-6 col-xs-12">
                            <img src={require('img/icon/kakaotalk.svg')} alt="kakao" /><span>뻔뻐</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;