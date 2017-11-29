import React from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';

function SweetAlertComponent(props) {
    console.log(props);
    return (
        <SweetAlert
            showCancel={props.showCancel}
            cancelBtnBsStyle="default"
            success={props.typeSuccess}
            warning={props.typeWarning}
            danger={props.typeDanger}
            show={props.isAlertShow}
            title={props.alertTitle}
            onConfirm={props.onDelete}
            onCancel={props.hideAlert}
            confirmBtnText={props.typeSuccess ? "완료" : props.typeWarning ? "확인" : props.typeDanger ? "네 삭제하겠습니다." : "확인"}
            confirmBtnBsStyle={props.typeSuccess ? "success" : props.typeWarning ? "warning" : props.typeDanger ? "danger" : "default"}
        >
        {props.alertMessage}
        </SweetAlert>
    );
}

SweetAlert.propTypes = {
    showCancel: PropTypes.bool,
    isAlertShow: PropTypes.bool,
    alertTitle: PropTypes.string,
    alertMessage: PropTypes.string,
    typeSuccess: PropTypes.bool,
    typeWarning: PropTypes.bool,
    typeDanger: PropTypes.bool
};

SweetAlert.defaultProps = {
    showCancel: false,
    isAlertShow: false,
    alertTitle: '',
    alertMessage: '',
    typeSuccess: false,
    typeWarning: false,
    typeDanger: false
};

export default SweetAlertComponent;