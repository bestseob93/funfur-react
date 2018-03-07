import React, { Component } from 'react';

class OrderSpecificInformation extends Component {
    constructor(props) {
        super(props);

        this.onPrint.bind(this);
    }

    onPrint() {
        const html = document.querySelector('html');
        const printContents = document.querySelector('#modal-order-specific-dialog').innerHTML;
        const printDiv = document.createElement('DIV');
        printDiv.className = 'print-div';

        html.appendChild(printDiv);
        printDiv.innerHTML = printContents;
        document.body.style.display = 'none';
        window.print();
        document.body.style.display = 'block';
        printDiv.style.display = 'none';
    }



    render() {
        const order = this.props.orderSpecific.toObject();

        const modalVisibleHandler = () => {
            this.props.modalVisibleHandler(null);
        };

        const orderTime = (str) => {
            const index = str.indexOf('T');
            const date = str.substring(0, index);
            const time = str.substring(index+1, str.indexOf('.'));

            return date + " " + time;
        };

        return (
            <div
                className={`modal ${this.props.modalVisible ? 'fade in animated fadeIn' : 'fade'}`}
                style={this.props.modalVisible ? {display: 'block'} : {display: 'none'}}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="myModalLabel"
            >
                <div className="modal-dialog" id="modal-order-specific-dialog">
                <div className="modal-content" id="modal-order-specific-content">
                <div className="order__specific__wrapper">
                    <div>
                        <span>주문 상세정보</span> <div className="icon" id="x" onClick={modalVisibleHandler}/>

                       <table id="specific--table">
                           <tr>
                               <td className="title">상품</td>
                               <td className="contents">{order.product_name}</td>

                               <td className="title left-border">결제방법</td>
                               <td className="contents">카드</td>
                           </tr>
                           <tr>
                               <td className="title">구매자</td>
                               <td className="contents">{order.buyer_name}</td>
                               <td className="title left-border">구매자ID</td>
                               <td className="contents">{order.buyer_id}</td>
                           </tr>
                           <tr>
                               <td className="title">주문수량</td>
                               <td className="contents">{order.order_quantity}</td>
                               <td className="title left-border">총 상품 금액</td>
                               <td className="contents">{order.product_price}원</td>
                           </tr>
                           <tr>
                               <td className="title">주문날짜</td>
                               <td colSpan={3} className="contents">{orderTime(order.created_at)}</td>
                           </tr>
                       </table>
                    </div>

                    <div>
                        <span>배송지 정보</span>

                        <table>
                            <tr colSpan={4}>
                                <td colSpan={1} className="title">수취인</td>
                                <td colSpan={1} className="contents">{order.receiver_name}</td>
                                <td colSpan={1} className="title left-border">연락처</td>
                                <td colSpan={1} className="contents">{order.receiver_contact}</td>
                            </tr>
                            <tr colSpan={4}>
                                <td colSpan={1} className="title shipping">배송지</td>
                                <td colSpan={3} className="contents">{order.receiver_basic_address}<br />{order.receiver_detail_address}</td>
                            </tr>
                            <tr colSpan={4}>
                                <td colSpan={1} className="title">배송방법</td>
                                <td colSpan={3} className="contents">{order.shipping_method}</td>
                            </tr>
                            <tr colSpan={4}>
                                <td colSpan={1} className="title">배송메모</td>
                                <td colSpan={3} className="contents">{order.shipping_message}</td>
                            </tr>
                        </table>

                    </div>

                    <div>
                        <span>주문 처리 이력</span>

                        <table>
                            <tr colSpan={4}>
                                <td colSpan={1} className="title">주문</td>
                                <td colSpan={3} className="contents">주문완료</td>
                            </tr>
                            <tr>
                                <td colSpan={1} className="title">결제완료</td>
                                <td colSpan={3} className="contents">카드 완료</td>
                            </tr>
                        </table>
                    </div>

                    <div className="center">
                        <button id="confirm" onClick={modalVisibleHandler}>확 인</button>
                    </div>

                    <div className="icon" id="print" onClick={this.onPrint}>인 쇄</div>
                </div>
                </div>
                </div>
            </div>
        );
    }
}

export default OrderSpecificInformation;