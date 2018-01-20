import React, { Component } from 'react';
import Scrollbars from 'react-custom-scrollbars';

import {
    Spinner,
    SubTitle,
    FormLabel
} from 'components/Common';
import {
    PhotosUpload,
    DeliveryTableModify
} from 'components/Ceo/Product';

class ProductModifyForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            btnDisabled: false,
            isModified: false
        };

        this.changeHandler = this.changeHandler.bind(this);
        this.deleteAlert = this.deleteAlert.bind(this);
        this.toggleSubmitBtn = this.toggleSubmitBtn.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }
    
    componentWillMount() {
        const { FormActions } = this.props;
        FormActions.formReset('product');
        window.scrollTo(0, 0); // 수정 누를 시 스크롤 탑
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

        this.setState({
            isModified: !this.state.isModified
        })
    }

    handleBlur(ev) {
        // const { FormActions, form } = this.props;
        // const formName = ['GangWon', 'ChungNam', 'ChungBuk', 'GyeongBuk', 'GyeongNam', 'JeonBuk', 'JeonNam', 'JeJuSanGan'];
        // for(let i=0; i<8; i++) {
        //     FormActions.formChange({
        //         formName: 'product',
        //         name: formName[i],
        //         value: form.get('SeoulGyungki')
        //     });
        // }
    }

    deleteAlert() {
        const { UiActions } = this.props;
        UiActions.showSweetAlert({
            alertTitle: "정말로 삭제하시겠습니까?",
            message: "제품에 대한 모든 내용이 삭제됩니다.",
            showCancel: true,
            value: 'error',
            confirmText: "네 삭제하겠습니다"
        });
    }

    toggleSubmitBtn(isDisabled) {
        this.setState({
            btnDisabled: isDisabled
        });
    }
    
    async handleSubmit() {
        const { ProductActions, UiActions, form } = this.props;
        const { productAndDeliver } = this.props.productDetail;
        const { toggleSubmitBtn } = this;
        toggleSubmitBtn(true);
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

            isDeliverFree: form.get('isDeliverFree') === form.get('isDeliverFree'),
            SeoulGyungki: form.get('isDeliverFree') === 'free' ? '0' : form.get('SeoulGyungki'),
            GangWon: form.get('isDeliverFree') === 'free' ? '0' : form.get('GangWon'),
            ChungNam: form.get('isDeliverFree') === 'free' ? '0' : form.get('ChungNam'),
            ChungBuk: form.get('isDeliverFree') === 'free' ? '0' : form.get('ChungBuk'),
            GyeongBuk: form.get('isDeliverFree') === 'free' ? '0' : form.get('GyeongBuk'),
            GyeongNam: form.get('isDeliverFree') === 'free' ? '0' : form.get('GyeongNam'),
            JeonBuk: form.get('isDeliverFree') === 'free' ? '0' : form.get('JeonBuk'),
            JeonNam: form.get('isDeliverFree') === 'free' ? '0' : form.get('JeonNam'),
            JeJuSanGan: form.get('isDeliverFree') === 'free' ? '0' : form.get('JeJuSanGan'),
            isCostSame: form.get('isCostSame') && form.get('isCostSame'),
            proportionShipping: form.get('proportionShipping') && form.get('proportionShipping')
        };

        console.log(productAndDeliver.get(0));
        console.log(productInfo);
        try {
            if (productInfo.productImages.size > 20) {
                UiActions.showSweetAlert({
                    message: '상품 사진은 20개를 넘을 수 없습니다!',
                    alertTitle: '',
                    value: 'error'
                });
                toggleSubmitBtn(false);
                return ;
            } else if(productInfo.productImages.size < 1) {
                UiActions.showSweetAlert({
                    value: 'error',
                    alertTitle: '',
                    message: "사진은 반드시 1장 이상 업로드 해주셔야합니다!"
                });
                toggleSubmitBtn(false);
                return ;
            }

            await ProductActions.productModify(productId[3], productInfo);
            if (this.props.valid) {
                toggleSubmitBtn(false);
                UiActions.showSweetAlert({
                    message: '제품이 수정되었습니다.',
                    alertTitle: '',
                    value: 'success'
                });
                this.props.history.push('/ceo/products');
            }
        } catch (e) {
            toggleSubmitBtn(false);
            if (e) throw e;
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
                            placeholder={productDetail.productAndDeliver && productDetail.productAndDeliver.get(0).get('product_name')}
                            name="productName"
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
                        <select
                            ref={(select) => this.costSelect = select}
                            className="form-control"
                            name="isDeliverFree"
                            value={ this.state.isModified ? this.props.form.get('isDeliverFree') : productDetail.productAndDeliver && productDetail.productAndDeliver.get(0).get('delivery_is_free')}
                            onChange={changeHandler}
                            required
                        >
                            <option value="free">무료</option>
                            <option value="unfree">유료</option>
                        </select>
                    </div>
                </div>
                {
                    this.props.form.get('isDeliverFree') === 'free' ? emptyComponent :
                        <div className="row form-box">
                            <FormLabel name="지역별 배송비 설정" />
                            <DeliveryTableModify
                                form={this.props.form}
                                sameCost={this.props.form.get('SeoulGyungki')}
                                changeHandler={changeHandler}
                                handleBlur={this.handleBlur}
                                currentValue={productDetail.productAndDeliver && productDetail.productAndDeliver.get(0)}
                            />
                        </div>
                }
                <p className="row delivery-warning">
                    <span className="col-md-6 col-xs-10 col-md-offset-3 col-xs-offset-1">* 뻔뻐의 정책 상, 모든 비용은 소비자가 선결제 하게 됩니다. 배송비 착불 불가합니다!</span>
                </p>
                <div className="row form-box delivery-info-box">
                    <FormLabel name="배송 및 반품/교환/AS 안내" />
                    <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0" style={{height: '100%'}}>
                    <Scrollbars style={{backgroundColor: 'white', border: '1px solid #e5e6e7'}}>
                            <p className="product-delivery-info">
                                <b>배송안내</b>
                                <p>* 택배배송 / 업체 발송 후 2~5일</p>
                                <p>* 직접배송 (용달) / 업체 발송 후 1~7일</p>
                                <p>* 주문제작 상품의 경우 제작에서 발송까지 더 시간이 소요될 수 있습니다.</p>
                                <p>* 더욱 자세한 배송기간은 송장번호 및 해당 업체에 문의해주세요.</p>
                                <p>* 배송비의 경우 해당제품의 [배송] 란을 확인해주세요 :)</p>


                                <b>주문취소 시 주의사항</b>
                                <p>* 주문취소는 물류센터 출발 전에만 가능합니다. (배송비 부담없음)</p>
                                <p>* 주문취소 시 물류센터에서 출발했을 경우, 왕복 배송비는 고객부담입니다.</p>


                                <b>교환, 반품시 주의사항</b>
                                <p>* 교환 또는 반품은 설치기사와 함께 현장에서 확인하여 접수해주시기 바랍니다.</p>
                                <p>* 배송기사가 해당지역을 벗어난 후 접수되는 교환 및 반품의 경우에는 사유에 따라 불가하거나 다소 시일이 걸릴 수 있습니다.</p>
                                <p>* 배송된 제품이 파손, 손상되었거나 오염되어 있을 경우, 수령일로부터 7일 이내 무상 교환/ 반품이 가능합니다.</p>
                                <p>* 고객의 변심에 의한 반품/교환 신청은 반품 규정에 의거, 상품인도 후 7일 이내 신청이 가능합니다. (공정거래위원회 표준약관) 단, 고객의 부주의로 인한 상품훼손의 경우에는 불가합니다.</p>
                                <p>* 배송상품의 내용이 표시 광고 및 계약내용과 다른 경우 상품을 수령하신 날로부터 3개월 이내, 그 사실을 인지한 날(인지할 수 있었던 날)부터 30일 이내 청약철회가 가능합니다.</p>
                                <p>* 고객변심에 의한 교환, 반품일 경우 왕복배송비는 고객님 부담입니다.</p>
                                <p>* 현장에서 확인되는 환경적 요인에 의한 배송불가의 경우에도 왕복배송비가 부담됩니다.</p>
                                <p>* 상품의 하자가 아닌 환불은 상품회수 및 왕복배송비용 입금확인 후 진행됩니다. 왕복배송비용은 상품별로 다르므로 반드시 업체에 확인바랍니다.</p>
                            
                                <b>교환, 반품이 불가능한 경우</b>
                                <p>* 초기 배송 시 발견되지 않은 외형 파손에 대해서는 교환 및 반품이 불가능합니다. (반드시 배송기사와 함께 상품을 확인해주세요)</p>
                                <p>* 상품을 배송하여 박스가 심히 훼손되었거나 조립 및 설치 후 재판매가 불가능한 상태의 경우 교환, 반품이 불가능합니다.</p>
                                <p>(박스개봉 시 상품이 훼손되지 않도록 주의하여 주시고 상품상태 확인 전까지 박스를 버리지 마시길 바랍니다.)</p>
                                <p>* 수제품류(공방제품 등)는 주문제작 상품으로 주문 후 절대 교환, 반품이 불가합니다.</p>
                                <p>* 조립 설치품 (배송 후 조립 또는 설치가 필요한 제품) 은 조립 설치 후에 교환/반품이 불가합니다.</p>
                                <p>* 매트리스는 제품의 위생 관리상 포자 개봉 및 사용후에는 원칙적으로 교환/환불이 불가합니다.</p>
                                <p>* 붙박이장의 특성상 설치 후 교환/반품이 불가합니다. (단, 제품하자의 경우는 제외)</p>
                             
                                <b>AS안내</b>
                                <p>* 상품의 기술적인 하자에 한하여 A/S가 가능합니다.</p>
                                <p>* 고객 부주의로 인한 A/S는 별도의 비용을 부담 하셔야 합니다.</p>
                                <p>* 개별업체 상품의 A/S의 경우 해당업체의 내규에 따릅니다.</p>
                                <p>* 교체가 불가능한 부위의 파손은 부분적 A/S가 불가능합니다.</p>
                            </p>
                        </Scrollbars>
                    </div>
                </div>
                <SubTitle title="사진 업로드" />
                <PhotosUpload {...this.props} />
                <div className="row form-box padding-top50 padding-bottom">
                    <div className="btn-container">
                        <button
                            type="button"
                            className="btn btn-common btn-prev modify delete"
                            onClick={deleteAlert}>삭제하기
                        </button>
                        <button
                            type="button"
                            className="btn btn-common btn-next modify confirm"
                            onClick={handleSubmit}
                            disabled={this.state.btnDisabled}>수정하기
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductModifyForm;