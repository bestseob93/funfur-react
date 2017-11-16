import React, { Component } from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import {
    ToS,
    Privacy
} from 'components/Policy';

class PolicyScreen extends Component {
    render() {
        const { match } = this.props;
        console.log(match.url);
        return (
            <div>
                <Switch>
                    <Route exact path={match.url} component={ToS} />
                    <Route exact path={`${match.url}/privacy`} component={Privacy} />
                </Switch>
            </div>
        )
    }
}

export default PolicyScreen;