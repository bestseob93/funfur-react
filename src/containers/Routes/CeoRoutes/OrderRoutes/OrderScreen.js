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
            return <Spinner />
        }
        // var a = this.props.orders.toJS();
        // console.log(a);
        // if(a.length > 0) {
        //     a[1].shipping_company = 'a';
        // }
        // let temp;
        // for(let i=0; i<a.length; i++) {
        //     if(a[i].shipping_company !== '') {
        //         temp = a[i];
        //         a[i] = a[a.length];
        //         a[a.length] = temp;
        //     }
        // }
        
        // console.log(_.sortBy(a, 'order_date'));
        return (
            <Order>
                <OrderHeader />
                <OrderContents>
                    <OrderTable tableItems={this.state.pageOfItems} />
                    
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
        },
        valid: {
            orderList: state.order.getIn(['requests', 'orderList'])
        },
        orders: state.order.get('orders')
    }),
    dispatch => ({
        OrderActions: bindActionCreators(orderDuck, dispatch)
    })
)(OrderScreen);