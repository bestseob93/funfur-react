import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Pagination,
    Spinner
} from 'components/Common';

import * as uiDuck from 'ducks/ui.duck';
import * as formDuck from 'ducks/form.duck';
import {
    Exchange,
    ExchangeHeader,
    ExchangeContents,
    ExchangeTable
} from 'components/Ceo/Exchange';

class ExchangeScreen extends Component {
    constructor(props) {
        super(props);

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal() {
        this.props.UiActions.showModal();
    }

    hideModal() {
        this.props.UiActions.hideModal();
    }

    render() {
        return (
            <Exchange>
                <ExchangeHeader />
                <ExchangeContents>
                    <ExchangeTable showModal={this.showModal} hideModal={this.hideModal} />
                </ExchangeContents>
            </Exchange>
        );
    }
}


export default connect(
    state => ({
        status: {
            orderList: state.order.getIn(['requests', 'orderList']),
            orderDetailShipping: state.order.getIn(['requests', 'orderDetailShipping']),
            shippingRegister: state.order.getIn(['requests', 'shippingRegister']),
            shippingUpdate: state.order.getIn(['requests', 'shippingUpdate'])
        },
        valid: {
            orderList: state.order.getIn(['valid', 'orderList']),
            orderDetailShipping: state.order.getIn(['valid', 'orderDetailShipping']),
            shippingRegister: state.order.getIn(['valid', 'shippingRegister']),
            shippingUpdate: state.order.getIn(['valid', 'shippingUpdate'])
        },
        orders: state.order.get('orders'),
        form: state.form.get('orders'),
        orderDetail: state.order.get('orderDetail')
    }),
    dispatch => ({
        FormActions: bindActionCreators(formDuck, dispatch),
        UiActions: bindActionCreators(uiDuck, dispatch)
    })
)(ExchangeScreen);