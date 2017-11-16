import React, { Component } from 'react';
import {
    Exchange,
    ExchangeHeader,
    ExchangeContents,
    ExchangeTable
} from 'components/Ceo/Exchange';

class ExchangeScreen extends Component {
    render() {
        return (
            <Exchange>
                <ExchangeHeader />
                <ExchangeContents>
                    <ExchangeTable />
                </ExchangeContents>
            </Exchange>
        );
    }
}

export default ExchangeScreen;