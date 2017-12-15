import React, { Component } from 'react';

import {
    Spinner
} from 'components/Common';

var ReactToastr = require('react-toastr');
var { ToastContainer } = ReactToastr; // This is a React Element.
// For Non ES6...
// var ToastContainer = ReactToastr.ToastContainer;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);


const SHIPPING_COMPANY_LIST = [
    'CJ대한통운', '우체국택배', '한진택배', '롯데택배', '로젠택배', 'KG로지스', 'KGB택배', '경동택배', '대신택배', '일양로지스', '합동택배', 'GTX로지스', '건양택배',
    '천일택배', '한의사랑택배', '한덱스', '범한판토스', 'KGL네트웍스', '굿투럭', '호남택배', 'SLX로지스'
];

class OrderTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editStatus: false
        };

        this.addAlert = this.addAlert.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditStatus = this.handleEditStatus.bind(this);
        this.renderTableItem = this.renderTableItem.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // 배송 정보 입력 도중 다른 주문 배송 정보 입력 시 초기화
        if(this.props.form.get('id') !== nextProps.form.get('id')) {
            this.props.FormActions.formChange({
                formName: 'orders',
                name: 'shippingCompany',
                value: ''
            });

            this.props.FormActions.formChange({
                formName: 'orders',
                name: 'trackingNumber',
                value: ''
            });
        }
    }

    /* toast 창띄우기 */
    addAlert(types, msg) {  /* enum of types: ['warning', 'success', 'error', 'info'],  msg: String */
        switch(types) {
            case 'warning':
                return this.toastRef.warning(`${msg}`);
            case 'success':
                return this.toastRef.success(`${msg}`);
            case 'error':
                return this.toastRef.error(`${msg}`);
            default:
                break;
        }
    }

    changeHandler(id, ev) {
        const { FormActions } = this.props;
        console.log(id);
        console.log(ev);

        FormActions.orderFormChange({
            name: ev.target.name,
            value: ev.target.value,
            id
        });
    }

    async handleSubmit(ev) {
        const { OrderActions, form } = this.props;
        ev.preventDefault();

        const shippingInfo = {
            shippingMethod: form.get('shippingMethod'),
            shippingCompany: form.get('shippingCompany'),
            trackingNumber: form.get('trackingNumber')
        };

        if(shippingInfo.shippingMethod === '' || typeof shippingInfo.shippingMethod !== 'string') {
            this.addAlert('error', '배송 방법을 선택해주세요!');
        } else if(shippingInfo.shippingCompany === '' || typeof shippingInfo.shippingCompany !== 'string') {
            this.addAlert('error', '회사명을 선택 또는 입력해주세요!');
        } else if(shippingInfo.trackingNumber === '' || typeof shippingInfo.trackingNumber !== 'string') {
            this.addAlert('error', '운송장 번호를 입력해주세요!');
        }

        let orderId = form.get('id');

        try {
            await OrderActions.orderShippingRegister(shippingInfo, orderId);
            if(this.props.valid.shippingRegister) {
                this.addAlert('success', '배송 정보가 등록되었습니다.');
                await OrderActions.getOrderList();
            }
        } catch (e) {
            if(e) console.log(e);
        }
    }

    handleEditStatus() {
        this.setState({
            editStatus: !this.state.editStatus
        });
    }

    renderTableItem(datas) {
        console.log(datas);
        const {
            changeHandler,
            handleSubmit,
            handleEditStatus
        } = this;
        return datas.reverse().map((data, index) => {
            let newIndex = datas.size - index;
            
            let shippingMethod = null;
            let shippingCompany = null;
            let trackingNumber = null;
            let editBtn = null;

            if(data.get('shipping_method') === null || this.state.editStatus) {
                shippingMethod = (
                    <td className="half-line">
                        <select
                            className="form-control"
                            name="shippingMethod"
                            value={data.get('id') === this.props.form.get('id') ? this.props.form.get('shippingMethod') : ''}
                            onChange={(ev) => changeHandler(data.get('id'), ev)}
                        >
                            <option>선택</option>
                            <option value="택배">택배</option>
                            <option value="자체배송">자체배송</option>
                        </select>
                    </td>
                );
            } else {
                shippingMethod = (
                    <td className="half-line">{data.get('shipping_method')}</td>
                );
            }

            if(data.get('shipping_company') === null || this.state.editStatus) {
                // 배송방법 자체배송이면 select disabled
                shippingCompany = (
                    <td className="half-line">
                        <select
                            disabled={data.get('id') === this.props.form.get('id') ? this.props.form.get('shippingMethod') === '자체배송' ? true : false : false}
                            className="form-control"
                            name="shippingCompany"
                            value={data.get('id') === this.props.form.get('id') ? this.props.form.get('shippingCompany') : ''}
                            onChange={(ev) => changeHandler(data.get('id'), ev)}
                        >
                            <option>선택</option>
                            {SHIPPING_COMPANY_LIST.map((value) => (
                                <option key={value} value={value}>{value}</option>
                            ))}
                        </select>
                    </td>
                );
            } else {
                shippingCompany = (
                    <td className="half-line">{data.get('shipping_company')}</td>
                );
            }

            if(data.get('tracking_number') === null || this.state.editStatus) {
                let placeholderText = '';
                if(this.props.form.get('shippingMethod') === '택배') {
                    placeholderText = "운송장 번호를 입력해주세요";
                } else if(this.props.form.get('shippingMethod') === '자체배송') {
                    placeholderText = "기사님의 연락처를 입력해주세요";
                }
                trackingNumber = (
                    <td className="number-line">
                        <input
                            className="form-control"
                            type="text"
                            name="trackingNumber"
                            placeholder={data.get('id') === this.props.form.get('id') ? placeholderText : ''}
                            value={data.get('id') === this.props.form.get('id') ? this.props.form.get('trackingNumber') : ''}
                            onChange={(ev) => changeHandler(data.get('id'), ev)}
                        />
                        {this.props.status.shippingRegister.get('fetching') ? <Spinner /> : <button type="button" onClick={handleSubmit}>입력</button>}
                    </td>
                );
            } else {
                trackingNumber = (
                    <td className="half-line">{data.get('tracking_number')}</td>
                );
            }

            // 배송 방법 입력되어 있다면 수정 버튼 생성
            if(data.get('tracking_number') !== null || data.get('shipping_method') !== null) {
                editBtn = (
                    <button onClick={handleEditStatus}>수정</button>
                )
            } else {
                editBtn = '';
            }

            return (
                <tr key={newIndex}>
                    <td className="number-line">{newIndex}</td>
                    <td className="half-line">{data.get('product_order_number')}</td>
                    <td className="number-line">{data.get('model_name')}</td>
                    <td className="half-line">{data.get('receiver_name')}</td>
                    <td className="half-line">{data.get('receiver_contact')}</td>
                    <td className="number-line">20170404</td>
                    {shippingMethod}
                    {shippingCompany}
                    {trackingNumber}
                    {/* TODO: 주문서 보기 누르면 배송 준비중으로 상태 변경 */}
                    {<td className="half-line">{this.state.editStatus ? <span onClick={handleEditStatus}>취소</span> : editBtn}</td>}
                </tr>
            );
        });
    }

    render() {
        console.log(this.props.tableItems);
        return (
            <table className="order-table ns-R">
                            {/* 토스트 컨테이너 */}
                <ToastContainer
                    ref={(toast) => {this.toastRef = toast}}
                    toastMessageFactory={ToastMessageFactory}
                    className={document.documentElement.clientWidth < 768 ? 'toast-bottom-center' : 'toast-top-right'}
                />
                <thead>
                    <tr>
                        <th rowSpan={2}>No.</th>
                        <th colSpan={2}>제품</th>
                        <th colSpan={3}>구매자</th>
                        <th colSpan={3}>배송</th>
                        <th rowSpan={2}>주문서</th>
                    </tr>
                    <tr>
                        <th>주문번호</th>
                        <th>모델명</th>
                        <th>구매자</th>
                        <th>연락처</th>
                        <th>주문일</th>
                        <th>배송방법</th>
                        <th>택배회사</th>
                        <th>운송장 번호</th>
                    </tr>
                </thead>
                <tbody>
                    {/* 리스트 뿌려주면 되는 곳 */}
                    {this.renderTableItem(this.props.tableItems)}
                </tbody>
            </table>
        );
    }
}

export default OrderTable;