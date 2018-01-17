import React, { Component } from 'react';
import {
    Route,
    Switch,
    Link,
} from 'react-router-dom';
import {
    ToS,
    Privacy,
    Sales
} from 'components/Policy';

class PolicyScreen extends Component {
    render() {
        const { match } = this.props;
        return (
            <div className="container" style={{marginTop: '80px'}}>
                <ul className="policy-nav-wrapper">
                    <Link to={`${match.url}`}><li className={`${window.location.pathname === '/Policy' ? 'active' : ''}`}>뻔뻐 사장님사이트 이용 약관</li></Link>
                    <Link to={`${match.url}/sales`}><li className={`${window.location.pathname === '/Policy/sales' ? 'active' : ''}`}>제품 판매 이용약관</li></Link>
                    <Link to={`${match.url}/privacy`}><li className={`${window.location.pathname === '/Policy/privacy' ? 'active' : ''}`}>개인정보 처리방침</li></Link>
                </ul>
                <Switch>
                    <Route exact path={match.url} component={ToS} />
                    <Route exact path={`${match.url}/sales`} component={Sales} />
                    <Route exact path={`${match.url}/privacy`} component={Privacy} />
                </Switch>
            </div>
        )
    }
}

export default PolicyScreen;