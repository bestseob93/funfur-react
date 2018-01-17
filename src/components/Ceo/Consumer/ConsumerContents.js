import React, { Component } from 'react';
import ConsumerItem from './ConsumerItem';
import {
    Spinner
} from 'components/Common';

class ConsumerContents extends Component {
    constructor(props) {
        super(props);

        this.renderConsumerList = this.renderConsumerList.bind(this);
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
                        productPic={consumer.product_photo_path}
                        productName={consumer.product_name}
                        question={consumer.question}
                        productModel={consumer.model_name}
                        userNickname={consumer.nickname}
                        answer={consumer.answer}
                        status={this.props.status}
                        ProductActions={this.props.ProductActions}
                        UiActions={this.props.UiActions}
                    />;
        });
        return mappedData;
    }

    render() {
        const { renderConsumerList } = this;
        const emptyComponent = undefined;

        return (
            <section className="consumer-contents">
                {/* Spinner */}
                { this.props.status.consumerList.get('fetching') || this.props.status.answerPost.get('fetching') ? <Spinner /> : emptyComponent }
                <ul className="consumer-item-wrapper">
                    { this.props.valid.consumerList ? renderConsumerList(this.props.consumers) : emptyComponent }
                </ul>
            </section>
        );
    }
}

export default ConsumerContents;