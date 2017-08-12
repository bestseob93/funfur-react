import React, { Component } from 'react';

import {
    Consumer,
    ConsumerNav,
    ConsumerContents
} from 'components/Ceo/Consumer';

class ConsumerScreen extends Component {
    render() {
        return (
            <Consumer>
                <ConsumerNav />
                <ConsumerContents />
            </Consumer>
        );
    }
}

export default ConsumerScreen;