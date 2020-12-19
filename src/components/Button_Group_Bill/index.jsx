import { Button } from "antd";
import React from "react";

const ButtonGroupBill = ({
    notificationTo,
    pane,
    showModal,
    requirementPay,
    paymentSuccess,
}) => {
    return (
        <div className="btn_group">
            <div className="tool_bill">
                <Button
                    className="btn_notification"
                    disabled={pane.statusKitchen || pane.content.length === 0}
                    onClick={() => notificationTo(pane)}
                >
                    Thông Báo Bếp
                </Button>
                <Button className="btn_group_bill" onClick={showModal}>
                    Ghép Hoá Đơn
                </Button>
            </div>
            <div className="tool_bill">
                <Button className="btn_payment" onClick={() => requirementPay(pane)}>
                    Yêu Cầu Thanh Toán
                </Button>
                <Button
                    className="btn_payment"
                    disabled={!pane.status}
                    onClick={() => paymentSuccess(pane)}
                >
                    Thanh Toán
                </Button>
            </div>
        </div>
    );
};

export default ButtonGroupBill;
