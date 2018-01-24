import React, { Component } from 'react';

class ExchangeTable extends Component {

    constructor(props) {
        super(props);

        this.renderTableItem = this.renderTableItem.bind(this);
        this.showModal = this.showModal.bind(this);
    }

    showModal() {
        this.props.showModal();
    }


    renderTableItem(datas, dataIndex) {
         return (
            <tr className="exchange-table">
                <td className="number-line no">123</td>
                <td className="half-line order-num" id="more_info">20170101341293214</td>
                <td className="number-line product-name">AD-313</td>
                <td className="half-line buyer">이환섭</td>
                <td className="half-line phone-number">01024487085</td>
                <td className="number-line exchange-date">20170707</td>
                <td className="half-line reason">제품이상</td>
                <td className="half-line detail-reason">그냥 바꾸고 싶어서요</td>
                <td className="number-line status">교환요청</td>
                {/* TODO: 주문서 보기 누르면 배송 준비중으로 상태 변경 */}
                <td className="half-line handle"><button className="btn-yellow" onClick={this.props.showModal}>처리하기</button></td>
            </tr>
        )

    };


    render() {

        return (
            <table className="order-table ns-R">
                <thead>
                    <tr>
                        <th rowSpan={2}>No.</th>
                        <th colSpan={2}>제품</th>
                        <th colSpan={3}>구매자</th>
                        <th colSpan={2}>교환, 환불 이유</th>
                        <th rowSpan={2}>상태</th>
                        <th rowSpan={2}>처리하기</th>
                    </tr>
                    <tr>
                        <th>주문번호</th>
                        <th>모델명</th>
                        <th>구매자</th>
                        <th>연락처</th>
                        <th>요청일</th>
                        <th>사유</th>
                        <th>상세 이유</th>
                    </tr>
                </thead>
                <tbody>
                    {/* 리스트 뿌려주면 되는 곳 */}
                    {this.renderTableItem()}
                    {this.renderTableItem()}
                    {this.renderTableItem()}
                    {this.renderTableItem()}
                </tbody>
            </table>
        );
    }
}

export default ExchangeTable;