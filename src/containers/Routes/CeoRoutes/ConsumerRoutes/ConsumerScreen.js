import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    Consumer,
    ConsumerHeader,
    ConsumerContents
} from 'components/Ceo/Consumer';

import * as uiDuck from 'ducks/ui.duck';
import * as productDuck from 'ducks/product.duck';

class ConsumerScreen extends Component {
    render() {
        return (
            <Consumer>
                <ConsumerHeader />
                <ConsumerContents { ...this.props } />
            </Consumer>
        );
    }
}

export default connect(
    state => ({
        status: {
            consumerList: state.get.product.getIn(['requests', 'consumer']),
            answerPost: state.get.product.getIn(['requests', 'answer'])
        },
        valid: {
            answerPost: state.get.product.getIn(['valid', 'answer'])
        },
        collapseIndex: state.ui.get('collapseIndex')
    }),
    dispatch => ({
        ProducActions: bindActionCreators(productDuck, dispatch),
        UiActions: bindActionCreators(uiDuck, dispatch)
    })
)(ConsumerScreen);