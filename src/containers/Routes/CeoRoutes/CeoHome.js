import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    HomeContainer,
    SalesStatus,
    DeliverStatus,
    OrderStatus,
    ServiceStatus,
    SalesAmountStatus,
    MiniNotice,
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
                <div className="row">
                    <MiniNotice />
                    <Contact />
                </div>
            </HomeContainer>
        );
    }
}

export default CeoHome;