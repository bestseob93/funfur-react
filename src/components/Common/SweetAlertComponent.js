import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';


function SweetAlertComponent({isAlertShow, alertTitle, alertMessage, hideAlert}) {
    return (
        <SweetAlert
            show={isAlertShow}
            title={alertTitle}
            onConfirm={hideAlert}
        >
        {alertMessage}
        </SweetAlert>
    );
}

export default SweetAlertComponent;