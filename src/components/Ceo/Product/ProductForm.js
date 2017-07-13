import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Spinner,
    SubTitle,
    FormLabel,
} from 'components/Common';
import SortableSelect from './SortableSelect';

class ProductForm extends Component {
    constructor(props) {
        super(props);

        this.changeHandler = this.changeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    
    handleSubmit() {

    }

    renderFirstSort(position) {
        switch(position) {
            case '거실':
                return (
                    <SortableSelect first={true} sortIndex={0} changeHandler={this.changeHandler} />
                );
            case '주방':
                return (
                    <SortableSelect first={true} sortIndex={1} changeHandler={this.changeHandler} />
                );
            case '침실':
                return (
                    <SortableSelect first={true} sortIndex={2} changeHandler={this.changeHandler} />
                );
            case '키즈/유아':
                return (
                    <SortableSelect first={true} sortIndex={3} changeHandler={this.changeHandler} />
                );
            case '학생/서재':
                return (
                    <SortableSelect first={true} sortIndex={4} changeHandler={this.changeHandler} />
                );
            case '화장실':
                return (
                    <SortableSelect first={true} sortIndex={5} changeHandler={this.changeHandler} />
                );
            default:   // 인테리어 소품
                return;
        }
    }

    renderSecondSort(first) {
        switch(first) {
            case '테이블':
                return (
                    <SortableSelect first={false} sortIndex={0} changeHandler={this.changeHandler} />
                );
            case '의자':
                return (
                    <SortableSelect first={false} sortIndex={1} changeHandler={this.changeHandler} />
                );
            case '소파':
                return (
                    <SortableSelect first={false} sortIndex={2} changeHandler={this.changeHandler} />
                );
            case '거실장':
                return (
                    <SortableSelect first={false} sortIndex={3} changeHandler={this.changeHandler} />
                );
            case '식탁 세트':
                return (
                    <SortableSelect first={false} sortIndex={4} changeHandler={this.changeHandler} />
                );
            case '식탁':
                return (
                    <SortableSelect first={false} sortIndex={4} changeHandler={this.changeHandler} />
                );
            case '홈 바':
                return (
                    <SortableSelect first={false} sortIndex={5} changeHandler={this.changeHandler} />
                );
            case '주방 수납장':
                return (
                    <SortableSelect first={false} sortIndex={6} changeHandler={this.changeHandler} />
                );
            case '침대':
                return (
                    <SortableSelect first={false} sortIndex={7} changeHandler={this.changeHandler} />
                );
            case '화장대':
                return (
                    <SortableSelect first={false} sortIndex={8} changeHandler={this.changeHandler} />
                );
            case '서랍장':
                return (
                    <SortableSelect first={false} sortIndex={9} changeHandler={this.changeHandler} />
                );
            case '수납장':
                return (
                    <SortableSelect first={false} sortIndex={10} changeHandler={this.changeHandler} />
                );
            case '책상/의자':
                return (
                    <SortableSelect first={false} sortIndex={11} changeHandler={this.changeHandler} />
                );
            case '침대(유아)':
                return (
                    <SortableSelect first={false} sortIndex={12} changeHandler={this.changeHandler} />
                );
            case '책상':
                return (
                    <SortableSelect first={false} sortIndex={13} changeHandler={this.changeHandler} />
                );
            case '의자(서재)':
                return (
                    <SortableSelect first={false} sortIndex={14} changeHandler={this.changeHandler} />
                );
            case '책장':
                return (
                    <SortableSelect first={false} sortIndex={15} changeHandler={this.changeHandler} />
                );
            default:
                return;
        }
    }

    render() {
        const {
            changeHandler,
            handleSubmit,
            renderFirstSort,
            renderSecondSort
        } = this;
        console.log(this.props.form.toJS());
        let positionSort = this.props.form.get('productPosition');
        let firstSort = this.props.form.get('firstSort');

        return (
            <div>
                <SubTitle title="제품 등록" />
                <div className="row">
                    <FormLabel name="제품명" />
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
                <div className="row">
                    <FormLabel name="위치" />
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
                <div className="row">
                    <FormLabel name="1차 분류" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        {renderFirstSort(positionSort)}
                    </div>
                </div>
                <div className="row">
                    <FormLabel name="2차 분류" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        {renderSecondSort(firstSort)}
                    </div>
                </div>
                <SubTitle title="제품 정보" />
                <div className="row">
                    <FormLabel name="모델명" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="modelName"
                            placeholder="-을 제외한 모델명을 적어주세요."
                            required
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <div className="row">
                    <FormLabel name="옵션" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <select
                            className="form-control"
                            name="firstSort"
                            onChange={changeHandler}
                        >
                        {/* CHECK 확인 필요 */}
                            <option>옵션 선택</option>
                            <option value="부분조립">부분조립</option>
                            <option value="완제품">완제품</option>
                            <option value="DIY">DIY</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <p className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-3">* 조립이 필요하시다면 설명서를 &lt;업체제공정보&gt;에 꼭 넣어주세요!</p>
                </div>
                {/* 색상 코드 or 네모의 색깔? */}
                <div className="row">
                    <FormLabel name="색상" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="productColor"
                            placeholder="색상을 적어주세요."
                            required
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <div className="row">
                    <FormLabel name="사이즈(가로)" />
                    <div className="col-md-5 col-xs-9 col-xs-offset-1 col-md-offset-0" style={{paddingRight: 5}}>
                        <input
                            type="number"
                            className="form-control"
                            name="sizeWidth"
                            placeholder="제품의 가로 길이를 적어주세요."
                            required
                            onChange={changeHandler}
                        />
                    </div>
                    <span className="col-md-1 col-xs-1 col-xs-offset-0 col-md-offset-0" style={{padding: 0, paddingTop: 10}}>
                        cm
                    </span>
                </div> 
                <div className="row">
                    <FormLabel name="사이즈(세로)" />
                    <div className="col-md-5 col-xs-9 col-xs-offset-1 col-md-offset-0" style={{paddingRight: 5}}>
                        <input
                            type="number"
                            className="form-control"
                            name="sizeDepth"
                            placeholder="제품의 세로 길이를 적어주세요."
                            required
                            onChange={changeHandler}
                        />
                    </div>
                    <span className="col-md-1 col-xs-1 col-xs-offset-0 col-md-offset-0" style={{padding: 0, paddingTop: 10}}>
                        cm
                    </span>
                </div>
                <div className="row">
                    <FormLabel name="사이즈(높이)" />
                    <div className="col-md-5 col-xs-9 col-xs-offset-1 col-md-offset-0" style={{paddingRight: 5}}>
                        <input
                            type="number"
                            className="form-control"
                            name="sizeHeight"
                            placeholder="제품의 높이를 적어주세요."
                            required
                            onChange={changeHandler}
                        />
                    </div>
                    <span className="col-md-1 col-xs-1 col-xs-offset-0 col-md-offset-0" style={{padding: 0, paddingTop: 10}}>
                        cm
                    </span>
                </div>
                <FormLabel name="주요 소재" />
                <div className="row">
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <textarea
                            style={{resize: 'none'}}
                            className="form-control"
                            name="mainMaterial"
                            placeholder="가구 '주요 소재'들을 적어주세요."
                            required
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <div className="row">
                    <FormLabel name="제조사" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="prManufacturer"
                            placeholder="제조 회사를 적어주세요."
                            required
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <div className="row">
                    <FormLabel name="원산지" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="productOrigin"
                            placeholder="소재 원산지를 적어주세요."
                            required
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <div className="row">
                    <FormLabel name="소비자가격" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="productPrice"
                            placeholder="소비자 가격을 적어주세요."
                            required
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <div className="row">
                    <FormLabel name="배송 및 반품/교환/AS 안내" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <textarea
                            style={{resize: 'none', width: '100%'}}
                            className="form-control"
                            name="asIntro"
                            placeholder="배송 및 밭품/AS에 관한 설명을 적어주세요."
                            required
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                 <div className="row form-box padding-top50">
                    <div className="btn-container">
                        <Link
                            to="/ceo"
                            className="btn btn-common btn-prev">취소하기
                        </Link>
                        <button
                            type="button"
                            className="btn btn-common btn-next"
                            onClick={handleSubmit}
                            ref={(btn) => { this.submitBtn = btn }}>제품등록
                        </button>
                    </div>
                </div>
            </div>
        );
    }

}

export default ProductForm;