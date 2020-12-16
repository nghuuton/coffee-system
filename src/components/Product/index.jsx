import React from "react";
import { Card, Image } from "antd";
import { formatMoney, formatToK } from "../../utils/formatNumber";

const Product = ({ addNewProduct, product }) => {
    return (
        <div className="wrapper_product">
            <Card
                onClick={() => addNewProduct(product)}
                hoverable
                className="product"
                cover={
                    <div className="procuct__image">
                        <Image
                            src={`http://${product.image}`}
                            width={150}
                            height={160}
                            preview={false}
                        />
                        <div className="product__title">{product.name}</div>
                        <span className="product__price">
                            {formatToK(formatMoney(product.price))}
                        </span>
                    </div>
                }
            ></Card>
        </div>
    );
};

export default Product;
