import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class PhotosUpload extends Component {
    constructor(props) {
        super(props);

        this.handleFile = this.handleFile.bind(this);
        this.onOpenClick = this.onOpenClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    /* react-dropzone을 이용하여 redux의 form 업데이트 */
    handleFile(files) {
        const { FormActions } = this.props;
        FormActions.formUploadAdd({
            formName: 'product',
            name: 'productImages',
            value: files
        });
    }

    onOpenClick() {
        this.dropzone.open();
    }

    handleClose(presentPhoto, productId, photoIndex, index) {
        const { FormActions, ProductActions } = this.props;
        console.log(photoIndex);
        console.log(index);
        if(photoIndex === null && productId === null) {
            FormActions.formUploadRemove({
                formName: 'product',
                name: 'productImages',
                value: index
            });
        } else {
            if(presentPhoto === 'selected') {
                console.warn("대표사진입니다.");
            } else {
                FormActions.formUploadRemove({
                    formName: 'product',
                    name: 'productImages',
                    value: index
                });

                ProductActions.removeProductDetailPhoto(productId, photoIndex);
            }
        }


    }

    render() {
        const {
            form
        } = this.props;

        const {
            handleFile,
            onOpenClick,
            handleClose
        } = this;

        let formValues = form.toJS();
        let renderDroppedImage = [];
        console.log(this.props.form.toJS());
        console.log(formValues.productImages[0]);

        const renderDropzoneHidden = (
            <div className="dropzone-hidden">
                <Dropzone
                    ref={(node) => { this.dropzone = node; }}
                    onDrop={handleFile}
                    accept="image/jpeg, image/png"
                    multiple={false}
                >
                </Dropzone>
            </div>
        );

        const renderDropzonePresent = (
            <div className="product-box text-center">                                  
                <Dropzone
                    ref={(node) => { this.dropzone = node;}}
                    className="upload-dropzone"
                    onDrop={handleFile}
                    accept="image/jpeg, image/png"
                    multiple={false}
                >
                    <div className="product-box-contents add-product product-photo">
                        <p><i className="fa fa-plus-square fa-2x"></i><span>대표 사진</span></p>
                    </div>
                </Dropzone>
            </div>
        );

        const renderDropzone = (
            <div className="product-box text-center">                                  
                <Dropzone
                    ref={(node) => { this.dropzone = node;}}
                    className="upload-dropzone"
                    onDrop={handleFile}
                    accept="image/jpeg, image/png"
                    multiple={false}
                >
                    <div className="product-box-contents add-product product-photo">
                        <p><i className="fa fa-plus-square fa-2x"></i><span>사진 추가</span></p>
                    </div>
                </Dropzone>
            </div>
        );



        if(formValues.productImages.length > 0) {
            formValues.productImages.map((value, index) => {
                console.log(value);
                renderDroppedImage.push((
                    <div key={value.name === undefined ? value.id : value.name} className="product-box-contents flex-column" style={{marginBottom: 25}}>
                        <div className="product-thumbnail case-upload">
                            <i className="fa fa-times-circle" onClick={() => value.id !== undefined ? value.showing_photo === 'selected' ? handleClose(value.showing_photo, value.product_id, value.id, index) : handleClose(null, value.product_id, value.id, index) : handleClose(null, null, null, index)}></i>
                            <img
                                className="id-image-after"
                                key={value.name === undefined ? (value.id + value.product_id).toString() : value.name}
                                src={value.preview === undefined ? value.product_photo_path : value.preview}
                                alt={value.preview === undefined ? value.product_photo_path : value.preview}
                                onClick={onOpenClick}
                            />
                        </div>
                    </div>
                ));
            });
        } else {
            renderDroppedImage = null;
        }

        return (
            <div className="row form-box">
                <div className="col-md-offset-1 col-md-2 col-xs-offset-1 col-xs-5">
                    { formValues.productImages[0] !== undefined ?  renderDropzoneHidden :  renderDropzonePresent }
                    { formValues.productImages[0] !== undefined ? renderDroppedImage[0] : undefined }
                </div>
                <div className="col-md-offset-0 col-md-2 col-xs-offset-0 col-xs-5">
                    { formValues.productImages[1] !== undefined ?  renderDropzoneHidden : renderDropzone }
                    { formValues.productImages[1] !== undefined ? renderDroppedImage[1] : undefined }
                </div>
                <div className="col-md-offset-0 col-md-2 col-xs-offset-1 col-xs-5">
                    { formValues.productImages[2] !== undefined ?  renderDropzoneHidden : renderDropzone }
                    { formValues.productImages[2] !== undefined ? renderDroppedImage[2] : undefined }
                </div>
                <div className="col-md-offset-0 col-md-2 col-xs-offset-0 col-xs-5">
                    { formValues.productImages[3] !== undefined ?  renderDropzoneHidden : renderDropzone }
                    { formValues.productImages[3] !== undefined ? renderDroppedImage[3] : undefined }
                </div>
                <div className="col-md-offset-0 col-md-2 col-xs-offset-1 col-xs-5">
                    { formValues.productImages[4] !== undefined ?  renderDropzoneHidden : renderDropzone }
                    { formValues.productImages[4] !== undefined ? renderDroppedImage[4] : undefined }
                </div>
                <div className="col-md-offset-1 col-md-2 col-xs-offset-0 col-xs-5">
                    { formValues.productImages[5] !== undefined ?  renderDropzoneHidden : renderDropzone }
                    { formValues.productImages[5] !== undefined ? renderDroppedImage[5] : undefined }
                </div>
                <div className="col-md-offset-0 col-md-2 col-xs-offset-1 col-xs-5">
                    { formValues.productImages[6] !== undefined ?  renderDropzoneHidden : renderDropzone }
                    { formValues.productImages[6] !== undefined ? renderDroppedImage[6] : undefined }
                </div>
                <div className="col-md-offset-0 col-md-2 col-xs-offset-0 col-xs-5">
                    { formValues.productImages[7] !== undefined ?  renderDropzoneHidden : renderDropzone }
                    { formValues.productImages[7] !== undefined ? renderDroppedImage[7] : undefined }
                </div>
                <div className="col-md-offset-0 col-md-2 col-xs-offset-1 col-xs-5">
                    { formValues.productImages[8] !== undefined ?  renderDropzoneHidden : renderDropzone }
                    { formValues.productImages[8] !== undefined ? renderDroppedImage[8] : undefined }
                </div>
                <div className="col-md-offset-0 col-md-2 col-xs-offset-0 col-xs-5">
                    { formValues.productImages[9] !== undefined ?  renderDropzoneHidden : renderDropzone }
                    { formValues.productImages[9] !== undefined ? renderDroppedImage[9] : undefined }
                </div>
            </div>
        );
    }
}

export default PhotosUpload;