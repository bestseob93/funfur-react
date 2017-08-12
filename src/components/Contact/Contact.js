import React, { Component } from 'react';

class Contact extends Component {
    render() {
        return (
            <div className="contact-wrapper container">
                { this.props.children }
            </div>
        );
    }
}

export default Contact;