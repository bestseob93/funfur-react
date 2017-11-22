import React from 'react';
import { Link } from 'react-router-dom';

function Footer(props) {
        return (
            <footer className="footer container">
                <section className="section">
                        <div className="m-b-lg list-container">
                            <div className="text-right">
                                <ul className="style">
                                    <li><a className="ns-L" target="_blank" rel="noopener noreferrer" href="http://intro.funfur.kr/">회사소개</a></li>
                                    <li><Link to="/Policy"><span className="ns-L">이용약관</span></Link></li>
                                    <li><span className="ns-L">개인정보 처리방침</span></li>
                                </ul>
                            </div>
                        </div>
                        <div>
                        <div className="funfur-line"></div>
                        <div className="row m-b-lg">
                            <div className="col-lg-4 col-lg-offset-3">
                                <p>
                                    {/*<!-- <img res="img/funfur-icon.png"> -->*/}
                                    <strong><span className="funfur-color">상호명: 뻔뻔한친구들</span></strong><br/> 대표: 유덕열 외 2명<br/> 주소: 서울특별시 광진구 군자로6길 22, 2층 202호 (화양동) <br/> 전화: 050-6591-6200 팩스: 0504-433-6202 <br/> 제휴문의: funfurofficial@gmail.com
                                </p>
                            </div>

                            <div className="col-lg-3">
                                <p className="text-color">

                                    <br/><br/> 사업자 번호: 435-15-00646<br/> 통신판매업 신고번호: 2017-서울광진-0996<br/> 문의 가능 시간: 평일 09:00 ~ 18:00
                                </p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-8 col-lg-offset-2 text-center m-t-lg m-b-lg">
                                <p><strong>&copy; 2017 Company 뻔뻐</strong></p>
                            </div>
                        </div>

                    </div>
                </section>
            </footer>
        );
}

export default Footer;