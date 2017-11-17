import React, { Component } from 'react';

class OrderTable extends Component {
    constructor(props) {
        super(props);

        this.renderTableItem = this.renderTableItem.bind(this);
    }

    renderTableItem(datas) {
        console.log(datas);
        return datas.map((data, index) => {
            console.log(data);
            return (
                <tr key={index}>
                    <td className="number-line">{index}</td>
                    <td className="half-line">{data.get('product_order_number')}</td>
                    <td className="number-line">{data.get('model_name')}</td>
                    <td className="half-line">{data.get('receiver_name')}</td>
                    <td className="half-line">{data.get('receiver_contact')}</td>
                    <td className="number-line">20170707</td>
                    <td className="half-line">제품이상</td>
                    <td className="half-line">로젠</td>
                    <td className="number-line">운송장 번호 보기</td>
                    {/* TODO: 주문서 보기 누르면 배송 준비중으로 상태 변경 */}
                    <td className="half-line">주문서 보기</td>
                </tr>
            );
        });
    }

    render() {
        return (
            <table className="order-table ns-R">
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