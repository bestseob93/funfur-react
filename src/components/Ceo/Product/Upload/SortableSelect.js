import React from 'react';

const firstSortEnum = [['테이블', '의자', '소파', '거실장'], // 거실
                       ['식탁 세트', '식탁', '식탁 의자', '홈 바', '주방 수납장'], // 주방
                       ['침대', '화장대', '서랍장', '옷장', '협탁'], // 침실
                       ['수납장', '책상/의자', '침대(유아)'], // 키즈/유아
                       ['책상', '의자(서재)', '책장', '테이블', '수납장'], // 학생/서재
                       ['세면대', '욕실 수납', '기타 욕실 용품']]; // 화장실

const secondSortEnum = [['소파 테이블', '사이드 테이블', '접이식 테이블', '좌식 테이블'],
                        ['테이블 체어', '암체어', '좌식 의자', '접이식 의자', '스툴', '기타'],
                        ['1인 소파', '2-3인 소파', '4인 소파', '5인 이상', '리클라이너 소파', '소파베드', '스툴'],
                        ['TV장', '장식장&진열장', '수납장', '책장'],
                        ['2인', '4인', '6인'],
                        ['테이블&체어', '테이블', '체어'],
                        ['벽 선반', '선반 수납장', '서랍 수납장', '렌지 수납장', '기타 수납장'],
                        ['싱글', '슈퍼싱글', '퀸', '킹', '패밀리', '유아/아동', '소파 베드', '접이식 침대'],
                        ['화장대 셋트', '화장대', '의자', '좌석/미니 화장대'],
                        ['미니', '3단', '5단', '와이드'],
                        ['책장', '장난감 수납장', '옷장/서랍장'],
                        ['세트', '책상', '의자'],
                        ['유아', '아기'],
                        ['책상&의자', '컴퓨터 책상', '독서실 책상', 'h형 책상', '전면 책상', '일반 책상', '좌식 책상'],
                        ['아동용 의자', '오피스 체어', '메쉬 의자', '가죽 의자', '패브릭 의자', '좌식 의자', '플라스틱 의자'],
                        ['1단', '2단', '3단', '4단', '5단 이상']];

function SortableSelect({isSecondSortable, first, sortIndex, changeHandler, formValue}) {
    if(first) {
        return (
            <select
                className="form-control"
                name={isSecondSortable ? 'firstSort_2' : 'firstSort_1'}
                onChange={changeHandler}
            >
                <option>1차 분류를 선택해주세요</option>
            {firstSortEnum[sortIndex].map((value) => (
                <option key={value} value={value}>{value}</option>
            ))}
            </select>
        );
    } else {
        return (
            <select
                className="form-control"
                name={isSecondSortable ? 'secondSort_2' : 'secondSort_1'}
                onChange={changeHandler}
            >
                <option>2차 분류를 선택해주세요</option>
            {secondSortEnum[sortIndex].map((value) => (
                <option key={value} value={value}>{value}</option>
            ))}
            </select>    
        );
    }

}

export default SortableSelect;