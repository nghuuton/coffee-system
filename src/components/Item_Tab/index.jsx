import { Button, Input, InputNumber } from "antd";
import React, { useState } from "react";
import removeImg from "../../image/delete.svg";
import noteImg from "../../image/edit.svg";

import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const ItemTab = () => {
    const [product, setProduct] = useState({
        name: "Cà phê đen",
        quantity: 1,
        price: 13000,
    });
    const incrementQuantity = (p) => {
        setProduct({ ...p, quantity: p.quantity + 1 });
    };

    const decrementQuantity = (p) => {
        if (p.quantity > 1) setProduct({ ...p, quantity: p.quantity - 1 });
    };

    const caculatorTotal = (product) => product.quantity * product.price;

    const formatMoney = (total) => {
        return `${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    };

    return (
        <div className="tab_content__item">
            <div className="tab_content__item_btn_delete">
                <img src={removeImg} alt="remove" />
            </div>
            <div className="tab__content__item__title">
                <span>{product.name}</span>
                <span>
                    Ghi chú <img src={noteImg} alt="note" />
                </span>
            </div>
            <div className="tab__content__item__input">
                <Input className="input_price" value={formatMoney(product.price)} />
                <div className="tab__content__item__input__quantity">
                    <Button onClick={() => incrementQuantity(product)}>
                        <PlusOutlined />
                    </Button>
                    <InputNumber
                        min={1}
                        defaultValue={1}
                        value={product.quantity}
                        className="input_quantity"
                        disabled
                    />
                    <Button onClick={() => decrementQuantity(product)}>
                        <MinusOutlined />
                    </Button>
                </div>
            </div>
            <span>{formatMoney(caculatorTotal(product))} VNĐ</span>
        </div>
    );
};

export default ItemTab;
