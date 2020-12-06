import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, InputNumber } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    decrementProduct,
    deleteProduct,
    incrementProduct,
} from "../../actions/tabActions";
import removeImg from "../../image/delete.svg";
import noteImg from "../../image/edit.svg";

const TabContent = ({ pane }) => {
    const dispatch = useDispatch();
    const { panes, activeKey } = useSelector((state) => state.tabs);
    const { content: product } = panes.find((item) => item.title === pane.title);

    const incrementQuantity = (p, activeKey) => {
        dispatch(incrementProduct(p, activeKey));
    };

    const decrementQuantity = (p, activeKey) => {
        if (p.quantity > 1) {
            dispatch(decrementProduct(p, activeKey));
        }
    };

    const caculatorTotal = (product) => {
        return product.quantity * product._id.price;
    };

    const formatMoney = (total) => {
        return `${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    };

    const removeProduct = (p, activeKey) => {
        dispatch(deleteProduct(p, activeKey));
    };

    return (
        <>
            {product.map((item) => (
                <div className="tab_content__item" key={item._id._id}>
                    <div className="tab_content__item_btn_delete">
                        <img
                            src={removeImg}
                            alt="remove"
                            onClick={() => removeProduct(item, activeKey)}
                        />
                    </div>
                    <div className="tab__content__item__title">
                        <span>{item._id.name}</span>
                        <span>
                            Ghi chú <img src={noteImg} alt="note" />
                        </span>
                    </div>
                    <div className="tab__content__item__input">
                        <Input
                            className="input_price"
                            value={formatMoney(item._id.price)}
                        />
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
            ))}
        </>
    );
};

export default TabContent;
