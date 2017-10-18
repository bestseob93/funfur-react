import React, { Component } from 'react';
import ConsumerItem from './ConsumerItem';
import {
    Spinner
} from 'components/Common';

class ConsumerContents extends Component {
    constructor(props) {
        super(props);

        this.renderConsumerList = this.renderConsumerList.bind(this);
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

    renderConsumerList(datas) {
        
        const mappedData = datas.map((consumer, index) => {
            return <ConsumerItem
                        key={`${index}Consumer`}
                        index={consumer.inquiry_id}
                        setCollapseIndex={this.setCollapseIndex}
                    />;
        });
        console.log(datas);
        return mappedData;
    }

    setCollapseIndex(index) {
        const { UiActions } = this.props;
        UiActions.setCollapseIndex(index);
    }

    render() {
        const { renderConsumerList } = this;
        const emptyComponent = undefined;

        return (
            <section className="consumer-contents">
                {/* Spinner */}
                { this.props.status.consumerList.get('fetching') || this.props.status.answerPost.get('fetching') ? <Spinner /> : emptyComponent }
                { this.props.valid.consumerList ? renderConsumerList(this.props.consumers) : emptyComponent }
            </section>
        );
    }
}

export default ConsumerContents;