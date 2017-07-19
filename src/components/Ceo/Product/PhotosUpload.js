import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class PhotosUpload extends Component {
    constructor(props) {
        super(props);

        this.handleFile = this.handleFile.bind(this);
        this.onOpenClick = this.onOpenClick.bind(this);
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

    render() {
        const {
            form
        } = this.props;

        const {
            handleFile,
            onOpenClick
        } = this;
        
        let formValues = form.toJS();
        let renderDroppedImage = [];
        console.log(this.props.form.toJS());
        console.log(formValues.productImages[0]);

        const rederDropzoneHidden = (
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
                        <p><i className="fa fa-plus-square fa-2x"></i><span>대표 사진</span></p>
                    </div>
                </Dropzone>
            </div>
        );

        if(formValues.productImages.length > 0) {
            formValues.productImages.map((value) => {
                renderDroppedImage.push((
                    <div key={value.name} className="product-box-contents flex-column" style={{marginBottom:25}}>
                        <div className="product-thumbnail case-upload">
                            <i className="fa fa-times-circle"></i>
                                <img
                                    className="id-image-after"
                                    key={value.name}
                                    src={value.preview}
                                    alt={value.name}
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
                    { formValues.productImages.length > 0 ?  rederDropzoneHidden : renderDropzone }
                    { formValues.productImages.length > 0 ? renderDroppedImage[0] : undefined }
                </div>
                <div className="col-md-offset-0 col-md-2 col-xs-offset-0 col-xs-5">
                    { formValues.productImages.length > 0 ?  rederDropzoneHidden : renderDropzone }
                    { formValues.productImages.length > 0 ? renderDroppedImage[1] : undefined }
                </div>
                <div className="col-md-offset-0 col-md-2 col-xs-offset-1 col-xs-5">
                    { formValues.productImages.length > 0 ?  rederDropzoneHidden : renderDropzone }
                    { renderDroppedImage }
                </div>
                <div className="col-md-offset-0 col-md-2 col-xs-offset-0 col-xs-5">
                    { formValues.productImages.length > 0 ?  rederDropzoneHidden : renderDropzone }
                    { renderDroppedImage }
                </div>
                <div className="col-md-offset-0 col-md-2 col-xs-offset-1 col-xs-5">
                    { formValues.productImages.length > 0 ?  rederDropzoneHidden : renderDropzone }
                    { renderDroppedImage }
                </div>
                <div className="col-md-offset-1 col-md-2 col-xs-offset-0 col-xs-5">
                    { formValues.productImages.length > 0 ?  rederDropzoneHidden : renderDropzone }
                    { renderDroppedImage }
                </div>
                <div className="col-md-offset-0 col-md-2 col-xs-offset-1 col-xs-5">
                    { formValues.productImages.length > 0 ?  rederDropzoneHidden : renderDropzone }
                    { renderDroppedImage }
                </div>
                <div className="col-md-offset-0 col-md-2 col-xs-offset-0 col-xs-5">
                    { formValues.productImages.length > 0 ?  rederDropzoneHidden : renderDropzone }
                    { renderDroppedImage }
                </div>
                <div className="col-md-offset-0 col-md-2 col-xs-offset-1 col-xs-5">
                    { formValues.productImages.length > 0 ?  rederDropzoneHidden : renderDropzone }
                    { renderDroppedImage }
                </div>
                <div className="col-md-offset-0 col-md-2 col-xs-offset-0 col-xs-5">
                    { formValues.productImages.length > 0 ?  rederDropzoneHidden : renderDropzone }
                    { renderDroppedImage }
                </div>
            </div>
        );
    }
}

export default PhotosUpload;