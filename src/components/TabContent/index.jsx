import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import {
    decrementProduct,
    deleteProduct,
    incrementProduct,
} from "../../actions/tabActions";
import ButtonGroupBill from "../Button_Group_Bill";
import Payment from "../Payment";
import ProductInTabContent from "../Product_In_TabContent";

const TabContent = ({ pane }) => {
    const dispatch = useDispatch();
    const { panes, activeKey } = useSelector((state) => state.tabs);
    const { content: product } = panes.find((item) => item.title === pane.title);
    const { accountDetail } = useSelector((state) => state.account);

    const [socket, setSocket] = useState(null);
    const [percent, setPercent] = useState("");
    const [payment, setPayment] = useState("");

    // * Setup socket
    const setupSocket = () => {
        const token = localStorage.getItem("token");
        if (token && !socket) {
            const newSocket = io("http://localhost:3001", {
                query: {
                    token: `${token}`,
                },
            });

            newSocket.on("connect", () => {
                console.log("Socket Ready");
            });
            newSocket.on("disconnect", () => {
                setSocket(null);
                setTimeout(setupSocket, 3000);
            });
            setSocket(newSocket);
        }
    };

    useEffect(() => {
        setupSocket();
        return () => {
            setSocket(null);
        };
    }, []);

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
        return arrayProduct
            .map((item) => item.quantity * item.price)
            .reduce((a, b) => a + b);
    };

    const caculator = () => {
        const newPayment = total(product) - (percent / 100) * total(product);
        return newPayment;
    };

    const moneyPay = () => {
        const result = payment * 1000 - caculator();
        return result;
    };

    const notificationTo = (pane) => {
        const id = socket.id;
        const createBy = accountDetail._id;
        const tableId = pane.table._id;
        const products = pane.content;
        const data = {
            id,
            products,
            tableId,
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

    return (
        <div>
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
            <ButtonGroupBill pane={pane} notificationTo={notificationTo} />
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
