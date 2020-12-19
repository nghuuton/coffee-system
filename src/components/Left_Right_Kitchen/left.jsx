import { CaretRightOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteRequirement, getInvoiceProduct } from "../../actions/invoiceAction";

const LeftKitchen = ({ socket }) => {
    const dispatch = useDispatch();
    const [requireMent, setRequireMent] = useState([]);

    const remove = (tableId) => {
        const newRequirement = requireMent.filter((item) => item.table._id !== tableId);
        dispatch(deleteRequirement());
        setRequireMent(newRequirement);
    };

    useEffect(() => {
        if (!socket) return;
        socket.on("JOIN_ROOM_SUCCESS", (data) => {});
        socket.on("NOTIFICATION_SUCCESS", (data) => {
            const requirementOf = requireMent.find(
                (item) => item.table._id === data.table._id
            );
            if (!requirementOf) {
                setRequireMent([...requireMent, data]);
                dispatch(getInvoiceProduct(data.products));
            }
        });
    }, [socket, requireMent]);

    const sendToStaff = (id, item) => {
        socket.emit("SEND_TO_STAFF", { id, item });
        remove(item.table._id);
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
    console.log(requireMent);
    return (
        <div className="sidebar_left">
            <div className="header">
                <p>Yêu cầu</p>
            </div>
            {requireMent.map((item) => (
                <div className="wrapper_kitchen" key={item.table._id}>
                    <div className="donhang">
                        <p onClick={() => dispatch(getInvoiceProduct(item.products))}>
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
