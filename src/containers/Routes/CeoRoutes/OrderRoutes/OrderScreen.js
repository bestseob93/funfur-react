import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';
import {
    Order,
    OrderHeader,
    OrderContents,
    OrderTable,
} from 'components/Ceo/Order';
import {
    Pagination,
    Spinner
} from 'components/Common';

import * as orderDuck from 'ducks/order.duck';
import * as formDuck from 'ducks/form.duck';

// TODO: paging 처리하기. 171116
class OrderScreen extends Component {
    constructor(props) {
        super(props);
        let exampleItems = _.range(1, 151).map(i => { return { id: i, name: 'Item ' + i }; });
        this.state = {
            exampleItems: exampleItems,
            pageOfItems: []
        };

        this.onChangePage = this.onChangePage.bind(this);
    }

    async componentDidMount() {
        const { OrderActions } = this.props;
        try {
            await OrderActions.getOrderList();
        } catch (e) {
            if(e) throw e;
        }
    }

    onChangePage(pageOfItems) {
        this.setState({
            pageOfItems: pageOfItems
        });
    }

    render() {
        console.log(this.state.pageOfItems);
        if(this.props.status.orderList.get('fetching')) {
            return <Spinner />;
        }
        return (
            <Order>
                <OrderHeader />
                <OrderContents>
                    <OrderTable tableItems={this.state.pageOfItems} {...this.props} />
                </OrderContents>
                <Pagination
                    items={this.props.orders}
                    onChangePage={this.onChangePage}
                />
            </Order>
        );
    }
}

export default connect(
    state => ({
        status: {
            orderList: state.order.getIn(['requests', 'orderList']),
            orderDetailShipping: state.order.getIn(['requests', 'orderDetailShipping']),
            shippingRegister: state.order.getIn(['requests', 'shippingRegister'])
        },
        valid: {
            orderList: state.order.getIn(['valid', 'orderList']),
            orderDetailShipping: state.order.getIn(['valid', 'orderDetailShipping']),
            shippingRegister: state.order.getIn(['valid', 'shippingRegister'])
        },
        orders: state.order.get('orders'),
        form: state.form.get('orders'),
        orderDetail: state.order.get('orderDetail')
    }),
    dispatch => ({
        OrderActions: bindActionCreators(orderDuck, dispatch),
        FormActions: bindActionCreators(formDuck, dispatch)
    })
)(OrderScreen);