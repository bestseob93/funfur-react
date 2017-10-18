import React, { Component} from 'react';
import Collapse from 'react-css-collapse';

class ConsumerItem extends Component {
    render() {

        return (
            <div className="consumer-item-wrapper">
                <div onClick={() => this.props.setCollapseIndex(this.props.index)}>
                    <p>답변을 기다리고 있어요</p>
                </div>
                <Collapse isOpen={this.props.collapseIndex === 1}>
                    <p>hi</p>
                    <p>hi2</p>
                    <p>hi3</p>
                    <p>hi4</p>
                </Collapse>
            </div>
        );
    }
}

export default ConsumerItem;