import { message, Select } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    decrementProduct,
    deleteProduct,
    incrementProduct,
} from "../../actions/tabActions";
import ButtonGroupBill from "../Button_Group_Bill";
import Payment from "../Payment";
import ProductInTabContent from "../Product_In_TabContent";

const { Option } = Select;

const TabContent = ({ pane, socket }) => {
    const dispatch = useDispatch();
    const { listTable } = useSelector((state) => state.tables);
    const { panes, activeKey } = useSelector((state) => state.tabs);
    const { content: product } = panes.find((item) => item.title === pane.title);
    const { accountDetail } = useSelector((state) => state.account);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [percent, setPercent] = useState("");
    const [payment, setPayment] = useState("");
    const [tables, setTables] = useState([]);

    const newListTable =
        listTable &&
        listTable.filter((item) => item._id !== activeKey && item.status === "Trống");

    const incrementQuantity = (p, activeKey) => {
        dispatch(incrementProduct(p, activeKey));
    };

    const decrementQuantity = (p, activeKey) => {
        if (p.quantity > 1) {
            dispatch(decrementProduct(p, activeKey));
        }
    };

    const caculatorTotal = (product) => {
        return product.quantity * product.price;
    };

    const removeProduct = (p, activeKey) => {
        dispatch(deleteProduct(p, activeKey));
    };

    const total = (arrayProduct) => {
        if (arrayProduct.length > 0) {
            return arrayProduct
                .map((item) => item.quantity * item.price)
                .reduce((a, b) => a + b);
        }
        return 0;
    };

    const caculator = () => {
        const newPayment = total(product) - (percent / 100) * total(product);
        return newPayment;
    };

    const moneyPay = () => {
        const result = payment * 1000 - caculator();
        return result;
    };

    // * Emit to Bartender
    const notificationTo = (pane) => {
        const userId = accountDetail.staff.account._id;
        const createBy = accountDetail.staff._id;
        const table = pane.table;
        const products = pane.content;
        const data = {
            userId,
            products,
            table,
            createBy,
            totalPayment: total(pane.content),
            intoMoney: caculator(),
        };
        socket.emit("NOTIFICATION", data);
        message.success({
            content: "Thông báo thành công",
            style: {
                position: "relative",
                top: 10,
                right: "-80vh",
            },
        });
    };

    // * Modal
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // * Modal handleChange Option

    function handleChange(value) {
        setTables(value);
    }

    return (
        <div className="tabs_bill">
            {product.map((item) => (
                <ProductInTabContent
                    item={item}
                    key={item._id}
                    activeKey={activeKey}
                    incrementQuantity={incrementQuantity}
                    decrementQuantity={decrementQuantity}
                    caculatorTotal={caculatorTotal}
                    removeProduct={removeProduct}
                />
            ))}
            <Modal
                title="Ghép bàn"
                visible={isModalVisible}
                onOk={() => handleOk()}
                onCancel={handleCancel}
            >
                <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Chọn bàn cần ghép"
                    onChange={handleChange}
                    value={tables}
                    optionLabelProp="label"
                >
                    {newListTable &&
                        newListTable.map((item) => (
                            <Option value={item._id} label={item.name} key={item._id}>
                                <div className="demo-option-label-item">
                                    <span role="img">{item.name}</span>
                                </div>
                            </Option>
                        ))}
                </Select>
            </Modal>
            <ButtonGroupBill
                pane={pane}
                notificationTo={notificationTo}
                showModal={showModal}
            />
            <Payment
                pane={pane}
                product={product}
                total={total}
                caculator={caculator}
                moneyPay={moneyPay}
                percent={percent}
                setPercent={setPercent}
                setPayment={setPayment}
            />
        </div>
    );
};

export default TabContent;
