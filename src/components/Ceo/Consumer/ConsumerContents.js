import React, { Component } from 'react';
import Collapse from 'react-css-collapse';
import {
    Spinner
} from 'components/Common';

class ConsumerContents extends Component {
    constructor(props) {
        super(props);

        this.setCollapseIndex = this.setCollapseIndex.bind(this);
    }

    async componentDidMount() {
        const { ProductActions } = this.props;
        try {
            await ProductActions.getConsumerList();
        } catch (e) {
            if(e) throw e;
        }
    }

    setCollapseIndex(index) {
        const { UiActions } = this.props;
        UiActions.setCollapseIndex(index);
    }

    render() {
        const { setCollapseIndex } = this;
        const emptyComponent = undefined;

        return (
            <div className="consumer-contents">
                {/* Spinner */}
                { this.props.status.consumerList.get('fetching') || this.props.status.answerPost.get('fetching') ? <Spinner /> : emptyComponent }
                <div onClick={() => setCollapseIndex(1)}>
                    <p>답변을 기다리고 있어요</p>
                </div>
                <Collapse isOpen={this.props.collapseIndex === 1}>
                    <p>hi</p>
                    <p>hi2</p>
                    <p>hi3</p>
                    <p>hi4</p>
                </Collapse>
                <Collapse isOpen={true}>
                    <p>hi1313</p>
                    <p>hi13213</p>
                    <p>h213123i</p>
                    <p>hi213123</p>
                </Collapse>
                <Collapse isOpen={false}>
                    <p>dsfdsfdshi</p>
                    <p>hfdsfdsfi</p>
                    <p>hdsfsdfi</p>
                    <p>hsfsdi</p>
                </Collapse>
            </div>
        );
    }
}

export default ConsumerContents;