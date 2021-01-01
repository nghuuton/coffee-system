import { CheckOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, InputNumber } from "antd";
import Search from "antd/lib/input/Search";
import React from "react";
import checkImg from "../../image/check.svg";
import removeImg from "../../image/delete.svg";
import noteImg from "../../image/edit.svg";
import { formatMoney } from "../../utils/formatNumber";
//10-10-2020
//28-12/2020
const ProductInTabContent = ({
    item,
    activeKey,
    removeProduct,
    incrementQuantity,
    decrementQuantity,
    caculatorTotal,
    handleNote,
    showNoteProduct,
    handleChangeNote,
}) => {
    return (
        <div className="tab_content__item" key={item._id}>
            {!item.status && (
                <div
                    className="tab_content__item_btn_delete"
                    onClick={() => removeProduct(item, activeKey)}
                >
                    <img src={removeImg} alt="remove" />
                </div>
            )}
            {item.status && (
                <div
                    className="tab_content__item_btn_delete"
                    style={{ border: "none" }}
                />
            )}
            <div className="tab__content__item__title">
                <span>{item.name}</span>
                {!item.noteStatus && (
                    <span onClick={() => showNoteProduct(item)}>
                        Ghi chú <img src={noteImg} alt="note" />
                    </span>
                )}
                {item.noteStatus && (
                    <div className="tab__content__item__title__note__input">
                        <Search
                            enterButton={<CheckOutlined />}
                            onSearch={(event) => handleNote(event, item)}
                            onChange={(event) => handleChangeNote(event, item)}
                            value={item.note}
                            size="small"
                            autoFocus
                        />
                    </div>
                )}
            </div>
            {item.status && <img src={checkImg} alt="complete" style={{ width: 25 }} />}
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
