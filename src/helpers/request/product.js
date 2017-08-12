import axios from 'axios';
import storage from '../localForage.helper';

const FUNFUR = process.env.REACT_APP_URL;

export const requestProductList = () => {
    return storage.get('token').then((token) => {
        let formData = new FormData();

        return axios({
            method: 'GET',
            url: `${FUNFUR}/product_web/thumbnail`,
            headers: {
                Authorization: token
            }
        }).then(res => {
            return res;
        }).catch(err => {
            if(err) throw err;
        });
    });
}

export const requestProductDetail = (productId) => {
    return storage.get('token').then((token) => {
        return axios({
            method: 'GET',
            url: `${FUNFUR}/product_web/thumbnail/${productId}`,
            headers: {
                Authorization: token
            }
        }).then(res => {
            return res;
        }).catch(err => {
            if(err) throw err;
        });
    });
}

export const requestProductUpload = (productInfo) => {
    return storage.get('token').then((token) => {
        let formData = new FormData();

        console.log(productInfo.isDeliverFree);
        const productImages = productInfo.productImages.toJS();
        productImages.forEach((file) => {
            formData.append('productPhoto', file);
        });
        formData.append('productName', productInfo.productName);
        formData.append('productPosition_1', productInfo.productPosition);
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
        formData.append('isDeliverFree', productInfo.isDeliverFree);
        formData.append('SeoulGyungki', productInfo.SeoulGyungki);
        formData.append('GangWon', productInfo.GangWon);
        formData.append('ChungNam', productInfo.ChungNam);
        formData.append('ChungBuk', productInfo.ChungBuk);
        formData.append('GyeongBuk', productInfo.GyeongBuk);
        formData.append('GyeongNam', productInfo.GyeongNam);
        formData.append('JeonBuk', productInfo.JeonBuk);
        formData.append('JeonNam', productInfo.JeonNam);
        formData.append('JeJuSanGan', productInfo.JeJuSanGan);
        formData.append('isCostSame', productInfo.isCostSame);
        return axios.post(`${FUNFUR}/product_web/upload`, formData, { headers: {
            Authorization: token
        }
        }).then(res => {
            return res;
        }).catch(err => {
            if(err) throw err;
        });
    });
}

export const requestRemoveProductDetailPhoto = (productId, photoIndex) => {
    return storage.get('token').then((token) => {
        return axios({
            method: 'DELETE',
            url: `${FUNFUR}/product_web/photo_delete/${productId}/${photoIndex}`,
            headers: {
                Authorization: token
            }
        }).then(res => {
            return res;
        }).catch(err => {
            if(err) throw err;
        })
    })
}

export const requestProductModify = (productId, productInfo) => {
    return storage.get('token').then((token) => {
        let formData = new FormData();
        const productImages = productInfo.productImages.toJS();

        for(let i=0; i<productImages.length; i++) {
            if(productImages[i].id === undefined) {
                formData.append('productPhoto', productImages[i]);
            }
        }

        formData.append('productName', productInfo.productName);
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

        return axios.put(`${FUNFUR}/product_web/thumbnail/${productId}`, formData, { headers: {
            Authorization: token
        }
        }).then(res => {
            return res;
        }).catch(err => {
            if(err) throw err;
        });
    })
}

export const requestProductRemove = (productId) => {
    return storage.get('token').then((token) => {
        return axios.delete(`${FUNFUR}/product_web/thumbnail/${productId}`, { headers: {
            Authorization: token
        }
        }).then(res => {
            return res;
        }).catch(err => {
            if(err) throw err;
        });
    })
}