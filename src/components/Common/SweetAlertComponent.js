import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';

class SweetAlertComponent extends Component {

    static propTypes = {
        showCancel: PropTypes.bool,
        isAlertShow: PropTypes.bool,
        alertTitle: PropTypes.string,
        alertMessage: PropTypes.string,
        alertType: PropTypes.string,
        onDelete: PropTypes.func,
        confirmText: PropTypes.string,
    }

    static defaultProps = {
        showCancel: false,
        isAlertShow: false,
        alertTitle: '',
        alertMessage: '',
        alertType: '',
        onDelete: () => {},
        confirmText: '확인'
    }

    componentWillUnmount() {
        const { UiActions } = this.props;
        UiActions.clearSweetAlert();
    }

    render() {
        const {
            showCancel,
            alertType,
            isAlertShow,
            alertMessage,
            alertTitle,
            hideAlert,
            onDelete,
            confirmText
        } = this.props;

        return (
            <SweetAlert
                showCancelButton={showCancel}
                cancelBtnBsStyle="default"
                type={alertType}
                show={isAlertShow}
                title={alertTitle}
                text={alertMessage}
                onConfirm={alertTitle === "정말로 삭제하시겠습니까?" ? onDelete : hideAlert}
                onCancel={hideAlert}
                onEscapeKey={hideAlert}
                confirmButtonText={confirmText}
                confirmButtonColor={alertType ==='success' ? "#aedef4" : alertType === 'warning' ? "#fdc731" : alertType === 'error' ? "#e64942" : "#fdc731"}
            />
        )
    }
}

export default SweetAlertComponent;