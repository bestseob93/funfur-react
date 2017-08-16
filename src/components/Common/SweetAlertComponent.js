import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';

function SweetAlertComponent(props) {
    return (
        <SweetAlert
            showCancel={props.showCancel}
            cancelBtnBsStyle="default"
            success={props.typeSuccess}
            warning={props.typeWarning}
            danger={props.typeDanger}
            show={props.isAlertShow}
            title={props.alertTitle}
            onConfirm={props.hideAlert}
            onCancel={props.onDelete}
            confirmBtnText={props.typeSuccess ? "완료" : props.typeWarning ? "확인" : props.typeDanger ? "네 삭제하겠습니다." : "확인"}
            confirmBtnBsStyle={props.typeSuccess ? "success" : props.typeWarning ? "warning" : props.typeDanger ? "danger" : "default"}
        >
        {props.alertMessage}
        </SweetAlert>
    );
}

export default SweetAlertComponent;