import { CaretRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { getInvoiceProduct } from "../../actions/invoiceAction";

const LeftKitchen = ({ socket, requireMent, sendToStaff }) => {
    const dispatch = useDispatch();

    const now = new Date();
    const result = `${now.getHours()}:${now.getMinutes()}`;
    return (
        <div className="sidebar_left">
            <div className="header">
                <p>Yêu cầu</p>
            </div>
            {requireMent.map((item) => (
                <div className="wrapper_kitchen" key={item.table._id}>
                    <div className="donhang">
                        <p onClick={() => dispatch(getInvoiceProduct(item))}>
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
