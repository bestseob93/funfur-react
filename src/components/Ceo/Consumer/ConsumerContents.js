import React, { Component } from 'react';
import Collapse from 'react-css-collapse';


class ConsumerContents extends Component {
    constructor(props) {
        super(props);

        this.setCollapseIndex = this.setCollapseIndex.bind(this);
    }

    setCollapseIndex(index) {
        const { UiActions } = this.props;
        if(this.props.collapseIndex !== null) {
            UiActions.setCollapseIndex(index);
        } else {
            UiActions.setCollapseIndex(null);
        }
    }

    render() {
        const { setCollapseIndex } = this.props;
        return (
            <div className="consumer-contents">
                <div onClick={setCollapseIndex}>
                    <p>답변을 기다리고 있어요</p>
                </div>
                <Collapse isOpen={this.props.collapseIndex}>
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