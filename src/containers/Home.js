import React, { Component } from 'react';

class Home extends Component {
    render() {
        return (
            <div className="carousel-inner" role="listbox">
                <div className="container">
                    <div id="tt" className="carousel-caption blank">
                        <h1>한국, 최초의 모바일 가구거리에<br/>
                            오신걸 환영합니다.<br/>
                        </h1>
                        <p>뻔뻐가구거리에 지금 바로 입주하시고 3개월간 무료로 상품등록 해보세요.</p>
                        <p>
                            <a className="btn btn-lg btn-primary" href="/user/register_1" role="button">회원가입 하로가기</a>
                        </p>
                    </div>
                </div>
                {/*<!-- Set background for slide in css -->*/}
                <div className="header-back one">
                </div>
            </div>
        );
    }
}

export default Home;