import React, { Component } from "react";
import { Link } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars";

import { Spinner, SubTitle, FormLabel } from "components/Common";
import {
  PositionSelect,
  SortableSelect,
  PhotosUpload,
  DeliveryTable
} from "components/Ceo/Product";

import axios from "axios";
import storage from "helpers/localForage.helper";

const FUNFUR = process.env.REACT_APP_URL + "/api/v1";

class ProductForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      btnDisabled: false
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleProportionChk = this.handleProportionChk.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.toggleSubmitBtn = this.toggleSubmitBtn.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderPosition = this.renderPosition.bind(this);
    this.renderFirstSort = this.renderFirstSort.bind(this);
    this.renderSecondSort = this.renderSecondSort.bind(this);
    this.renderSortTwo = this.renderSortTwo.bind(this);
  }

  componentDidMount() {
    const { FormActions } = this.props;
    FormActions.formReset("product");
    // TODO 임시 저장 로직 구현 필요
  }

  componentWillReceiveProps(nextProps) {
    const { FormActions } = this.props;
    if (
      this.props.form.get("productPosition") !==
      nextProps.form.get("productPosition")
    ) {
      FormActions.formChange({
        formName: "product",
        name: "firstSort_1",
        value: ""
      });
    }
    if (
      this.props.form.get("productPosition_2") !==
      nextProps.form.get("productPosition_2")
    ) {
      FormActions.formChange({
        formName: "product",
        name: "firstSort_2",
        value: ""
      });
    }
  }

  /* input 값에 따라 redux에 form store 값 업데이트 */
  changeHandler(ev) {
    const { FormActions } = this.props;

    FormActions.formChange({
      formName: "product",
      name: ev.target.name,
      value: ev.target.value
    });

    /* 배송비 종류 선택하는 곳 free 일 경우 기존 배송비 입력된 값 초기화 */
    if (
      ev.target.name === "isDeliverFree" &&
      this.costSelect.value === "free"
    ) {
      FormActions.deliverCostFree();
    }
  }

  /* 전 지역 배송비용 동일 체크박스 */
  handleCheckBox(ev) {
    const { FormActions, form } = this.props;

    FormActions.handleCheckBox({
      formName: "product",
      name: ev.target.name,
      value: ev.target.checked
    });

    /* 체크하고 1초 뒤에 전 지역 첫 번째 입력 값으로 통일 */
    setTimeout(() => {
      if (this.props.form.get("isCostSame")) {
        const formName = [
          "GangWon",
          "ChungNam",
          "ChungBuk",
          "GyeongBuk",
          "GyeongNam",
          "JeonBuk",
          "JeonNam",
          "JeJuSanGan"
        ];
        for (let i = 0; i < 8; i++) {
          FormActions.formChange({
            formName: "product",
            name: formName[i],
            value: form.get("SeoulGyungki")
          });
        }
      }
    }, 1000);
  }

  /* 비례 배송 체크박스 */
  handleProportionChk(ev) {
    const { FormActions } = this.props;
    FormActions.handleProportionChk({
      formName: "product",
      name: ev.target.name,
      value: ev.target.checked
    });
  }

  /* 배송비 같을 때 나머지 form 값 변경 */
  handleBlur(ev) {
    const { FormActions, form } = this.props;
    const formName = [
      "GangWon",
      "ChungNam",
      "ChungBuk",
      "GyeongBuk",
      "GyeongNam",
      "JeonBuk",
      "JeonNam",
      "JeJuSanGan"
    ];
    for (let i = 0; i < 8; i++) {
      FormActions.formChange({
        formName: "product",
        name: formName[i],
        value: form.get("SeoulGyungki")
      });
    }
  }

  toggleSubmitBtn(isDisabled) {
    this.setState({
      btnDisabled: isDisabled
    });
  }

  /* 제품 등록 요청 */
  async handleSubmit(ev) {
    const { UiActions, ProductActions, FormActions, form } = this.props;

    const { toggleSubmitBtn } = this;
    const regNumberOnly = /^[0-9]*$/; // 숫자 체크 정규식

    toggleSubmitBtn(true);

    const productInfo = {
      productName: form.get("productName") || "",
      productPosition: form.get("productPosition") || "",
      firstSort_1: form.get("firstSort_1") || "",
      secondSort_1: form.get("secondSort_1") || "",
      productPosition_2: form.get("productPosition_2") || "",
      firstSort_2: form.get("firstSort_2") || "",
      secondSort_2: form.get("secondSort_2") || "",
      modelName: form.get("modelName") || "",
      modelOption: form.get("modelOption") || "",
      productColor: form.get("productColor") || "",
      sizeWidth: form.get("sizeWidth") || "",
      sizeDepth: form.get("sizeDepth") || "",
      sizeHeight: form.get("sizeHeight") || "",
      mainMaterial: form.get("mainMaterial") || "",
      prManufacturer: form.get("prManufacturer") || "",
      productOrigin: form.get("productOrigin") || "",
      productPrice: form.get("productPrice") || "",
      productImages: form.get("productImages") || "",
      isDeliverFree: form.get("isDeliverFree") || "",
      SeoulGyungki:
        form.get("isDeliverFree") === "free" ? "0" : form.get("SeoulGyungki"),
      GangWon: form.get("isDeliverFree") === "free" ? "0" : form.get("GangWon"),
      ChungNam:
        form.get("isDeliverFree") === "free" ? "0" : form.get("ChungNam"),
      ChungBuk:
        form.get("isDeliverFree") === "free" ? "0" : form.get("ChungBuk"),
      GyeongBuk:
        form.get("isDeliverFree") === "free" ? "0" : form.get("GyeongBuk"),
      GyeongNam:
        form.get("isDeliverFree") === "free" ? "0" : form.get("GyeongNam"),
      JeonBuk: form.get("isDeliverFree") === "free" ? "0" : form.get("JeonBuk"),
      JeonNam: form.get("isDeliverFree") === "free" ? "0" : form.get("JeonNam"),
      JeJuSanGan:
        form.get("isDeliverFree") === "free" ? "0" : form.get("JeJuSanGan"),
      isCostSame: form.get("isCostSame") && form.get("isCostSame"),
      proportionShipping:
        form.get("proportionShipping") && form.get("proportionShipping")
    };

    if (productInfo.productName === "") {
      UiActions.showSweetAlert({
        value: "warning",
        alertTitle: "",
        message: "제품명을 입력해주세요!"
      });
      toggleSubmitBtn(false);
    } else if (productInfo.productPosition === "") {
      UiActions.showSweetAlert({
        value: "warning",
        alertTitle: "",
        message: "제품 위치를 설정해주세요!"
      });
      toggleSubmitBtn(false);
    } else if (productInfo.modelName === "") {
      UiActions.showSweetAlert({
        value: "warning",
        alertTitle: "",
        message: "모델명을 입력해주세요!"
      });
      toggleSubmitBtn(false);
    } else if (productInfo.modelOption === "") {
      UiActions.showSweetAlert({
        value: "warning",
        alertTitle: "",
        message: "제품 옵션을 입력해주세요!"
      });
      toggleSubmitBtn(false);
    } else if (productInfo.productColor === "") {
      UiActions.showSweetAlert({
        value: "warning",
        alertTitle: "",
        message: "제품 색상을 입력해주세요!"
      });
      toggleSubmitBtn(false);
    } else if (
      productInfo.sizeWidth === "" ||
      productInfo.sizeDepth === "" ||
      productInfo.sizeHeight === ""
    ) {
      UiActions.showSweetAlert({
        value: "warning",
        alertTitle: "",
        message: "제품 사이즈를 입력해주세요!"
      });
      toggleSubmitBtn(false);
    } else if (productInfo.mainMaterial === "") {
      UiActions.showSweetAlert({
        value: "warning",
        alertTitle: "",
        message: "주요 소재를 입력해주세요!"
      });
      toggleSubmitBtn(false);
    } else if (productInfo.prManufacturer === "") {
      UiActions.showSweetAlert({
        value: "warning",
        alertTitle: "",
        message: "제조사를 입력해주세요!"
      });
      toggleSubmitBtn(false);
    } else if (productInfo.productOrigin === "") {
      UiActions.showSweetAlert({
        value: "warning",
        alertTitle: "",
        message: "원산지를 입력해주세요!"
      });
      toggleSubmitBtn(false);
    } else if (productInfo.productPrice === "") {
      UiActions.showSweetAlert({
        value: "warning",
        alertTitle: "",
        message: "소비자 가격을 입력해주세요!"
      });
      toggleSubmitBtn(false);
    } else if (!regNumberOnly.test(productInfo.productPrice)) {
      UiActions.showSweetAlert({
        value: "warning",
        alertTitle: "",
        message: "소비자 가격은 숫자만 입력해주세요!"
      });
      toggleSubmitBtn(false);
    } else if (productInfo.isDeliverFree === "") {
      UiActions.showSweetAlert({
        value: "warning",
        alertTitle: "",
        message: "배송비를 설정해주세요!"
      });
      toggleSubmitBtn(false);
    } else if (productInfo.productImages.size < 1) {
      UiActions.showSweetAlert({
        value: "error",
        alertTitle: "",
        message: "사진은 반드시 1장 이상 업로드 해주셔야합니다!"
      });
      toggleSubmitBtn(false);
    } else {
      try {
        const requestProductUpload = productInfo => {
          return storage.get("token").then(token => {
            let formData = new FormData();

            const productImages = productInfo.productImages.toJS();

            productImages.forEach(file => {
              console.log(file);
              formData.append("productPhoto", file);
            });
            formData.append("productName", productInfo.productName);
            formData.append("productPosition_1", productInfo.productPosition);
            formData.append("firstSort_1", productInfo.firstSort_1);
            formData.append("secondSort_1", productInfo.secondSort_1);
            formData.append("productPosition_2", productInfo.productPosition_2);
            formData.append("firstSort_2", productInfo.firstSort_2);
            formData.append("secondSort_2", productInfo.secondSort_2);
            formData.append("modelName", productInfo.modelName);
            formData.append("modelOption", productInfo.modelOption);
            formData.append("productColor", productInfo.productColor);
            formData.append("sizeWidth", productInfo.sizeWidth);
            formData.append("sizeDepth", productInfo.sizeDepth);
            formData.append("sizeHeight", productInfo.sizeHeight);
            formData.append("mainMaterial", productInfo.mainMaterial);
            formData.append("prManufacturer", productInfo.prManufacturer);
            formData.append("productOrigin", productInfo.productOrigin);
            formData.append("productPrice", productInfo.productPrice);
            formData.append("isDeliverFree", productInfo.isDeliverFree);
            formData.append("SeoulGyungki", productInfo.SeoulGyungki);
            formData.append("GangWon", productInfo.GangWon);
            formData.append("ChungNam", productInfo.ChungNam);
            formData.append("ChungBuk", productInfo.ChungBuk);
            formData.append("GyeongBuk", productInfo.GyeongBuk);
            formData.append("GyeongNam", productInfo.GyeongNam);
            formData.append("JeonBuk", productInfo.JeonBuk);
            formData.append("JeonNam", productInfo.JeonNam);
            formData.append("JeJuSanGan", productInfo.JeJuSanGan);
            formData.append("samePrice", productInfo.isCostSame);
            formData.append(
              "proportionShipping",
              productInfo.proportionShipping
            );

            return axios
              .post(`${FUNFUR}/product_web/upload`, formData, {
                headers: {
                  Authorization: token
                }
              })
              .then(res => {
                console.log("product res");
                console.log(res);
                return res;
              })
              .catch(err => {
                window.bugsnagClient.notify(new Error("제품 업로드 에러 - 토큰"), {
                  metaData: {
                    productInfo: productInfo,
                    formState_upload: this.props.status.upload.toJS(),
                    props: this.props,
                    device: navigator,
                    error: err,
                    token: token
                  },
                  severity: "error",
                  beforeSend: function(report) {
                    if (report.user.id === "a") report.ignore();
                  },
                  user: window.bugsnagClient.user,
                  context: "ProductForm Upload error"
                });


                return err;
              });
          });
        };

        requestProductUpload(productInfo)
          .then(res => {
            if (res.status !== 200) {
              console.log(res);
              throw new Error(res);
            }

            UiActions.showSweetAlert({
              value: "success",
              alertTitle: "",
              message: "제품이 성공적으로 등록되었습니다!"
            });
            FormActions.formReset("product");
            this.props.history.push("/ceo/products");
          })
          .catch(err => {
            toggleSubmitBtn(false);

            window.bugsnagClient.notify(new Error("제품 업로드 에러"), {
              metaData: {
                productInfo: productInfo,
                formState_upload: this.props.status.upload.toJS(),
                props: this.props,
                device: navigator,
                error: err,
              },
              severity: "error",
              beforeSend: function(report) {
                if (report.user.id === "a") report.ignore();
              },
              user: window.bugsnagClient.user,
              context: "ProductForm Upload error"
            });

            console.log(navigator);
            UiActions.showSweetAlert({
              value: "error",
              alertTitle: "",
              alertMessage: "tesxt",
              message: "오류가 발생했습니다"
            });
          });
      } catch (e) {
        // TODO 스윗 알럿 추가
        UiActions.showSweetAlert({
          value: "error",
          alertTitle: "",
          message: e
        });

        if (e) {
          toggleSubmitBtn(false);
          console.log("product error : ");
          console.log(e);
          throw e;
        }
      }
    }
  }

  renderPosition(isFirstSortable) {
    if (isFirstSortable) {
      return (
        <PositionSelect
          first={true}
          changeHandler={this.changeHandler}
          formValue={this.props.form.get("productPosition")}
        />
      );
    } else {
      return (
        <PositionSelect
          first={false}
          changeHandler={this.changeHandler}
          formValue={this.props.form.get("productPosition")}
        />
      );
    }
  }

  /* 위치 관련 첫번째 분류 렌더링 */
  renderFirstSort(isFirstSortable, position) {
    if (isFirstSortable) {
      switch (position) {
        case "거실":
          return (
            <SortableSelect
              first={true}
              sortIndex={0}
              changeHandler={this.changeHandler}
            />
          );
        case "주방":
          return (
            <SortableSelect
              first={true}
              sortIndex={1}
              changeHandler={this.changeHandler}
            />
          );
        case "침실":
          return (
            <SortableSelect
              first={true}
              sortIndex={2}
              changeHandler={this.changeHandler}
            />
          );
        case "키즈/유아":
          return (
            <SortableSelect
              first={true}
              sortIndex={3}
              changeHandler={this.changeHandler}
            />
          );
        case "학생/서재":
          return (
            <SortableSelect
              first={true}
              sortIndex={4}
              changeHandler={this.changeHandler}
            />
          );
        case "화장실":
          return (
            <SortableSelect
              first={true}
              sortIndex={5}
              changeHandler={this.changeHandler}
            />
          );
        default:
          // 인테리어 소품
          return;
      }
    } else {
      switch (position) {
        case "거실":
          return (
            <SortableSelect
              isSecondSortable={true}
              first={true}
              sortIndex={0}
              changeHandler={this.changeHandler}
            />
          );
        case "주방":
          return (
            <SortableSelect
              isSecondSortable={true}
              first={true}
              sortIndex={1}
              changeHandler={this.changeHandler}
            />
          );
        case "침실":
          return (
            <SortableSelect
              isSecondSortable={true}
              first={true}
              sortIndex={2}
              changeHandler={this.changeHandler}
            />
          );
        case "키즈/유아":
          return (
            <SortableSelect
              isSecondSortable={true}
              first={true}
              sortIndex={3}
              changeHandler={this.changeHandler}
            />
          );
        case "학생/서재":
          return (
            <SortableSelect
              isSecondSortable={true}
              first={true}
              sortIndex={4}
              changeHandler={this.changeHandler}
            />
          );
        case "화장실":
          return (
            <SortableSelect
              isSecondSortable={true}
              first={true}
              sortIndex={5}
              changeHandler={this.changeHandler}
            />
          );
        default:
          // 인테리어 소품
          return;
      }
    }
  }

  /* 위치 관련 두번째 분류 렌더링 */
  renderSecondSort(isFirstSortable, first) {
    if (isFirstSortable) {
      switch (first) {
        case "테이블":
          return (
            <SortableSelect
              first={false}
              sortIndex={0}
              changeHandler={this.changeHandler}
            />
          );
        case "의자":
          return (
            <SortableSelect
              first={false}
              sortIndex={1}
              changeHandler={this.changeHandler}
            />
          );
        case "소파":
          return (
            <SortableSelect
              first={false}
              sortIndex={2}
              changeHandler={this.changeHandler}
            />
          );
        case "거실장":
          return (
            <SortableSelect
              first={false}
              sortIndex={3}
              changeHandler={this.changeHandler}
            />
          );
        case "식탁 세트":
          return (
            <SortableSelect
              first={false}
              sortIndex={4}
              changeHandler={this.changeHandler}
            />
          );
        case "식탁":
          return (
            <SortableSelect
              first={false}
              sortIndex={4}
              changeHandler={this.changeHandler}
            />
          );
        case "홈 바":
          return (
            <SortableSelect
              first={false}
              sortIndex={5}
              changeHandler={this.changeHandler}
            />
          );
        case "주방 수납장":
          return (
            <SortableSelect
              first={false}
              sortIndex={6}
              changeHandler={this.changeHandler}
            />
          );
        case "침대":
          return (
            <SortableSelect
              first={false}
              sortIndex={7}
              changeHandler={this.changeHandler}
            />
          );
        case "화장대":
          return (
            <SortableSelect
              first={false}
              sortIndex={8}
              changeHandler={this.changeHandler}
            />
          );
        case "서랍장":
          return (
            <SortableSelect
              first={false}
              sortIndex={9}
              changeHandler={this.changeHandler}
            />
          );
        case "수납장":
          return (
            <SortableSelect
              first={false}
              sortIndex={10}
              changeHandler={this.changeHandler}
            />
          );
        case "책상/의자":
          return (
            <SortableSelect
              first={false}
              sortIndex={11}
              changeHandler={this.changeHandler}
            />
          );
        case "침대(유아)":
          return (
            <SortableSelect
              first={false}
              sortIndex={12}
              changeHandler={this.changeHandler}
            />
          );
        case "책상":
          return (
            <SortableSelect
              first={false}
              sortIndex={13}
              changeHandler={this.changeHandler}
            />
          );
        case "의자(서재)":
          return (
            <SortableSelect
              first={false}
              sortIndex={14}
              changeHandler={this.changeHandler}
            />
          );
        case "책장":
          return (
            <SortableSelect
              first={false}
              sortIndex={15}
              changeHandler={this.changeHandler}
            />
          );
        default:
          return;
      }
    } else {
      switch (first) {
        case "테이블":
          return (
            <SortableSelect
              isSecondSortable={true}
              first={false}
              sortIndex={0}
              changeHandler={this.changeHandler}
            />
          );
        case "의자":
          return (
            <SortableSelect
              isSecondSortable={true}
              first={false}
              sortIndex={1}
              changeHandler={this.changeHandler}
            />
          );
        case "소파":
          return (
            <SortableSelect
              isSecondSortable={true}
              first={false}
              sortIndex={2}
              changeHandler={this.changeHandler}
            />
          );
        case "거실장":
          return (
            <SortableSelect
              isSecondSortable={true}
              first={false}
              sortIndex={3}
              changeHandler={this.changeHandler}
            />
          );
        case "식탁 세트":
          return (
            <SortableSelect
              isSecondSortable={true}
              first={false}
              sortIndex={4}
              changeHandler={this.changeHandler}
            />
          );
        case "식탁":
          return (
            <SortableSelect
              isSecondSortable={true}
              first={false}
              sortIndex={4}
              changeHandler={this.changeHandler}
            />
          );
        case "홈 바":
          return (
            <SortableSelect
              isSecondSortable={true}
              first={false}
              sortIndex={5}
              changeHandler={this.changeHandler}
            />
          );
        case "주방 수납장":
          return (
            <SortableSelect
              isSecondSortable={true}
              first={false}
              sortIndex={6}
              changeHandler={this.changeHandler}
            />
          );
        case "침대":
          return (
            <SortableSelect
              isSecondSortable={true}
              first={false}
              sortIndex={7}
              changeHandler={this.changeHandler}
            />
          );
        case "화장대":
          return (
            <SortableSelect
              isSecondSortable={true}
              first={false}
              sortIndex={8}
              changeHandler={this.changeHandler}
            />
          );
        case "서랍장":
          return (
            <SortableSelect
              isSecondSortable={true}
              first={false}
              sortIndex={9}
              changeHandler={this.changeHandler}
            />
          );
        case "수납장":
          return (
            <SortableSelect
              isSecondSortable={true}
              first={false}
              sortIndex={10}
              changeHandler={this.changeHandler}
            />
          );
        case "책상/의자":
          return (
            <SortableSelect
              isSecondSortable={true}
              first={false}
              sortIndex={11}
              changeHandler={this.changeHandler}
            />
          );
        case "침대(유아)":
          return (
            <SortableSelect
              isSecondSortable={true}
              first={false}
              sortIndex={12}
              changeHandler={this.changeHandler}
            />
          );
        case "책상":
          return (
            <SortableSelect
              isSecondSortable={true}
              first={false}
              sortIndex={13}
              changeHandler={this.changeHandler}
            />
          );
        case "의자(서재)":
          return (
            <SortableSelect
              isSecondSortable={true}
              first={false}
              sortIndex={14}
              changeHandler={this.changeHandler}
            />
          );
        case "책장":
          return (
            <SortableSelect
              isSecondSortable={true}
              first={false}
              sortIndex={15}
              changeHandler={this.changeHandler}
            />
          );
        default:
          return;
      }
    }
  }

  renderSortTwo() {
    const { UiActions, FormActions } = this.props;
    if (this.props.isSecondSortable) {
      UiActions.removeSecondSortable(); // - 누르면 두 번째 위치 추가 삭제.
      FormActions.resetSecondSortable();
    } else {
      if (this.props.form.get("productPosition") === "") {
        alert("첫번째 위치를 먼저 추가해주세요!");
      } else {
        UiActions.addSecondSortable(); // + 누르면 두 번째 위치 추가 추가.
      }
    }
  }

  componentWillUnmount() {
    const { FormActions } = this.props;
    // TODO: Form Rest
  }

  render() {
    const {
      changeHandler,
      handleCheckBox,
      handleProportionChk,
      handleBlur,
      handleSubmit,
      renderPosition,
      renderFirstSort,
      renderSecondSort,
      renderSortTwo
    } = this;

    const emptyComponent = undefined;

    return (
      <div>
        {/* 스피너 */}
        {this.props.status.upload.get("fetching") && <Spinner />}
        <SubTitle title="제품 등록" />
        <div className="row form-box">
          <FormLabel name="제품명" />
          <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
            <input
              type="text"
              className="form-control"
              name="productName"
              placeholder="제품명을 적어주세요."
              required
              onChange={changeHandler}
            />
          </div>
        </div>
        <SubTitle title="제품 분류" />
        <div className="row form-box">
          {/* TODO: 동적으로 바꾸고, 첫번째에 선택된 값 배열에서 빼기 */}
          <FormLabel name="위치" />
          <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
            {renderPosition(true)}
          </div>
        </div>
        <div className="row form-box">
          <FormLabel name="1차 분류" />
          <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
            {renderFirstSort(
              true,
              this.props.form.get("productPosition")
            ) /* 분류 값에 따라 하위 분류 */}
          </div>
        </div>
        <div className="row form-box">
          <FormLabel name="2차 분류" />
          <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
            {renderSecondSort(true, this.props.form.get("firstSort_1"))}
          </div>
        </div>
        <div className="row text-center">
          <p>
            <i
              className={`fa ${
                this.props.isSecondSortable
                  ? "fa-minus-circle"
                  : "fa-plus-circle"
              } fa-2x`}
              style={{ cursor: "pointer" }}
              onClick={renderSortTwo}
            />
          </p>
        </div>
        {this.props.isSecondSortable ? (
          <div className="row form-box animated fadeInUp">
            <FormLabel name="위치" />
            <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
              {renderPosition(false)}
            </div>
          </div>
        ) : (
          emptyComponent
        )}
        {this.props.isSecondSortable ? (
          <div className="row form-box animated fadeInUp">
            <FormLabel name="1차 분류" />
            <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
              {renderFirstSort(
                false,
                this.props.form.get("productPosition_2")
              ) /* 분류 값에 따라 하위 분류 */}
            </div>
          </div>
        ) : (
          emptyComponent
        )}
        {this.props.isSecondSortable ? (
          <div className="row form-box animated fadeInUp">
            <FormLabel name="2차 분류" />
            <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
              {renderSecondSort(false, this.props.form.get("firstSort_2"))}
            </div>
          </div>
        ) : (
          emptyComponent
        )}
        <SubTitle title="제품 정보" />
        <div className="row form-box">
          <FormLabel name="모델명" />
          <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
            <input
              type="text"
              className="form-control"
              name="modelName"
              placeholder="-을 제외한 모델명을 적어주세요."
              required
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="row form-box">
          <FormLabel name="옵션" />
          <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
            <select
              className="form-control"
              name="modelOption"
              value={this.props.form.get("modelOption")}
              onChange={changeHandler}
            >
              <option>옵션 선택</option>
              <option value="부분조립">부분조립</option>
              <option value="완제품">완제품</option>
              <option value="DIY">DIY</option>
            </select>
          </div>
        </div>
        <div className="row form-box">
          <p className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-3">
            * 조립이 필요하시다면 설명서를 &lt;업체제공정보&gt;에 꼭 넣어주세요!
          </p>
        </div>
        {/* 색상 코드 or 네모의 색깔? */}
        <div className="row form-box">
          <FormLabel name="색상" />
          <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
            <input
              type="text"
              className="form-control"
              name="productColor"
              placeholder="색상을 적어주세요."
              required
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="row form-box">
          <FormLabel name="사이즈(가로)" />
          <div
            className="col-md-5 col-xs-9 col-xs-offset-1 col-md-offset-0"
            style={{ paddingRight: 5 }}
          >
            <input
              type="number"
              className="form-control"
              name="sizeWidth"
              placeholder="제품의 가로 길이를 적어주세요."
              required
              onChange={changeHandler}
            />
          </div>
          <span
            className="col-md-1 col-xs-1 col-xs-offset-0 col-md-offset-0"
            style={{ padding: 0, paddingTop: 10 }}
          >
            cm
          </span>
        </div>
        <div className="row form-box">
          <FormLabel name="사이즈(세로)" />
          <div
            className="col-md-5 col-xs-9 col-xs-offset-1 col-md-offset-0"
            style={{ paddingRight: 5 }}
          >
            <input
              type="number"
              className="form-control"
              name="sizeDepth"
              placeholder="제품의 세로 길이를 적어주세요."
              required
              onChange={changeHandler}
            />
          </div>
          <span
            className="col-md-1 col-xs-1 col-xs-offset-0 col-md-offset-0"
            style={{ padding: 0, paddingTop: 10 }}
          >
            cm
          </span>
        </div>
        <div className="row form-box">
          <FormLabel name="사이즈(높이)" />
          <div
            className="col-md-5 col-xs-9 col-xs-offset-1 col-md-offset-0"
            style={{ paddingRight: 5 }}
          >
            <input
              type="number"
              className="form-control"
              name="sizeHeight"
              placeholder="제품의 높이를 적어주세요."
              required
              onChange={changeHandler}
            />
          </div>
          <span
            className="col-md-1 col-xs-1 col-xs-offset-0 col-md-offset-0"
            style={{ padding: 0, paddingTop: 10 }}
          >
            cm
          </span>
        </div>
        <div className="row form-box has-textarea">
          <FormLabel name="주요 소재" />
          <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
            <textarea
              style={{ resize: "none", height: 130 }}
              className="form-control"
              name="mainMaterial"
              placeholder="가구 '주요 소재'들을 적어주세요."
              required
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="row form-box">
          <FormLabel name="제조사" />
          <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
            <input
              type="text"
              className="form-control"
              name="prManufacturer"
              placeholder="제조 회사를 적어주세요."
              required
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="row form-box">
          <FormLabel name="원산지" />
          <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
            <input
              type="text"
              className="form-control"
              name="productOrigin"
              placeholder="소재 원산지를 적어주세요."
              required
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="row form-box">
          <FormLabel name="소비자가격" />
          <div className="col-md-5 col-xs-9 col-xs-offset-1 col-md-offset-0">
            <input
              type="text"
              className="form-control"
              name="productPrice"
              placeholder="소비자 가격을 적어주세요."
              required
              onChange={changeHandler}
            />
          </div>
          <span
            className="col-md-1 col-xs-1 col-xs-offset-0 col-md-offset-0"
            style={{ padding: 0, paddingTop: 10 }}
          >
            원
          </span>
        </div>
        <SubTitle title="배송 정보" />
        <div className="row form-box">
          <FormLabel name="배송비" />
          <div className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0">
            <select
              ref={select => (this.costSelect = select)}
              className="form-control"
              name="isDeliverFree"
              value={this.props.form.get("isDeliverFree")}
              onChange={changeHandler}
            >
              <option value="">배송비 선택</option>
              <option value="free">무료</option>
              <option value="unfree">유료</option>
            </select>
          </div>
        </div>
        {/* 배송비 선택하기 전과 무료일 경우 테이블 hide 유료일 경우에만 show */}
        {this.props.form.get("isDeliverFree") === "" ? (
          emptyComponent
        ) : this.props.form.get("isDeliverFree") === "free" ? (
          emptyComponent
        ) : (
          <div className="row form-box">
            <FormLabel name="지역별 배송비 설정" />
            <DeliveryTable
              form={this.props.form}
              sameCost={this.props.form.get("SeoulGyungki")}
              changeHandler={changeHandler}
              handleBlur={handleBlur}
            />
          </div>
        )}
        {this.props.form.get("isDeliverFree") === "" ? (
          emptyComponent
        ) : this.props.form.get("isDeliverFree") === "free" ? (
          emptyComponent
        ) : (
          <p className="row">
            <span className="col-md-3 col-xs-8 col-xs-offset-1 col-md-offset-3">
              * 전 지역 동일 시 체크해주세요.
            </span>
            <input
              className="col-md-1 col-xs-1"
              type="checkbox"
              name="isCostSame"
              id="isCostSame"
              onChange={handleCheckBox}
            />
            <label htmlFor="isCostSame" />
          </p>
        )}
        {this.props.form.get("isDeliverFree") === "" ? (
          emptyComponent
        ) : this.props.form.get("isDeliverFree") === "free" ? (
          emptyComponent
        ) : (
          <p className="row">
            <span className="col-md-3 col-xs-8 col-xs-offset-1 col-md-offset-3">
              * 비례 배송일 경우 체크해주세요.
            </span>
            <input
              className="col-md-1 col-xs-1"
              type="checkbox"
              name="proportionShipping"
              id="proportionShipping"
              onChange={handleProportionChk}
            />
            <label htmlFor="proportionShipping" />
          </p>
        )}
        {this.props.form.get("isDeliverFree") === "" ? (
          emptyComponent
        ) : this.props.form.get("isDeliverFree") === "free" ? (
          emptyComponent
        ) : (
          <p className="row delivery-warning">
            <span className="col-md-6 col-xs-10 col-md-offset-3 col-xs-offset-1">
              * 뻔뻐의 정책 상, 모든 비용은 소비자가 선결제 하게 됩니다. 배송비
              착불 불가합니다!
            </span>
          </p>
        )}
        <div className="row form-box delivery-info-box">
          <FormLabel name="배송 및 반품/교환/AS 안내" />
          <div
            className="col-md-6 col-xs-10 col-xs-offset-1 col-md-offset-0"
            style={{ height: "100%" }}
          >
            <Scrollbars
              style={{ backgroundColor: "white", border: "1px solid #e5e6e7" }}
            >
              <p className="product-delivery-info">
                <b>배송안내</b>
                <p>* 택배배송 / 업체 발송 후 2~5일</p>
                <p>* 직접배송 (용달) / 업체 발송 후 1~7일</p>
                <p>
                  * 주문제작 상품의 경우 제작에서 발송까지 더 시간이 소요될 수
                  있습니다.
                </p>
                <p>
                  * 더욱 자세한 배송기간은 송장번호 및 해당 업체에 문의해주세요.
                </p>
                <p>* 배송비의 경우 해당제품의 [배송] 란을 확인해주세요 :)</p>
                <b>주문취소 시 주의사항</b>
                <p>
                  * 주문취소는 물류센터 출발 전에만 가능합니다. (배송비
                  부담없음)
                </p>
                <p>
                  * 주문취소 시 물류센터에서 출발했을 경우, 왕복 배송비는
                  고객부담입니다.
                </p>
                <b>교환, 반품시 주의사항</b>
                <p>
                  * 교환 또는 반품은 설치기사와 함께 현장에서 확인하여
                  접수해주시기 바랍니다.
                </p>
                <p>
                  * 배송기사가 해당지역을 벗어난 후 접수되는 교환 및 반품의
                  경우에는 사유에 따라 불가하거나 다소 시일이 걸릴 수 있습니다.
                </p>
                <p>
                  * 배송된 제품이 파손, 손상되었거나 오염되어 있을
                  경우, 수령일로부터 7일 이내 무상 교환/ 반품이 가능합니다.
                </p>
                <p>
                  * 고객의 변심에 의한 반품/교환 신청은 반품 규정에
                  의거, 상품인도 후 7일 이내 신청이 가능합니다. (공정거래위원회
                  표준약관) 단, 고객의 부주의로 인한 상품훼손의 경우에는
                  불가합니다.
                </p>
                <p>
                  * 배송상품의 내용이 표시 광고 및 계약내용과 다른 경우 상품을
                  수령하신 날로부터 3개월 이내, 그 사실을 인지한 날(인지할 수
                  있었던 날)부터 30일 이내 청약철회가 가능합니다.
                </p>
                <p>
                  * 고객변심에 의한 교환, 반품일 경우 왕복배송비는 고객님
                  부담입니다.
                </p>
                <p>
                  * 현장에서 확인되는 환경적 요인에 의한 배송불가의 경우에도
                  왕복배송비가 부담됩니다.
                </p>
                <p>
                  * 상품의 하자가 아닌 환불은 상품회수 및 왕복배송비용 입금확인
                  후 진행됩니다. 왕복배송비용은 상품별로 다르므로 반드시 업체에
                  확인바랍니다.
                </p>

                <b>교환, 반품이 불가능한 경우</b>
                <p>
                  * 초기 배송 시 발견되지 않은 외형 파손에 대해서는 교환 및
                  반품이 불가능합니다. (반드시 배송기사와 함께 상품을
                  확인해주세요)
                </p>
                <p>
                  * 상품을 배송하여 박스가 심히 훼손되었거나 조립 및 설치 후
                  재판매가 불가능한 상태의 경우 교환, 반품이 불가능합니다.
                </p>
                <p>
                  (박스개봉 시 상품이 훼손되지 않도록 주의하여 주시고 상품상태
                  확인 전까지 박스를 버리지 마시길 바랍니다.)
                </p>
                <p>
                  * 수제품류(공방제품 등)는 주문제작 상품으로 주문 후 절대
                  교환, 반품이 불가합니다.
                </p>
                <p>
                  * 조립 설치품 (배송 후 조립 또는 설치가 필요한 제품) 은 조립
                  설치 후에 교환/반품이 불가합니다.
                </p>
                <p>
                  * 매트리스는 제품의 위생 관리상 포자 개봉 및 사용후에는
                  원칙적으로 교환/환불이 불가합니다.
                </p>
                <p>
                  * 붙박이장의 특성상 설치 후 교환/반품이 불가합니다.
                  (단, 제품하자의 경우는 제외)
                </p>

                <b>AS안내</b>
                <p>* 상품의 기술적인 하자에 한하여 A/S가 가능합니다.</p>
                <p>
                  * 고객 부주의로 인한 A/S는 별도의 비용을 부담 하셔야 합니다.
                </p>
                <p>* 개별업체 상품의 A/S의 경우 해당업체의 내규에 따릅니다.</p>
                <p>
                  * 교체가 불가능한 부위의 파손은 부분적 A/S가 불가능합니다.
                </p>
              </p>
            </Scrollbars>
          </div>
        </div>
        <SubTitle title="사진 업로드" />
        <PhotosUpload {...this.props} />
        <div className="row form-box padding-top50 padding-bottom">
          <div className="btn-container">
            <Link to="/ceo/products">
              <button className="btn btn-common btn-prev modify delete">
                취소하기
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-common btn-next modify confirm"
              onClick={handleSubmit}
              disabled={this.state.btnDisabled}
            >
              제품등록
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductForm;
