import React, { Component } from 'react';
import { List } from 'immutable';

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
            editStatus: List([false])
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
        const regNumberOnly = /^[0-9-]*$/; // 숫자 체크 정규식

        if(shippingInfo.shippingMethod === '' || typeof shippingInfo.shippingMethod !== 'string') {
            this.addAlert('error', '배송 방법을 선택해주세요!');
            return ;
        } else if(shippingInfo.shippingCompany === '' || typeof shippingInfo.shippingCompany !== 'string') {
            this.addAlert('error', '회사명을 선택 또는 입력해주세요!');
            return ;
        } else if(shippingInfo.trackingNumber === '' || typeof shippingInfo.trackingNumber !== 'string') {
            this.addAlert('error', '운송장 번호를 입력해주세요!');
            return ;
        } else if (!regNumberOnly.test(shippingInfo.trackingNumber)) {
            this.addAlert('error', '운송장 번호에는 숫자 및 하이픈(-)만 입력해주세요!');
            return ;
        }

        let orderId = form.get('id');

        try {
            await OrderActions.orderShippingUpdate(shippingInfo, orderId);
            await OrderActions.getOrderList();
            this.addAlert('success', '배송 정보가 등록되었습니다.');
            return ;
        } catch (e) {
            if(e) {
                //console.log(e);
            }
        }
    }

    handleEditStatus(index) { 
      this.setState({
          editStatus: this.state.editStatus.update(index-1, val => !val)
      });
    }

    renderTableItem(datas, dataIndex) {
        const {
            changeHandler,
            handleSubmit,
            handleEditStatus
        } = this;

        return datas.reverse().map((data, index) => {
            let newIndex = index + dataIndex + 1;

            const shipColumn = ['shippingMethod', 'shippingCompany', 'trackingNumber'];

            const editView = () => {
                const shippingMethod = (
                    <td className="half-line">
                        <select
                            className="form-control shippingMethod"
                            name="shippingMethod"
                            value={data.get('id') === this.props.form.get('id') ? this.props.form.get(shipColumn[0]) : ''}
                            onChange={(ev) => changeHandler(data.get('id'), ev)}
                        >
                            <option>선택</option>
                            <option value="택배">택배</option>
                            <option value="자체배송">자체배송</option>
                        </select>
                    </td>
                );

                const shippingCompany = (
                    <td className="half-line">
                        <select
                            disabled={data.get('id') === this.props.form.get('id') ? this.props.form.get(shipColumn[0]) === '자체배송' : false}
                            className="form-control shippingCompany"
                            name="shippingCompany"
                            value={data.get('id') === this.props.form.get('id') ? this.props.form.get(shipColumn[1]) : ''}
                            onChange={(ev) => changeHandler(data.get('id'), ev)}
                        >
                            <option>선택</option>
                            {SHIPPING_COMPANY_LIST.map((value) => (
                                <option key={value} value={value}>{value}</option>
                            ))}
                        </select>
                    </td>
                );


                let placeholderText = '';
                if(this.props.form.get('shippingMethod') === '택배') {
                    placeholderText = "운송장 번호를 입력해주세요";
                } else if(this.props.form.get('shippingMethod') === '자체배송') {
                    placeholderText = "기사님의 연락처를 입력해주세요";
                    this.props.FormActions.formChange({
                        formName: 'orders',
                        name: 'shippingCompany',
                        value: '자체배송'
                    });
                }

                const trackingNumber = (
                    <td className="number-line">
                        <input
                            className="form-control trackingNumber"
                            type="text"
                            name="trackingNumber"
                            placeholder={data.get('id') === this.props.form.get('id') ? placeholderText : ''}
                            value={data.get('id') === this.props.form.get('id') ? this.props.form.get(shipColumn[2]) : ''}
                            onChange={(ev) => changeHandler(data.get('id'), ev)}
                        />
                        {this.props.status.shippingRegister.get('fetching') ? <Spinner /> : <button className="input" type="button" onClick={handleSubmit}>입력</button>}
                    </td>
                );

                return {shippingMethod, shippingCompany, trackingNumber};
            };

            const normalView = () => {
                const shipColumn = ['shipping_method', 'shipping_company', 'tracking_number'];

                const shippingMethod = (
                    <td className="half-line">{data.get(shipColumn[0])}</td>
                );
                const shippingCompany = (
                    <td className="half-line">{data.get(shipColumn[1])}</td>
                );
                const trackingNumber = (
                    <td className="half-line">{data.get(shipColumn[2])}</td>
                );

                return {shippingMethod, shippingCompany, trackingNumber};
            };

            const isNeededInput = () => {
                return data.get('shipping_method') === null || isEditMode();
            };

            const buttonView = () => {
                const cancelButton = () => {
                    return <button className="cancel" onClick={()=> handleEditStatus(newIndex)}>취소</button>;
                };
                const editButton = () => {
                    let editBtn = '';

                    const isModifying = () => {
                        return data.get('tracking_number') !== null || data.get('shipping_method') !== null;
                    };

                    if(isModifying()) {
                        editBtn = (
                            <button className="edit" onClick={() => handleEditStatus(newIndex)}>수정</button>
                        )
                    }

                    return editBtn;
                };

                return <td className="half-line">{ isEditMode() ? cancelButton() : editButton()}</td>;
            };

            const isEditMode = () => {
                return this.state.editStatus.get(newIndex-1);
            };

            const modalVisibleHandler = () => {
                this.props.modalVisibleHandler(data.get('id'));
            };

            return (
                <tr className="body" key={newIndex}>
                    <td className="number-line">{newIndex}</td>
                    <td className="half-line">
                        <span id="more_info" onClick={modalVisibleHandler}>{data.get('product_order_number')}</span>
                    </td>
                    <td className="number-line">{data.get('model_name')}</td>
                    <td className="half-line">{data.get('receiver_name')}</td>
                    <td className="half-line">{data.get('receiver_contact')}</td>

                    <td className="number-line">20170404</td>
                    { isNeededInput() ? editView().shippingMethod : normalView().shippingMethod}
                    { isNeededInput() ? editView().shippingCompany : normalView().shippingCompany}
                    { isNeededInput() ? editView().trackingNumber : normalView().trackingNumber}
                    {/* TODO: 주문서 보기 누르면 배송 준비중으로 상태 변경 */}
                    { buttonView() }
                </tr>
            );
        });
    }

    render() {
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
                        <th rowSpan={2} className="head-NO">No.</th>
                        <th colSpan={2} className="head-product">제품</th>
                        <th colSpan={3} className="head-buyer">구매자</th>
                        <th colSpan={3} className="head-shipping">배송</th>
                        <th rowSpan={2} className="head-sheet">주문서</th>
                    </tr>
                    <tr>
                        <th>주문번호</th>
                        <th>모델명</th>
                        <th>구매자</th>
                        <th>연락처</th>
                        <th>주문일</th>
                        <th className="shippingMethod">배송방법</th>
                        <th className="shippingCompany">택배회사</th>
                        <th className="trackingNumber">운송장 번호</th>
                    </tr>
                </thead>
                <tbody>
                    {/* 리스트 뿌려주면 되는 곳 */}
                    {this.renderTableItem(this.props.tableItems, this.props.tableIndex)}
                </tbody>
            </table>
        );
    }
}

export default OrderTable;