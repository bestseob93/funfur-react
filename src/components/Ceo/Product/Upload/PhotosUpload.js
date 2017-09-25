import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { isMouseBeyond } from 'helpers/sortableHelper';

class PhotosUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dragIndex: null,
            newIndex: null
        };
        
        this.handleTocuhStart = this.handleTocuhStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.dragStart = this.dragStart.bind(this);
        this.dragOver = this.dragOver.bind(this);
        this.dragStop = this.dragStop.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.onOpenClick = this.onOpenClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    dragStart(e) {
        const draggingIndex = e.currentTarget.dataset.id;

        this.setState({
            dragIndex: Number(draggingIndex)
        });

        console.log('----------- drag start -------------');
        let dt = e.dataTransfer;
        // if (dt !== undefined) {
        //   e.dataTransfer.setData('text', e.target.innerHTML);
        //   console.log(dt);
        //   if (dt.setDragImage && e.currentTarget.tagName.toLowerCase() === 'a') {
        //     dt.setDragImage(e.target, 0, 0);
        //     console.log(dt);
        //   }
        // }
    }

    dragOver(e) {
        e.preventDefault();
        const overEl = e.currentTarget;
        const indexDragged = Number(overEl.dataset.id);
        const indexFrom = Number(this.state.dragIndex);

        let positionX = e.touches ? e.touches[0].clientX : e.clientX;

        let mouseBeyond = isMouseBeyond(positionX, overEl.getBoundingClientRect().left, overEl.getBoundingClientRect().width);

        if (indexDragged !== indexFrom && mouseBeyond) {
            this.setState({
                newIndex: indexDragged
            });
          }
    }

    dragStop(e) {
        e.preventDefault();
        this.props.FormActions.formPhotoIndexUpdate({
            dragIndex: this.state.dragIndex,
            setNewIndex: this.state.newIndex
        });
    }

    handleTocuhStart(e) {
        console.log(e.touches);
    }

    handleTouchMove(e) {
        console.log(e.touches);
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
        const { FormActions, ProductActions, UiActions } = this.props;
        console.log(photoIndex);
        console.log(index);
        if(photoIndex === null && productId === null) {
            FormActions.formUploadRemove({
                formName: 'product',
                name: 'productImages',
                value: index
            });
        } else {
            if(presentPhoto === 'selected' && this.props.form.get('productImages').size < 2) {
                UiActions.showSweetAlert({
                    message: "최소 2개 이미지 이상일 때 대표 사진을 바꿀 수 있습니다.",
                    alertType: 'typeWarning',
                    value: true
                });
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
            dragStart,
            dragOver,
            dragStop,
            handleTocuhStart,
            handleTouchMove,
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
                    multiple={true}
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
                    multiple={true}
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
                    <div
                        key={value.name === undefined ? value.id : value.name}
                        draggable={true}
                        data-id={index}
                        className="product-box-contents flex-column"
                        style={{marginBottom: 25}}
                        onDragStart={dragStart}
                        onDragOver={dragOver}
                        onDragEnd={dragStop}
                        onTouchStart={dragStart}
                        onTouchMove={dragOver}
                        onTouchEnd={dragStop}
                    >
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

        console.log(this.state.renderImages);

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