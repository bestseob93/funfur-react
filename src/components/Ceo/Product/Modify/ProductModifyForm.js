import React, { Component } from 'react';

import {
    Spinner,
    SubTitle,
    FormLabel
} from 'components/Common';
import {
    PhotosUpload
} from 'components/Ceo/Product';

class ProductModifyForm extends Component {
    constructor(props) {
        super(props);

        this.changeHandler = this.changeHandler.bind(this);
        this.deleteAlert = this.deleteAlert.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentWillMount() {
        const { FormActions } = this.props;
        FormActions.formReset('product');
    }

    async componentDidMount() {
        const { ProductActions, FormActions } = this.props;
        const productId = this.props.location.pathname.split('/');
        try {
            await ProductActions.getProductDetail(productId[3]);
            if(this.props.valid.productDetail) {
                for(let i=0; i<this.props.productDetail.productPhotos.size; i++) {
                    FormActions.formUploadAdd({
                        formName: 'product',
                        name: 'productImages',
                        value: this.props.productDetail.productPhotos.get(i).toJS()
                    });
                }
            }
        } catch (e) {

        }
    }
    
    changeHandler(ev) {
        const { FormActions } = this.props;
        FormActions.formChange({
            formName: 'product',
            name: ev.target.name,
            value: ev.target.value
        });
    }

    deleteAlert() {
        const { UiActions } = this.props;
        UiActions.showSweetAlert({
            alertTitle: "정말로 삭제하시겠습니까?",
            message: "제품에 대한 모든 내용이 삭제됩니다.",
            alertType: 'typeDanger',
            showCancel: true,
            value: true
        });
    }

    async handleSubmit() {
        const { ProductActions, UiActions, form } = this.props;
        const { productAndDeliver } = this.props.productDetail;
        const productId = this.props.location.pathname.split('/');
        const productInfo = {
            productName: form.get('productName') === "" ? productAndDeliver.get(0).get('product_name') : form.get('productName'),
            modelName: form.get('modelName') === "" ? productAndDeliver.get(0).get('model_name') : form.get('modelName'),
            modelOption: form.get('modelOption') === "" ? productAndDeliver.get(0).get('model_option') : form.get('modelOption'),
            productColor: form.get('productColor') === "" ? productAndDeliver.get(0).get('product_color') : form.get('productColor'),
            sizeWidth: form.get('sizeWidth') === "" ? productAndDeliver.get(0).get('horizontal') : form.get('sizeWidth'),
            sizeDepth: form.get('sizeDepth') === "" ? productAndDeliver.get(0).get('vertical') : form.get('sizeDepth'),
            sizeHeight: form.get('sizeHeight') === "" ? productAndDeliver.get(0).get('height') : form.get('sizeHeight'),
            mainMaterial: form.get('mainMaterial') === "" ? productAndDeliver.get(0).get('main_material') : form.get('mainMaterial'),
            prManufacturer: form.get('prManufacturer') === "" ? productAndDeliver.get(0).get('manufacturer') : form.get('prManufacturer'),
            productOrigin: form.get('productOrigin') === "" ? productAndDeliver.get(0).get('origin') : form.get('productOrigin'),
            productPrice: form.get('productPrice') === "" ? productAndDeliver.get(0).get('product_price') : form.get('productPrice'),
            productImages: form.get('productImages'),
        };

        console.log(productInfo);
        try {
            await ProductActions.productModify(productId[3], productInfo);
            if(this.props.valid) {
                UiActions.showSweetAlert({
                    message: '제품이 수정되었습니다.'
                });
                this.props.history.push('/ceo/products');
            }
        } catch (e) {
            if(e) throw e;
        }
    }
    
    render() {
        const {
            changeHandler,
            deleteAlert,
            handleSubmit
        } = this;
        const {
            productDetail
        } = this.props;

        const emptyComponent = undefined;

        const optionOne = productDetail.productAndDeliver && productDetail.productAndDeliver.get(0).get('model_option') === '부분조립' ? true : false;
        const optionTwo = productDetail.productAndDeliver && productDetail.productAndDeliver.get(0).get('model_option') === '완제품' ? true : false;
        const optionThree = productDetail.productAndDeliver && productDetail.productAndDeliver.get(0).get('model_option') === 'DIY' ? true : false;
        return (
            <div>
                {/* Spinner */}
                { this.props.status.productDetail.get('fetching') || this.props.status.modify.get('fetching') || this.props.status.remove.get('fetching') ? <Spinner /> : emptyComponent }
                <SubTitle title="제품 등록" />
                <div className="row form-box">
                    <FormLabel name="제품명" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="productName"
                            placeholder={productDetail.productAndDeliver && productDetail.productAndDeliver.get(0).get('product_name')}
                            required
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <SubTitle title="제품 분류" />
                <div className="row form-box">
                    <FormLabel name="위치" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="productPosition"
                            value={productDetail.productSpace.get('space') && productDetail.productSpace.get('space').get(0)}
                            disabled
                            required
                        />
                    </div>
                </div>
                <div className="row form-box">
                    <FormLabel name="1차 분류" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="firstSort_1"
                            value={productDetail.productSpace.get('first') && productDetail.productSpace.get('first').get(0)}
                            disabled
                            required
                        />
                    </div>
                </div>
                <div className="row form-box">
                    <FormLabel name="2차 분류" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="secondSort_1"
                            value={productDetail.productSpace.get('second') && productDetail.productSpace.get('second').get(0)}
                            disabled
                            required
                        />
                    </div>
                </div>
                {
                    productDetail.productSpace.get('space') && productDetail.productSpace.get('space').size > 1 ? 
                        <div className="row form-box">
                            <FormLabel name="위치" />
                            <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="productPosition_2"
                                    value={productDetail.productSpace.get('space') && productDetail.productSpace.get('space').get(1)}
                                    disabled
                                    required
                                />
                            </div>
                        </div>: emptyComponent
                }
                {
                    productDetail.productSpace.get('first') && productDetail.productSpace.get('first').size > 1 ? 
                        <div className="row form-box">
                            <FormLabel name="위치" />
                            <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="firstSort_2"
                                    value={productDetail.productSpace.get('first') && productDetail.productSpace.get('first').get(1)}
                                    disabled
                                    required
                                />
                            </div>
                        </div>: emptyComponent
                }
                {
                    productDetail.productSpace.get('second') && productDetail.productSpace.get('second').size > 1 ? 
                        <div className="row form-box">
                            <FormLabel name="위치" />
                            <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="firstSort_2"
                                    value={productDetail.productSpace.get('second') && productDetail.productSpace.get('second').get(1)}
                                    disabled
                                    required
                                />
                            </div>
                        </div>: emptyComponent
                }
                <SubTitle title="제품 정보" />
                <div className="row form-box">
                    <FormLabel name="모델명" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                            <input
                                type="text"
                                className="form-control"
                                name="modelName"
                                placeholder={productDetail.productAndDeliver && productDetail.productAndDeliver.get(0).get('model_name')}
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
                            onChange={changeHandler}
                        >
                            <option>옵션 선택</option>
                            <option value="부분조립" selected={optionOne}>부분조립</option>
                            <option value="완제품" selected={optionTwo}>완제품</option>
                            <option value="DIY" selected={optionThree}>DIY</option>
                        </select>
                    </div>
                </div>
                <div className="row form-box">
                    <p className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-3">* 조립이 필요하시다면 설명서를 &lt;업체제공정보&gt;에 꼭 넣어주세요!</p>
                </div>
                <div className="row form-box">
                    <FormLabel name="색상" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="productColor"
                            placeholder={productDetail.productAndDeliver && productDetail.productAndDeliver.get(0).get('product_color')}
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
                            placeholder={productDetail.productAndDeliver && productDetail.productAndDeliver.get(0).get('horizontal')}
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
                            placeholder={productDetail.productAndDeliver && productDetail.productAndDeliver.get(0).get('vertical')}
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
                            placeholder={productDetail.productAndDeliver && productDetail.productAndDeliver.get(0).get('height')}
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
                            placeholder={productDetail.productAndDeliver && productDetail.productAndDeliver.get(0).get('main_material')}
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
                            placeholder={productDetail.productAndDeliver && productDetail.productAndDeliver.get(0).get('manufacturer')}
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
                            placeholder={productDetail.productAndDeliver && productDetail.productAndDeliver.get(0).get('origin')}
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
                            placeholder={productDetail.productAndDeliver && productDetail.productAndDeliver.get(0).get('product_price')}
                            required
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <SubTitle title="배송 정보" />
                <div className="row form-box">
                    <FormLabel name="배송비" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                        <input
                            type="text"
                            className="form-control"
                            name="isDeliverFree"
                            value={productDetail.productAndDeliver && productDetail.productAndDeliver.get(0).get('delivery_is_free') === "free" ? '무료' : '유료'}
                            required
                            disabled
                        />
                    </div>
                </div>
                {
                    productDetail.productAndDeliver && productDetail.productAndDeliver.get(0).get('delivery_is_free') ? emptyComponent :
                        <div className="row form-box">
                            <FormLabel name="지역별 배송비 설정" />
                            <table className="text-center col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
                                <tbody>
                                    <tr>
                                        <th className="text-center">지역</th>
                                        <th className="text-center">배송비용</th>
                                    </tr>
                                    <tr>
                                        <td>서울 경기 인천</td>
                                        <td>
                                            <span>{productDetail.productAndDeliver && productDetail.productAndDeliver.get(0).get('seoul_gyungki')}</span>원
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>강원</td>
                                        <td><span>{productDetail.productAndDeliver && productDetail.productAndDeliver.get(0).get('gangwon')}</span>원</td>
                                    </tr>
                                    <tr>
                                        <td>충남 세종 대전</td>
                                        <td><span>{productDetail.productAndDeliver && productDetail.productAndDeliver.get(0).get('chungnam')}</span>원</td>
                                    </tr>
                                    <tr>
                                        <td>충북</td>
                                        <td><span>{productDetail.productAndDeliver && productDetail.productAndDeliver.get(0).get('chungbuk')}</span>원</td>
                                    </tr>
                                    <tr>
                                        <td>경북 대구</td>
                                        <td><span>{productDetail.productAndDeliver && productDetail.productAndDeliver.get(0).get('gyeongbuk')}</span>원</td>
                                    </tr>
                                    <tr>
                                        <td>경남 울산 부산</td>
                                        <td><span>{productDetail.productAndDeliver && productDetail.productAndDeliver.get(0).get('gyeongnam')}</span>원</td>
                                    </tr>
                                    <tr>
                                        <td>전북</td>
                                        <td><span>{productDetail.productAndDeliver && productDetail.productAndDeliver.get(0).get('jeonbuk')}</span>원</td>
                                    </tr>
                                    <tr>
                                        <td>전남 광주</td>
                                        <td><span>{productDetail.productAndDeliver && productDetail.productAndDeliver.get(0).get('jeonnam')}</span>원</td>
                                    </tr>
                                    <tr>
                                        <td>제주 산간지역</td>
                                        <td><span>{productDetail.productAndDeliver && productDetail.productAndDeliver.get(0).get('jeju_sangan')}</span>원</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                }
                <p className="row delivery-warning">
                    <span className="col-md-6 col-xs-10 col-md-offset-3 col-xs-offset-1">* 뻔뻐의 정책 상, 모든 비용은 소비자가 선결제 하게 됩니다. 배송비 착불 불가합니다!</span>
                </p>
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
                        <button
                            type="button"
                            style={{borderColor: 'red'}}
                            className="btn btn-common btn-prev"
                            onClick={deleteAlert}>삭제하기
                        </button>
                        <button
                            type="button"
                            className="btn btn-common btn-next"
                            onClick={handleSubmit}
                            ref={(btn) => { this.submitBtn = btn }}>수정하기
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductModifyForm;