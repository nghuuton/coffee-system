import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, InputNumber } from "antd";
import React from "react";
import { formatMoney } from "../../utils/formatNumber";

import removeImg from "../../image/delete.svg";
import noteImg from "../../image/edit.svg";
import { useSelector } from "react-redux";

const ProductInTabContent = ({
    item,
    activeKey,
    removeProduct,
    incrementQuantity,
    decrementQuantity,
    caculatorTotal,
}) => {
    return (
        <div className="tab_content__item" key={item._id}>
            <div className="tab_content__item_btn_delete">
                <img
                    src={removeImg}
                    alt="remove"
                    onClick={() => removeProduct(item, activeKey)}
                />
            </div>
            <div className="tab__content__item__title">
                <span>{item.name}</span>
                <span>
                    Ghi chú <img src={noteImg} alt="note" />
                </span>
            </div>
            <div className="tab__content__item__input">
                <Input className="input_price" value={formatMoney(item.price)} />
                <div className="tab__content__item__input__quantity">
                    <Button onClick={() => incrementQuantity(item, activeKey)}>
                        <PlusOutlined />
                    </Button>
                    <InputNumber
                        min={1}
                        defaultValue={1}
                        value={item.quantity}
                        className="input_quantity"
                        disabled
                    />
                    <Button onClick={() => decrementQuantity(item, activeKey)}>
                        <MinusOutlined />
                    </Button>
                </div>
            </div>
            <span>{formatMoney(caculatorTotal(item))} VNĐ</span>
        </div>
    );
};

export default ProductInTabContent;
