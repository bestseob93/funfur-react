import axios from 'axios';

const FUNFUR = process.env.REACT_APP_URL;

export const requestProductUpload = (productInfo, token) => {
    let formData = new FormData();

    console.log(productInfo.productImages);
    formData.append('productName', productInfo.productName);
    formData.append('productPosition', productInfo.productPosition);
    formData.append('firstSort_1', productInfo.firstSort_1);
    formData.append('secondSort_1', productInfo.secondSort_1);
    formData.append('productPosition_2', productInfo.productPosition_2);
    formData.append('firstSort_2', productInfo.firstSort_2);
    formData.append('secondSort_2', productInfo.secondSort_2);
    formData.append('modelName', productInfo.modelName);
    formData.append('modelOption', productInfo.modelOption);
    formData.append('productColor', productInfo.productColor);
    formData.append('sizeWidth', productInfo.sizeWidth);
    formData.append('sizeDepth', productInfo.sizeDepth);
    formData.append('sizeHeight', productInfo.sizeHeight);
    formData.append('mainMaterial', productInfo.mainMaterial);
    formData.append('prManufacturer', productInfo.prManufacturer);
    formData.append('productOrigin', productInfo.productOrigin);
    formData.append('productPrice', productInfo.productPrice);
    formData.append('asIntro', productInfo.asIntro);
    formData.append('productImages', productInfo.productImages);
    formData.append('SeoulGyungki', productInfo.SeoulGyungki);
    formData.append('GangWon', productInfo.GangWon);
    formData.append('ChungNam', productInfo.ChungNam);
    formData.append('ChungBuk', productInfo.ChungBuk);
    formData.append('GyeongBuk', productInfo.GyeongBuk);
    formData.append('GyeongNam', productInfo.GyeongNam);
    formData.append('JeonBuk', productInfo.JeonBuk);
    formData.append('JeonNam', productInfo.JeonNam);
    formData.append('JeJuSanGan', productInfo.JeJuSanGan);
    return axios({
        method: 'POST',
        url: `${FUNFUR}/product_web/upload`,
        headers: {
            Authorization: token
        },
        data: {
            formData
        }
    }).then(res => {
        return res;
    }).catch(err => {
        if(err) throw err;
    });
}