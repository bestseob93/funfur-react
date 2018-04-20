import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { isMouseBeyond } from "helpers/sortableHelper";

class PhotosUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dragIndex: null,
      newIndex: null,
      isAddtional: false
    };

    this.handleTocuhStart = this.handleTocuhStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.dragOver = this.dragOver.bind(this);
    this.dragStop = this.dragStop.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.onOpenClick = this.onOpenClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAddLine = this.handleAddLine.bind(this);
  }

  dragStart(e) {
    const draggingIndex = e.currentTarget.dataset.id;

    this.setState({
      dragIndex: Number(draggingIndex)
    });
  }

  dragOver(e) {
    e.preventDefault();
    const overEl = e.currentTarget;
    const indexDragged = Number(overEl.dataset.id);
    const indexFrom = Number(this.state.dragIndex);

    let positionX = e.touches ? e.touches[0].clientX : e.clientX;

    let mouseBeyond = isMouseBeyond(
      positionX,
      overEl.getBoundingClientRect().left,
      overEl.getBoundingClientRect().width
    );

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
    //console.log(e.touches);
  }

  handleTouchMove(e) {
    //console.log(e.touches);
  }

  /* react-dropzone을 이용하여 redux의 form 업데이트 */
  handleFile(files) {
    const { FormActions } = this.props;
    FormActions.formUploadAdd({
      formName: "product",
      name: "productImages",
      value: files
    });
  }

  onOpenClick() {
    this.dropzone.open();
  }

  handleClose(presentPhoto, productId, photoIndex, index) {
    const { FormActions, ProductActions, UiActions } = this.props;
    if (photoIndex === null && productId === null) {
      FormActions.formUploadRemove({
        formName: "product",
        name: "productImages",
        value: index
      });
    } else {
      if (
        presentPhoto === "selected" &&
        this.props.form.get("productImages").size < 2
      ) {
        UiActions.showSweetAlert({
          message: "최소 2개 이미지 이상일 때 대표 사진을 바꿀 수 있습니다.",
          alertTitle: "",
          value: "warning"
        });
      } else {
        FormActions.formUploadRemove({
          formName: "product",
          name: "productImages",
          value: index
        });

        ProductActions.removeProductDetailPhoto(productId, photoIndex);
      }
    }
  }

  handleAddLine() {
    this.setState({
      isAddtional: !this.state.isAddtional
    });
  }

  render() {
    const { form } = this.props;

    const {
      dragStart,
      dragOver,
      dragStop,
      handleTocuhStart,
      handleTouchMove,
      handleFile,
      onOpenClick,
      handleClose,
      handleAddLine
    } = this;

    let formValues = form.toJS();
    let renderDroppedImage = [];

    const renderDropzoneHidden = (
      <div className="dropzone-hidden">
        <Dropzone
          ref={node => {
            this.dropzone = node;
          }}
          onDrop={handleFile}
          accept="image/jpeg, image/png"
          multiple={false}
        />
      </div>
    );

    const renderDropzonePresent = (
      <div className="product-box text-center add-photo">
        <Dropzone
          ref={node => {
            this.dropzone = node;
          }}
          className="upload-dropzone present"
          onDrop={handleFile}
          accept="image/jpeg, image/png"
          multiple={true}
        >
          <div className="product-box-contents add-product product-photo">
            <p className="product-inside">
              <span>대표 사진</span>
            </p>
          </div>
        </Dropzone>
      </div>
    );

    const renderDropzone = (
      <div className="product-box text-center add-photo">
        <Dropzone
          ref={node => {
            this.dropzone = node;
          }}
          className="upload-dropzone"
          onDrop={handleFile}
          accept="image/jpeg, image/png"
          multiple={true}
        >
          <div className="product-box-contents add-product product-photo">
            <p className="product-inside" />
          </div>
        </Dropzone>
      </div>
    );

    if (formValues.productImages.length > 0) {
      formValues.productImages.map((value, index) => {
        renderDroppedImage.push(
          <div
            key={value.name === undefined ? value.id : value.name}
            draggable={true}
            data-id={index}
            className="product-box-contents flex-column"
            style={{ marginBottom: 25 }}
            onDragStart={dragStart}
            onDragOver={dragOver}
            onDragEnd={dragStop}
            onTouchStart={dragStart}
            onTouchMove={dragOver}
            onTouchEnd={dragStop}
          >
            <div className="product-thumbnail case-upload">
              <i
                className="fa fa-times-circle"
                onClick={() =>
                  value.id !== undefined
                    ? value.showing_photo === "selected"
                      ? handleClose(
                          value.showing_photo,
                          value.product_id,
                          value.id,
                          index
                        )
                      : handleClose(null, value.product_id, value.id, index)
                    : handleClose(null, null, null, index)
                }
              />
              <img
                className="id-image-after"
                key={
                  value.name === undefined
                    ? (value.id + value.product_id).toString()
                    : value.name
                }
                src={
                  value.preview === undefined
                    ? value.product_photo_path
                    : value.preview
                }
                alt={
                  value.preview === undefined
                    ? value.product_photo_path
                    : value.preview
                }
                onClick={onOpenClick}
              />
            </div>
          </div>
        );
      });
    } else {
      renderDroppedImage = null;
    }

    const uploadOneLinePrimitive = index => {
      const isEmptyImages = index => {
        return formValues.productImages[index] !== undefined;
      };

      return (
        <div>
          <div className="col-md-offset-1 col-md-2 col-xs-offset-1 col-xs-5">
            {isEmptyImages(index)
              ? renderDropzoneHidden
              : renderDropzonePresent}
            {isEmptyImages(index) ? renderDroppedImage[index] : undefined}
          </div>
          <div className="col-md-offset-0 col-md-2 col-xs-offset-0 col-xs-5">
            {isEmptyImages(index + 1) ? renderDropzoneHidden : renderDropzone}
            {isEmptyImages(index + 1)
              ? renderDroppedImage[index + 1]
              : undefined}
          </div>
          <div className="col-md-offset-0 col-md-2 col-xs-offset-1 col-xs-5">
            {isEmptyImages(index + 2) ? renderDropzoneHidden : renderDropzone}
            {isEmptyImages(index + 2)
              ? renderDroppedImage[index + 2]
              : undefined}
          </div>
          <div className="col-md-offset-0 col-md-2 col-xs-offset-0 col-xs-5">
            {isEmptyImages(index + 3) ? renderDropzoneHidden : renderDropzone}
            {isEmptyImages(index + 3)
              ? renderDroppedImage[index + 3]
              : undefined}
          </div>
          <div className="col-md-offset-0 col-md-2 col-xs-offset-1 col-xs-5">
            {isEmptyImages(index + 4) ? renderDropzoneHidden : renderDropzone}
            {isEmptyImages(index + 4)
              ? renderDroppedImage[index + 4]
              : undefined}
          </div>
        </div>
      );
    };

    const uploadOneLine = index => {
      const isEmptyImages = index => {
        return formValues.productImages[index] !== undefined;
      };

      return (
        <div>
          <div className="col-md-offset-1 col-md-2 col-xs-offset-1 col-sm-4 ">
            {isEmptyImages(index) ? renderDropzoneHidden : renderDropzone}
            {isEmptyImages(index) ? renderDroppedImage[index] : undefined}
          </div>
          <div className="col-md-offset-0 col-md-2 col-xs-offset-0 col-sm-4">
            {isEmptyImages(index + 1) ? renderDropzoneHidden : renderDropzone}
            {isEmptyImages(index + 1)
              ? renderDroppedImage[index + 1]
              : undefined}
          </div>
          <div className="col-md-offset-0 col-md-2 col-xs-offset-1 col-sm-4">
            {isEmptyImages(index + 2) ? renderDropzoneHidden : renderDropzone}
            {isEmptyImages(index + 2)
              ? renderDroppedImage[index + 2]
              : undefined}
          </div>
          <div className="col-md-offset-0 col-md-2 col-xs-offset-0 col-sm-4">
            {isEmptyImages(index + 3) ? renderDropzoneHidden : renderDropzone}
            {isEmptyImages(index + 3)
              ? renderDroppedImage[index + 3]
              : undefined}
          </div>
          <div className="col-md-offset-0 col-md-2 col-xs-offset-1 col-sm-4">
            {isEmptyImages(index + 4) ? renderDropzoneHidden : renderDropzone}
            {isEmptyImages(index + 4)
              ? renderDroppedImage[index + 4]
              : undefined}
          </div>
        </div>
      );
    };

    const addtionalLine = () => {
      return (
        <div>
          {uploadOneLine(10)}
          {uploadOneLine(15)}
        </div>
      );
    };

    return (
      <div className="row form-box">
        {uploadOneLinePrimitive(0)}
        {uploadOneLine(5)}

        <div className="addAddtionalPhoto">
          <div className="center">
            <button className="no-style" onClick={handleAddLine}>
              사진 더 추가하기
            </button>
          </div>
        </div>
        {this.state.isAddtional || formValues.productImages.length > 10
          ? addtionalLine()
          : undefined}
      </div>
    );
  }
}

export default PhotosUpload;
