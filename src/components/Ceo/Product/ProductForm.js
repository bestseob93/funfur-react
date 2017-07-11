import React, { Component } from 'react';
import {
    SubTitle,
    FormLabel,
} from 'components/Common';

const firstSortEnum = [['테이블', '의자', '소파', '거실장'], // 거실
                       ['식탁 세트', '식탁', '식탁 의자', '홈 바', '주방 수납장'], // 주방
                       ['침대', '화장대', '서랍장', '옷장', '협탁'], // 침실
                       ['수납장', '책상/의자', '침대'], // 키즈/유아
                       ['책상', '의자', '책장', '테이블', '수납장'], // 학생/서재
                       ['세면대', '욕실 수납', '기타 욕실 용품']]; // 화장실

const secondSortEnum = [['소파 테이블', '사이드 테이블', '접이식 테이블', '좌식 테이블'],
                        ['테이블 체어', '암체어', '좌식 의자', '접이식 의자', '스툴', '기타'],
                        ['1인 소파', '2-3인 소파', '4인 소파', '5인 이상', '리클라이너 소파', '소파베드', '스툴'],
                        ['TV장', '장식장&진열장', '수납장', '책장'],
                        ['2인', '4인', '6인'],
                        ['-'],
                        ['테이블&체어', '테이블', '체어'],
                        ['벽 선반', '선반 수납장', '서랍 수납장', '렌지 수납장', '기타 수납장'],
                        ['-'],
                        ['싱글', '슈퍼싱글', '퀸', '킹', '패밀리', '유아/아동', '소파 베드', '접이식 침대'],
                        ['화장대 셋트', '화장대', '의자', '좌석/미니 화장대'],
                        ['미니', '3단', '5단', '와이드'],
                        ['책장', '장난감 수납장', '옷장/서랍장'],
                        ['세트', '책상', '의자'],
                        ['유아', '아기'],
                        ['책상&의자', '컴퓨터 책상', '독서실 책상', 'h형 책상', '전면 책상', '일반 책상', '좌식 책상'],
                        ['아동용 의자', '오피스 체어', '메쉬 의자', '가죽 의자', '패브릭 의자', '좌식 의자', '플라스틱 의자'],
                        ['1단', '2단', '3단', '4단', '5단 이상']];

class ProductForm extends Component {
    constructor(props) {
        super(props);

        this.changeHandler = this.changeHandler.bind(this);
        this.renderFirstSort = this.renderFirstSort.bind(this);
        this.renderSecondSort = this.renderSecondSort.bind(this);
    }

    componentDidMount() {
        const { FormActions } = this.props;
        FormActions.formReset('product');
    }

    changeHandler(ev) {
        const { FormActions } = this.props;
        FormActions.formChange({
            formName: 'product',
            name: ev.target.name,
            value: ev.target.value
        });
    }

    renderFirstSort(position) {
        switch(position) {
            case '거실':
                return (
                    <select
                        className="form-control"
                        name="firstSort"
                        onChange={this.changeHandler}
                    >
                    {firstSortEnum[0].map((value) => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                    </select>
                );
            case '주방':
                return (
                    <select
                        className="form-control"
                        name="firstSort"
                        onChange={this.changeHandler}
                    >
                    {firstSortEnum[1].map((value) => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                    </select>
                );
            case '침실':
                return (
                    <select
                        className="form-control"
                        name="firstSort"
                        onChange={this.changeHandler}
                    >
                    {firstSortEnum[2].map((value) => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                    </select>
                );
            case '키즈/유아':
                return (
                    <select
                        className="form-control"
                        name="firstSort"
                        onChange={this.changeHandler}
                    >
                    {firstSortEnum[3].map((value) => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                    </select>
                );
            case '학생/서재':
                return (
                    <select
                        className="form-control"
                        name="firstSort"
                        onChange={this.changeHandler}
                    >
                    {firstSortEnum[4].map((value) => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                    </select>
                );
            case '화장실':
                return (
                    <select
                        className="form-control"
                        name="firstSort"
                        onChange={this.changeHandler}
                    >
                    {firstSortEnum[5].map((value) => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                    </select>
                );
            default:   // 인테리어 소품
                return;
        }
    }

    renderSecondSort(first) {
        switch(first) {
            case '테이블':
                return (
                    <select
                        className="form-control"
                        name="secondSort"
                        onChange={this.changeHandler}
                    >
                    {secondSortEnum[0].map((value) => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                    </select>
                );
            case '의자':
                return (
                    <select
                        className="form-control"
                        name="secondSort"
                        onChange={this.changeHandler}
                    >
                    {secondSortEnum[1].map((value) => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                    </select>
                );
            case '소파':
                return (
                    <select
                        className="form-control"
                        name="secondSort"
                        onChange={this.changeHandler}
                    >
                    {secondSortEnum[2].map((value) => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                    </select>
                );
            case '거실장':
                return (
                    <select
                        className="form-control"
                        name="secondSort"
                        onChange={this.changeHandler}
                    >
                    {secondSortEnum[3].map((value) => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                    </select>
                );
            case '식탁 세트':
                return (
                    <select
                        className="form-control"
                        name="secondSort"
                        onChange={this.changeHandler}
                    >
                    {secondSortEnum[4].map((value) => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                    </select>
                );
            case '식탁':
                return (
                    <select
                        className="form-control"
                        name="secondSort"
                        onChange={this.changeHandler}
                    >
                    {secondSortEnum[4].map((value) => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                    </select>
                );
            case '홈 바':
                return (
                    <select
                        className="form-control"
                        name="secondSort"
                        onChange={this.changeHandler}
                    >
                    {secondSortEnum[6].map((value) => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                    </select>
                );
            case '주방 수납장':
                return (
                    <select
                        className="form-control"
                        name="secondSort"
                        onChange={this.changeHandler}
                    >
                    {secondSortEnum[7].map((value) => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                    </select>
                );
            case '침대':
                return (
                    <select
                        className="form-control"
                        name="secondSort"
                        onChange={this.changeHandler}
                    >
                    {secondSortEnum[9].map((value) => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                    </select>
                );
            case '화장대':
                return (
                    <select
                        className="form-control"
                        name="secondSort"
                        onChange={this.changeHandler}
                    >
                    {secondSortEnum[10].map((value) => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                    </select>
                );
            case '서랍장':
                return (
                    <select
                        className="form-control"
                        name="secondSort"
                        onChange={this.changeHandler}
                    >
                    {secondSortEnum[11].map((value) => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                    </select>
                );
        }
    }

    render() {
        const {
            changeHandler,
            renderFirstSort,
            renderSecondSort
        } = this;
        let positionSort = this.props.form.get('productPosition');
        let firstSort = this.props.form.get('firstSort');

        return (
            <div>
                <SubTitle title="제품 등록" />
                <FormLabel name="제품명" />
                <div className="row">
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="productName"
                            placeholder="제품명을 적어주세요."
                            required
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <SubTitle title="제품 분류" />
                <FormLabel name="위치" />
                <div className="row">
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <select
                            className="form-control"
                            name="productPosition"
                            onChange={changeHandler}
                        >
                            <option>공간별 분류</option>
                            <option value="거실">거실</option>
                            <option value="주방">주방</option>
                            <option value="침실">침실</option>
                            <option value="키즈/유아">키즈/유아</option>
                            <option value="학생/서재">학생/서재</option>
                            <option value="인테리어 소품">인테리어 소품</option>
                            <option value="화장실">화장실</option>
                        </select>
                    </div>
                </div>
                <FormLabel name="1차 분류" />
                <div className="row">
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        {renderFirstSort(positionSort)}
                    </div>
                </div>
                <FormLabel name="2차 분류" />
                <div className="row">
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        {renderSecondSort(firstSort)}
                    </div>
                </div>
                <SubTitle title="제품 정보" />
                <FormLabel name="모델명" />
                <div className="row">
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="modelName"
                            placeholder="제품명을 적어주세요."
                            required
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <FormLabel name="옵션" />
                <div className="row">
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="modelOption"
                            placeholder="제품명을 적어주세요."
                            required
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                {/* hex 코드로 넣어보기 */}
                <FormLabel name="색상" />
                <div className="row">
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="productColor"
                            placeholder="제품명을 적어주세요."
                            required
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <FormLabel name="사이즈(가로)" />
                <div className="row">
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="sizeWidth"
                            placeholder="제품명을 적어주세요."
                            required
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <FormLabel name="사이즈(세로)" />
                <div className="row">
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="sizeDepth"
                            placeholder="제품명을 적어주세요."
                            required
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <FormLabel name="사이즈(높이)" />
                <div className="row">
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="sizeHeight"
                            placeholder="제품명을 적어주세요."
                            required
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <FormLabel name="주요 소재" />
                <div className="row">
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="mainMaterial"
                            placeholder="제품명을 적어주세요."
                            required
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <FormLabel name="제조사" />
                <div className="row">
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="prManufacturer"
                            placeholder="제품명을 적어주세요."
                            required
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <FormLabel name="원산지" />
                <div className="row">
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="productOrigin"
                            placeholder="제품명을 적어주세요."
                            required
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <FormLabel name="소비자가격" />
                <div className="row">
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="productPrice"
                            placeholder="제품명을 적어주세요."
                            required
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <FormLabel name="배송 및 반품/교환/AS 안내" />
                <div className="row">
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="asIntro"
                            placeholder="제품명을 적어주세요."
                            required
                            onChange={changeHandler}
                        />
                    </div>
                </div>
            </div>
        );
    }

}

export default ProductForm;