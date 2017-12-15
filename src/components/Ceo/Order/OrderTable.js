import React, { Component } from 'react';
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

        this.addAlert = this.addAlert.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderTableItem = this.renderTableItem.bind(this);
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
        this.addAlert('warning', 'hi')

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

        let orderId = form.get('id');

        try {
            await OrderActions.shippingRegister(shippingInfo, orderId);
        } catch (e) {
            if(e) console.log(e);
        }
    }

    renderTableItem(datas) {
        console.log(datas);
        const { changeHandler, handleSubmit } = this;
        return datas.reverse().map((data, index) => {
            let newIndex = datas.size - index;
            
            let shippingMethod = null;
            let shippingCompany = null;
            let trackingNumber = null;
            let editBtn = null;

            if(data.get('shipping_method') === null) {
                
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
            }

            if(data.get('shipping_company') === null) {
                shippingCompany = (
                    <td className="half-line">
                        <select
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
                )
            }

            if(data.get('tracking_number') === null) {
                trackingNumber = (
                    <td className="number-line">
                        <input
                            className="form-control"
                            type="text"
                            name="trackingNumber"
                            value={data.get('id') === this.props.form.get('id') ? this.props.form.get('trackingNumber') : ''}
                            onChange={(ev) => changeHandler(data.get('id'), ev)}
                        />
                        <button type="button" onClick={handleSubmit}>입력</button>
                    </td>
                )
            }

            // 배송 방법 입력되어 있다면 수정 버튼 생성
            if(data.get('tracking_number') !== null || data.get('shipping_method') !== null) {
                editBtn = (
                    <button>수정</button>
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
                    {<td className="half-line">{editBtn}</td>}
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