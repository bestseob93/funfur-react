import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    HomeContainer,
    SalesStatus,
    DeliverStatus,
    OrderStatus,
    ServiceStatus,
    SalesAmountStatus
} from 'components/Ceo/Home';

class CeoHome extends Component {
    render() {
        return (
            <HomeContainer>CeoHome
                <SalesStatus>
                    <OrderStatus />
                    <DeliverStatus />
                    <ServiceStatus />
                    <SalesAmountStatus />
                </SalesStatus>
                <Link to="/">to home</Link>
            </HomeContainer>
        );
    }
}

export default CeoHome;