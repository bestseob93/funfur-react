import React, { Component } from 'react';
import {
    Order,
    OrderHeader,
    OrderContents,
    OrderTable
} from 'components/Ceo/Order';

class OrderScreen extends Component {
    render() {
        return (
            <Order>
                <OrderHeader />
                <OrderContents>
                    <OrderTable />
                </OrderContents>
            </Order>
        );
    }
}

export default OrderScreen;