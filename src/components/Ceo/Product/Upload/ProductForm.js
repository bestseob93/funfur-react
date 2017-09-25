import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
    Spinner,
    SubTitle,
    FormLabel,
} from 'components/Common';
import {
    PositionSelect,
    SortableSelect,
    PhotosUpload,
    DeliveryTable
} from 'components/Ceo/Product';

class ProductForm extends Component {
    constructor(props) {
        super(props);

        this.changeHandler = this.changeHandler.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderPosition = this.renderPosition.bind(this);
        this.renderFirstSort = this.renderFirstSort.bind(this);
        this.renderSecondSort = this.renderSecondSort.bind(this);
        this.renderSortTwo = this.renderSortTwo.bind(this);
    }

    componentDidMount() {
        const { FormActions } = this.props;
        FormActions.formReset('product');
        // TODO 임시 저장 로직 구현 필요
    }

    /* input 값에 따라 redux에 form store 값 업데이트 */
    changeHandler(ev) {
        const { FormActions } = this.props;

        FormActions.formChange({
            formName: 'product',
            name: ev.target.name,
            value: ev.target.value
        });
        console.log(ev.target.name);
        console.log(this.props.form.get('isDeliverFree'));

        /* 배송비 종류 선택하는 곳 free 일 경우 기존 배송비 입력된 값 초기화 */
        if(ev.target.name === 'isDeliverFree' && this.costSelect.value === 'free') {
            FormActions.deliverCostFree();
        }
    }

    componentWillReceiveProps(nextProps) {
        const { FormActions } = this.props;
        if(this.props.form.get('productPosition') !== nextProps.form.get('productPosition')) {
            FormActions.formChange({
                formName: 'product',
                name: 'firstSort_1',
                value: ''
            });
        }
        if(this.props.form.get('productPosition_2') !== nextProps.form.get('productPosition_2')) {
            FormActions.formChange({
                formName: 'product',
                name: 'firstSort_2',
                value: ''
            });
        }
    }

    /* 전 지역 배송비용 동일 체크박스 */
    handleCheckBox(ev) {
        const { FormActions, form } = this.props;
        
        FormActions.handleCheckBox({
            formName: 'product',
            name: ev.target.name,
            value: ev.target.checked
        });

        /* 체크하고 1초 뒤에 전 지역 첫 번째 입력 값으로 통일 */
        setTimeout(() => {
            if(this.props.form.get('isCostSame')) {
                const formName = ['GangWon', 'ChungNam', 'ChungBuk', 'GyeongBuk', 'GyeongNam', 'JeonBuk', 'JeonNam', 'JeJuSanGan'];
                for(let i=0; i<8; i++) {
                FormActions.formChange({
                        formName: 'product',
                        name: formName[i],
                        value: form.get('SeoulGyungki')
                    });
                }
            }
        }, 1000);
    }

    /* 배송비 같을 때 나머지 form 값 변경 */
    handleBlur(ev) {
        const { FormActions, form } = this.props;
        const formName = ['GangWon', 'ChungNam', 'ChungBuk', 'GyeongBuk', 'GyeongNam', 'JeonBuk', 'JeonNam', 'JeJuSanGan'];
        for(let i=0; i<8; i++) {
            FormActions.formChange({
                formName: 'product',
                name: formName[i],
                value: form.get('SeoulGyungki')
            });
        }
    }
    
    /* 제품 등록 요청 */
    async handleSubmit(ev) {
        const { UiActions, ProductActions, form } = this.props;
        const productInfo = {
            productName: form.get('productName'),
            productPosition: form.get('productPosition'),
            firstSort_1: form.get('firstSort_1'),
            secondSort_1: form.get('secondSort_1'),
            productPosition_2: form.get('productPosition_2') || '',
            firstSort_2: form.get('firstSort_2') || '',
            secondSort_2: form.get('secondSort_2') || '',
            modelName: form.get('modelName'),
            modelOption: form.get('modelOption'),
            productColor: form.get('productColor'),
            sizeWidth: form.get('sizeWidth'),
            sizeDepth: form.get('sizeDepth'),
            sizeHeight: form.get('sizeHeight'),
            mainMaterial: form.get('mainMaterial'),
            prManufacturer: form.get('prManufacturer'),
            productOrigin: form.get('productOrigin'),
            productPrice: form.get('productPrice'),
            asIntro: form.get('asIntro'),
            productImages: form.get('productImages'),
            isDeliverFree: form.get('isDeliverFree'),
            SeoulGyungki: form.get('isDeliverFree') === 'free' ? '0' : form.get('SeoulGyungki'),
            GangWon: form.get('isDeliverFree') === 'free' ? '0' : form.get('GangWon'),
            ChungNam: form.get('isDeliverFree') === 'free' ? '0' : form.get('ChungNam'),
            ChungBuk: form.get('isDeliverFree') === 'free' ? '0' : form.get('ChungBuk'),
            GyeongBuk: form.get('isDeliverFree') === 'free' ? '0' : form.get('GyeongBuk'),
            GyeongNam: form.get('isDeliverFree') === 'free' ? '0' : form.get('GyeongNam'),
            JeonBuk: form.get('isDeliverFree') === 'free' ? '0' : form.get('JeonBuk'),
            JeonNam: form.get('isDeliverFree') === 'free' ? '0' : form.get('JeonNam'),
            JeJuSanGan: form.get('isDeliverFree') === 'free' ? '0' : form.get('JeJuSanGan'),
            isCostSame: form.get('isCostSame') && form.get('isCostSame')
        };

        try {
            await ProductActions.productUpload(productInfo);
            if(this.props.valid.upload) {
                UiActions.showSweetAlert({
                    message: '제품이 성공적으로 등록되었습니다!'
                });
                this.props.history.push('/ceo');
            }
        } catch (e) {
            if(e) {
                throw e;
            }
        }
    }

    renderPosition(isFirstSortable) {
        if(isFirstSortable) {
            return (
                <PositionSelect first={true} changeHandler={this.changeHandler} formValue={this.props.form.get('productPosition')} />
            );
        } else {
            return (
                <PositionSelect first={false} changeHandler={this.changeHandler} formValue={this.props.form.get('productPosition')} />
            );
        }
    }

    /* 위치 관련 첫번째 분류 렌더링 */
    renderFirstSort(isFirstSortable, position) {
        if(isFirstSortable) {
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
        } else {
            switch(position) {
                case '거실':
                    return (
                        <SortableSelect isSecondSortable={true} first={true} sortIndex={0} changeHandler={this.changeHandler} />
                    );
                case '주방':
                    return (
                        <SortableSelect isSecondSortable={true} first={true} sortIndex={1} changeHandler={this.changeHandler} />
                    );
                case '침실':
                    return (
                        <SortableSelect isSecondSortable={true} first={true} sortIndex={2} changeHandler={this.changeHandler} />
                    );
                case '키즈/유아':
                    return (
                        <SortableSelect isSecondSortable={true} first={true} sortIndex={3} changeHandler={this.changeHandler} />
                    );
                case '학생/서재':
                    return (
                        <SortableSelect isSecondSortable={true} first={true} sortIndex={4} changeHandler={this.changeHandler} />
                    );
                case '화장실':
                    return (
                        <SortableSelect isSecondSortable={true} first={true} sortIndex={5} changeHandler={this.changeHandler} />
                    );
                default:   // 인테리어 소품
                    return;
            }
        }
    }

    /* 위치 관련 두번째 분류 렌더링 */
    renderSecondSort(isFirstSortable, first) {
        if(isFirstSortable) {
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
        } else {
            switch(first) {
                case '테이블':
                    return (
                        <SortableSelect isSecondSortable={true} first={false} sortIndex={0} changeHandler={this.changeHandler} />
                    );
                case '의자':
                    return (
                        <SortableSelect isSecondSortable={true} first={false} sortIndex={1} changeHandler={this.changeHandler} />
                    );
                case '소파':
                    return (
                        <SortableSelect isSecondSortable={true} first={false} sortIndex={2} changeHandler={this.changeHandler} />
                    );
                case '거실장':
                    return (
                        <SortableSelect isSecondSortable={true} first={false} sortIndex={3} changeHandler={this.changeHandler} />
                    );
                case '식탁 세트':
                    return (
                        <SortableSelect isSecondSortable={true} first={false} sortIndex={4} changeHandler={this.changeHandler} />
                    );
                case '식탁':
                    return (
                        <SortableSelect isSecondSortable={true} first={false} sortIndex={4} changeHandler={this.changeHandler} />
                    );
                case '홈 바':
                    return (
                        <SortableSelect isSecondSortable={true} first={false} sortIndex={5} changeHandler={this.changeHandler} />
                    );
                case '주방 수납장':
                    return (
                        <SortableSelect isSecondSortable={true} first={false} sortIndex={6} changeHandler={this.changeHandler} />
                    );
                case '침대':
                    return (
                        <SortableSelect isSecondSortable={true} first={false} sortIndex={7} changeHandler={this.changeHandler} />
                    );
                case '화장대':
                    return (
                        <SortableSelect isSecondSortable={true} first={false} sortIndex={8} changeHandler={this.changeHandler} />
                    );
                case '서랍장':
                    return (
                        <SortableSelect isSecondSortable={true} first={false} sortIndex={9} changeHandler={this.changeHandler} />
                    );
                case '수납장':
                    return (
                        <SortableSelect isSecondSortable={true} first={false} sortIndex={10} changeHandler={this.changeHandler} />
                    );
                case '책상/의자':
                    return (
                        <SortableSelect isSecondSortable={true} first={false} sortIndex={11} changeHandler={this.changeHandler} />
                    );
                case '침대(유아)':
                    return (
                        <SortableSelect isSecondSortable={true} first={false} sortIndex={12} changeHandler={this.changeHandler} />
                    );
                case '책상':
                    return (
                        <SortableSelect isSecondSortable={true} first={false} sortIndex={13} changeHandler={this.changeHandler} />
                    );
                case '의자(서재)':
                    return (
                        <SortableSelect isSecondSortable={true} first={false} sortIndex={14} changeHandler={this.changeHandler} />
                    );
                case '책장':
                    return (
                        <SortableSelect isSecondSortable={true} first={false} sortIndex={15} changeHandler={this.changeHandler} />
                    );
                default:
                    return;
            }
        }
    }

    renderSortTwo() {
        const { UiActions, FormActions } = this.props;
        console.log(this.props.form.get('productPosition'));
        if(this.props.isSecondSortable) {
                UiActions.removeSecondSortable();  // - 누르면 두 번째 위치 추가 삭제.
                FormActions.resetSecondSortable();
        } else {
            if(this.props.form.get('productPosition') === '') {
                alert("첫번째 위치를 먼저 추가해주세요!");
            } else {
                UiActions.addSecondSortable(); // + 누르면 두 번째 위치 추가 추가.
            }
        }
    }

    render() {
        const {
            changeHandler,
            handleCheckBox,
            handleBlur,
            handleSubmit,
            renderPosition,
            renderFirstSort,
            renderSecondSort,
            renderSortTwo
        } = this;

        const emptyComponent = undefined;

        return (
            <div>
                {/* 스피너 */}
                { this.props.status.upload.get('fetching') && (<Spinner/>) }
                <SubTitle title="제품 등록" />
                <div className="row form-box">
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
                <div className="row form-box">
                    {/* TODO: 동적으로 바꾸고, 첫번째에 선택된 값 배열에서 빼기 */}
                    <FormLabel name="위치" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        {renderPosition(true)}
                    </div>
                </div>
                <div className="row form-box">
                    <FormLabel name="1차 분류" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        { 
                            renderFirstSort(true, this.props.form.get('productPosition')) /* 분류 값에 따라 하위 분류 */
                        } 
                    </div>
                </div>
                <div className="row form-box">
                    <FormLabel name="2차 분류" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        {
                            renderSecondSort(true, this.props.form.get('firstSort_1'))
                        }
                    </div>
                </div>
                <div className="row text-center">
                    <p><i
                            className={`fa ${this.props.isSecondSortable ? 'fa-minus-circle' :'fa-plus-circle'} fa-2x`}
                            style={{cursor: 'pointer'}}
                            onClick={renderSortTwo}>
                        </i>
                    </p>
                </div>
                {this.props.isSecondSortable ?
                    <div className="row form-box animated fadeInUp">
                        <FormLabel name="위치" />
                        <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                            {renderPosition(false)}
                        </div>
                    </div> :
                    emptyComponent
                }
                {this.props.isSecondSortable ?
                    <div className="row form-box animated fadeInUp">
                        <FormLabel name="1차 분류" />
                        <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                            {renderFirstSort(false, this.props.form.get('productPosition_2')) /* 분류 값에 따라 하위 분류 */} 
                        </div>
                    </div> :
                    emptyComponent
                }
                {this.props.isSecondSortable ?
                    <div className="row form-box animated fadeInUp">
                        <FormLabel name="2차 분류" />
                        <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                            {renderSecondSort(false, this.props.form.get('firstSort_2'))}
                        </div>
                    </div> :
                    emptyComponent
                }
                <SubTitle title="제품 정보" />
                <div className="row form-box">
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
                <div className="row form-box">
                    <FormLabel name="옵션" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <select
                            className="form-control"
                            name="modelOption"
                            value={this.props.form.get('modelOption')}
                            onChange={changeHandler}
                        >
                            <option>옵션 선택</option>
                            <option value="부분조립">부분조립</option>
                            <option value="완제품">완제품</option>
                            <option value="DIY">DIY</option>
                        </select>
                    </div>
                </div>
                <div className="row form-box">
                    <p className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-3">* 조립이 필요하시다면 설명서를 &lt;업체제공정보&gt;에 꼭 넣어주세요!</p>
                </div>
                {/* 색상 코드 or 네모의 색깔? */}
                <div className="row form-box">
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
                <div className="row form-box">
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
                <div className="row form-box">
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
                <div className="row form-box">
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
                <div className="row form-box has-textarea">
                    <FormLabel name="주요 소재" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <textarea
                            style={{resize: 'none', height: 130}}
                            className="form-control"
                            name="mainMaterial"
                            placeholder="가구 '주요 소재'들을 적어주세요."
                            required
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <div className="row form-box">
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
                <div className="row form-box">
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
                <div className="row form-box">
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
                <SubTitle title="배송 정보" />
                <div className="row form-box">
                    <FormLabel name="배송비" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <select
                            ref={(select) => this.costSelect = select}
                            className="form-control"
                            name="isDeliverFree"
                            value={this.props.form.get('isDeliverFree')}
                            onChange={changeHandler}
                        >
                            <option value="">배송비 선택</option>
                            <option value="free">무료</option>
                            <option value="unfree">유료</option>
                        </select>
                    </div>
                </div>
                {/* 배송비 선택하기 전과 무료일 경우 테이블 hide 유료일 경우에만 show */}
                { this.props.form.get('isDeliverFree') === '' ? emptyComponent : this.props.form.get('isDeliverFree') === 'free' ? emptyComponent :
                    <div className="row form-box">
                        <FormLabel name="지역별 배송비 설정" />
                        <DeliveryTable
                            form={this.props.form}
                            sameCost={this.props.form.get('SeoulGyungki')}
                            changeHandler={changeHandler}
                            handleBlur={handleBlur}
                        />
                    </div>
                }
                { this.props.form.get('isDeliverFree') === '' ? emptyComponent : this.props.form.get('isDeliverFree') === 'free' ? emptyComponent : 
                    <p className="row">
                        <span className="col-md-3 col-xs-8 col-xs-offset-1 col-md-offset-3">* 전 지역 동일 시 체크해주세요.</span>
                        <input
                            className="col-md-1 col-xs-1"
                            type="checkbox"
                            name="isCostSame"
                            onChange={handleCheckBox}
                        />
                    </p>

                }
                { this.props.form.get('isDeliverFree') === '' ? emptyComponent : this.props.form.get('isDeliverFree') === 'free' ? emptyComponent :
                    <p className="row delivery-warning">
                        <span className="col-md-6 col-xs-10 col-md-offset-3 col-xs-offset-1">* 뻔뻐의 정책 상, 모든 비용은 소비자가 선결제 하게 됩니다. 배송비 착불 불가합니다!</span>
                    </p>
                }
                <div className="row form-box has-textarea">
                    <FormLabel name="배송 및 반품/교환/AS 안내" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <textarea
                            style={{resize: 'none', height: 150}}
                            className="form-control"
                            name="asIntro"
                            placeholder="배송 및 밭품/AS에 관한 설명을 적어주세요."
                            required
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <SubTitle title="사진 업로드" />
                <PhotosUpload {...this.props} />
                <div className="row form-box padding-top50">
                    <div className="btn-container">
                        <Link
                            to="/ceo/products"
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