import React, { useEffect } from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import { Button } from "antd";

const LeftKitchen = ({ socket, requireMent }) => {
    const sendToStaff = (id) => {
        console.log(id);
        socket.emit("SEND_TO_STAFF", id);
    };
    return (
        <div className="sidebar_left">
            <div className="header">
                <p>chế biến</p>
            </div>
            <div className="wrapper">
                <div className="donhang">
                    <p>
                        Mã đơn hàng:
                        <br />
                        Thời gian:
                    </p>
                    <div className="soluong">
                        <Button>
                            <CaretRightOutlined
                                onClick={() => sendToStaff(requireMent.userId)}
                            />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftKitchen;
