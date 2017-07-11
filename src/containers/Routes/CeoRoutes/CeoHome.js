import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CeoHome extends Component {
    render() {
        return (
            <div>CeoHome
                <Link to="/">to home</Link>
            </div>
        );
    }
}

export default CeoHome;