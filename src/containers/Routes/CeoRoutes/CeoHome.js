import React, { Component } from 'react';
import {
    HomeContainer,
    SalesStatus,
    DeliverStatus,
    OrderStatus,
    ServiceStatus,
    SalesAmountStatus,
    Contact,
    FunfurStatus
} from 'components/Ceo/Home';

class CeoHome extends Component {
    render() {
        return (
            <HomeContainer>
                <SalesStatus>
                    <div className="row status-box-wrapper">
                        <OrderStatus />
                        <DeliverStatus />
                    </div>
                    <div className="row status-box-wrapper">
                        <ServiceStatus />
                        <SalesAmountStatus />
                    </div>
                </SalesStatus>
                <FunfurStatus />
                <Contact />
            </HomeContainer>
        );
    }
}

export default CeoHome;