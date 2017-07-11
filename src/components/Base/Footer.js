import React from 'react';

function Footer() {
        return (
            <footer className="footer">
                <div className="section">
                    <div className="container">
                        <div className="row m-b-lg list-container">
                            <div className="col-lg-12 text-center" >
                                <ul className="style">
                                    <li><a target="_blank" rel="noopener noreferrer" href="http://intro.funfur.kr/">회사소개</a></li>
                                    <li><a href="#">이용약관</a></li>
                                    <li><a href="#">광고운영정책</a></li>
                                    <li><a href="#">개인정보 처리방침</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="funfur-line"></div>

                        <div className="row m-b-lg">
                            <div className="col-lg-4 col-lg-offset-3">
                                <p>
                                    {/*<!-- <img res="img/funfur-icon.png"> -->*/}
                                    <strong><span className="funfur-color">뻔뻐, Inc.</span></strong><br/> 대표: 유덕열 외 3명<br/> 주소: 서울시 송파구 방이동 62-8 석정빌딩 502호 <br/> 전화: 010-9251-6202 팩스: 0504-433-6202 <br/> 제휴문의: unit9251@naver.com
                                </p>
                            </div>

                            <div className="col-lg-3">
                                <p className="text-color">

                                    <br/><br/> 사업자 번호: 123-45-67890<br/> 통신판매업 신고번호: 서울 송파-1234호<br/> 문의 가능 시간: 평일 09:00 ~ 18:00
                                </p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-8 col-lg-offset-2 text-center m-t-lg m-b-lg">
                                <p><strong>&copy; 2017 Company 뻔뻐</strong></p>
                            </div>
                        </div>

                    </div>
                </div>
            </footer>
        );
}

export default Footer;