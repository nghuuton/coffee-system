import { message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    decrementProduct,
    deleteProduct,
    enableStatusNoteProduct,
    incrementProduct,
    noteProduct,
    updateStatusKitchenTab,
} from "../../actions/tabActions";
import { updateStatusTable } from "../../actions/tableActions";
import { caculatorTotal, total } from "../../utils/formatNumber";
import ButtonGroupBill from "../Button_Group_Bill";
import Payment from "../Payment";
import ProductInTabContent from "../Product_In_TabContent";

const TabContent = ({ pane, socket, remove, changeStatusTable }) => {
    const dispatch = useDispatch();
    const { panes, activeKey } = useSelector((state) => state.tabs);
    const { content: product } = panes.find((item) => item.title === pane.title);
    const { accountDetail } = useSelector((state) => state.account);

    const [payment, setPayment] = useState("");

    const incrementQuantity = (p, activeKey) => {
        dispatch(incrementProduct(p, activeKey));
    };

    const decrementQuantity = (p, activeKey) => {
        if (p.quantity > 1) {
            dispatch(decrementProduct(p, activeKey));
        }
    };

    const removeProduct = (p, activeKey) => {
        dispatch(deleteProduct(p, activeKey));
    };

    const caculator = () => {
        const totalProduct = total(product);
        return totalProduct;
    };

    const moneyPay = () => {
        const intoMoney = caculator();
        const result = payment * 1000 - intoMoney;
        return result;
    };

    // TODO Thông báo tới bếp
    const notificationTo = (pane) => {
        message.destroy();
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
        dispatch(updateStatusKitchenTab(pane.table._id));
    };

    // TODO Thông báo tới thu ngân

    const requirementPay = (pane) => {
        message.destroy();
        const userId = accountDetail.staff.account._id;
        socket.emit("NOTIFICATION_THU_NGAN", {
            pane,
            userId,
            moneyPay: moneyPay(),
            payment: payment,
            intoMoney: caculator(),
        });
        message.success({
            content: "Thông báo thu ngân thành công",
            style: {
                position: "relative",
                top: 10,
                right: "-80vh",
            },
        });
    };

    // TODO Thu ngân thanh toán

    const paymentSuccess = (pane) => {
        if (pane.content.length === 0) {
            return message.error({
                content: "Không có gì để thanh toán",
                style: {
                    position: "relative",
                    top: 10,
                    right: "-80vh",
                },
            });
        }
        remove(pane.table._id);
        dispatch(updateStatusTable(pane.table._id));
        socket.emit("PAYMENT_SUCCESS", { pane, userId: pane.userId });
    };

    // TODO Note Product
    const handleNote = (value, item) => {
        dispatch(
            noteProduct({ ...item, note: value, noteStatus: false }, pane.table._id)
        );
    };

    const handleChangeNote = (event, item) => {
        dispatch(
            noteProduct(
                { ...item, note: event.currentTarget.value, noteStatus: true },
                pane.table._id
            )
        );
    };

    const showNoteProduct = (item) => {
        dispatch(enableStatusNoteProduct({ ...item, noteStatus: true }, pane.table._id));
    };

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
                    handleNote={handleNote}
                    showNoteProduct={showNoteProduct}
                    handleChangeNote={handleChangeNote}
                />
            ))}
            <ButtonGroupBill
                pane={pane}
                notificationTo={notificationTo}
                requirementPay={requirementPay}
                paymentSuccess={paymentSuccess}
                changeStatusTable={changeStatusTable}
            />
            <Payment
                pane={pane}
                product={product}
                total={total}
                payment={payment}
                caculator={caculator}
                moneyPay={moneyPay}
                setPayment={setPayment}
            />
        </div>
    );
};

export default TabContent;
