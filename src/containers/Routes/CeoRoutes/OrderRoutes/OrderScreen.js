import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Order,
    OrderHeader,
    OrderContents,
    OrderTable,
} from 'components/Ceo/Order';
import { Pagination } from 'components/Common';

import * as orderDuck from 'ducks/order.duck';

// TODO: paging 처리하기. 171116
class OrderScreen extends Component {
    render() {
        return (
            <Order>
                <OrderHeader />
                <OrderContents>
                    <OrderTable {...this.props} />
                </OrderContents>
                <Pagination
                />
            </Order>
        );
    }
}

export default connect(
    state => ({
        status: {
            productDetail: state.order.getIn(['requests', 'orderList']),
        },
        valid: {
            productDetail: state.order.getIn(['requests', 'orderList'])
        }
    }),
    dispatch => ({
        OrderActions: bindActionCreators(orderDuck, dispatch)
    })
)(OrderScreen);