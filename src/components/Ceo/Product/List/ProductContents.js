import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Spinner
} from 'components/Common';
import ProductItem from './ProductItem';

class ProductContents extends Component {
    constructor(props) {
        super(props);

        this.renderProductList = this.renderProductList.bind(this);
    }
    async componentDidMount() {
        const { ProductActions } = this.props;
        try {
            await ProductActions.productList();
        } catch (e) {
            if(e) console.log(e);
        }
    }

    renderProductList(datas) {
        const mappedProduct = datas.map((product) => {
                console.log(product.id);
                console.log(product.product_name);
                const date = new Date();
                return <ProductItem
                            key={(product.id + product.product_name + date).toString()}
                            productId={product.id}
                            name={product.product_name}
                            updatedTime={product.updated_at}
                            photoUrl={product.product_photo_path}
                            match={this.props.match}
                        />;
            });
        return mappedProduct;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(this.props.products) !== JSON.stringify(nextProps.products);
    }

    render() {
        const { renderProductList } = this;
        const emptyComponent = undefined;
        return (
            <div className="wrapper wrapper-content animated fadeInRight">
                {/* Spinner */}
                { this.props.status.get('fetching') && <Spinner /> }
                <div className="row">
                    <div className="col-md-3 col-xs-6">
                        <div className="product-box">
                            <Link to="/ceo/upload">
                                <div className="product-box-contents add-product">
                                    <p><i className="fa fa-plus-square fa-2x"></i><span>제품을 추가해주세요.</span></p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    { this.props.valid ? renderProductList(this.props.products) : emptyComponent }
                </div>
            </div>
        );
    }
}

export default ProductContents;