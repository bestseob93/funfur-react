import React, { Component } from 'react';
import Time from 'react-time';
import { Link } from 'react-router-dom';

class ProductItem extends Component {
    render() {
        console.log(this.props);
        return (
            <div className="col-md-3 col-xs-6">
                <Link to={`${this.props.match.url}/${this.props.productId}`} className="product-box" style={{display: 'block'}}>
                    <div className="product-box-contents">
                        <div className="product-thumbnail">
                            <img alt="이미지" src={this.props.photoUrl} />
                        </div>
                        <div className="product-desc">
                            <a className="ns-B">{this.props.name}</a>
                            <p><Time value={this.props.updatedTime} format="YYYY.MM.DD" /></p>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}

export default ProductItem;