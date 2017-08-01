import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';


function SweetAlertComponent({isAlertShow, alertMessage, hideAlert}) {
    return (
        <SweetAlert
            show={isAlertShow}
            title={alertMessage}
            onConfirm={hideAlert}
        />
    );
}

export default SweetAlertComponent;