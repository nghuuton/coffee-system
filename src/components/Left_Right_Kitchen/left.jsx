import { CaretRightOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { getInvoiceProduct } from "../../actions/invoiceAction";

const LeftKitchen = ({ socket, requireMent }) => {
    const dispatch = useDispatch();
    const sendToStaff = (id, item) => {
        socket.emit("SEND_TO_STAFF", { id, item });
        console.log(item);
        message.success({
            content: `Thông báo cho nhân viên thành công`,
            style: {
                position: "relative",
                top: 10,
                right: "-80vh",
            },
        });
    };
    const now = new Date();
    const result = `${now.getHours()}:${now.getMinutes()}`;
    return (
        <div className="sidebar_left">
            <div className="header">
                <p>Yêu cầu</p>
            </div>
            {requireMent.map((item) => (
                <div
                    className="wrapper_kitchen"
                    key={item.table._id}
                    onClick={() => dispatch(getInvoiceProduct(item.products))}
                >
                    <div className="donhang">
                        <p>
                            Yêu cầu của bàn: {item.table.name}
                            <br />
                            Thời gian: {result}
                        </p>
                        <div className="soluong">
                            <Button onClick={() => sendToStaff(item.userId, item)}>
                                <CaretRightOutlined />
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LeftKitchen;
