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
            <HomeContainer>CeoHome
                <SalesStatus>
                    <div className="row">
                        <OrderStatus />
                        <DeliverStatus />
                    </div>
                    <div className="row">
                        <ServiceStatus />
                        <SalesAmountStatus />
                    </div>
                </SalesStatus>
                <div className="row">
                    <MiniNotice />
                    <Contact />
                </div>
                <FunfurStatus />
            </HomeContainer>
        );
    }
}

export default CeoHome;