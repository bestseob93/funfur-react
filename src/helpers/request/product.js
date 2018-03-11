import axios from 'axios';
import storage from '../localForage.helper';

const FUNFUR = process.env.REACT_APP_URL;

export const requestProductList = () => {
    return storage.get('token').then((token) => {
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
};

export const requestProductDetail = (productId) => {
    return storage.get('token').then((token) => {
        return axios({
            method: 'GET',
            url: `${FUNFUR}/product_web/thumbnail/${productId}`,
            headers: {
                Authorization: token
            }
        }).then(res => {
            console.log(res);
            return res;
        }).catch(err => {
            if(err) throw err;
        });
    });
};

export const requestProductUpload = (productInfo) => {
    return storage.get('token').then((token) => {
        let formData = new FormData();

        // const productImages = productInfo.productImages.toJS();
        //
        // productImages.forEach((file) => {
        //     console.log(file);
        //     formData.append('productPhoto', file);
        // });

        productInfo.forEach(info => {
            if (info.id === 'productImages') {
                info.value.toJS().forEach(file => {
                    formData.append('productPhoto', file);
                });
            } else {
                formData.append(info.id, info.value);
            }
        });


        return axios.post(`${FUNFUR}/product_web/upload`, formData, {
            headers: {
                Authorization: token
            }
        }).then(res => {
            return res;
        }).catch(err => {
            if(err) throw err;
        });
    });
};

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
        });
    });
};

export const requestProductModify = (productId, productInfo) => {
    return storage.get('token').then((token) => {
        let formData = new FormData();
        const productImages = productInfo.productImages.toJS();

        productImages.forEach((file) => {
            formData.append('productPhoto', file);
        });

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
        formData.append('samePrice', productInfo.isCostSame);
        formData.append('proportionShipping', productInfo.proportionShipping);

        console.log(formData);
        return axios.put(`${FUNFUR}/product_web/thumbnail/${productId}`, formData, { headers: {
            Authorization: token
        }
        }).then(res => {
            return res;
        }).catch(err => {
            if(err) throw err;
        });
    });
};

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
    });
};

export const requestGetConsumerList = () => {
    return storage.get('token').then((token) => {
        return axios.get(`${FUNFUR}/consumer_inquiry_web/thumbnail`, { headers: {
            Authorization: token
        }
        }).then(res => {
            return res;
        }).catch(err => {
            if(err) throw err;
        });
    });
};

export const requestConsumerAnswer = (inquiryId, answer) => {
    return storage.get('token').then((token) => {
        return axios({
            method: 'POST',
            url: `${FUNFUR}/consumer_inquiry_web/thumbnail/${inquiryId}`,
            headers: {
                Authorization: token
            },
            data: {
                answer
            }
        }).then(res => {
            return res;
        }).catch(err => {
            if(err) throw err;
        });
    });
};