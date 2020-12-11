import { Button } from "antd";
import React from "react";

const ButtonGroupBill = ({ notificationTo, pane, showModal }) => {
    return (
        <div className="btn_group">
            <div className="tool_bill">
                <Button className="btn_notification" onClick={() => notificationTo(pane)}>
                    Thông Báo Bếp
                </Button>
                <Button className="btn_group_bill" onClick={showModal}>
                    Ghép Hoá Đơn
                </Button>
            </div>
            <div className="tool_bill">
                <Button className="btn_payment">Yêu Cầu Thanh Toán</Button>
            </div>
        </div>
    );
};

export default ButtonGroupBill;
