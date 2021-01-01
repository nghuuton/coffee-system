import { Button, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const { Option } = Select;

const ButtonGroupBill = ({
    notificationTo,
    pane,
    requirementPay,
    paymentSuccess,
    changeStatusTable,
}) => {
    const { accountDetail } = useSelector((state) => state.account);
    const [active, setActive] = useState(false);
    const [statusTable, setStatusTable] = useState("");
    useEffect(() => {
        if (accountDetail.staff) {
            setActive([0].includes(accountDetail.staff.account.type));
        }
    }, [accountDetail]);

    const handleChange = (value) => {
        setStatusTable(value);
    };

    return (
        <div className="btn_group">
            <Select
                defaultValue={pane.table.status}
                onChange={handleChange}
                style={{ width: 150, marginBottom: 10, marginRight: 10 }}
            >
                <Option value={"Trống"}>Trống</Option>
                <Option value={"Đã có người"}>Đã có người</Option>
            </Select>
            <Button
                style={{ width: 150 }}
                onClick={() => changeStatusTable(pane.table._id, statusTable)}
            >
                Cập nhật
            </Button>
            <div className="tool_bill">
                <Button
                    className="btn_notification"
                    disabled={pane.statusKitchen || pane.content.length === 0}
                    onClick={() => notificationTo(pane)}
                >
                    Thông Báo Bếp
                </Button>
                <Button className="btn_group_bill" disabled={!pane.status && !active}>
                    In Hoá Đơn
                </Button>
            </div>
            <div className="tool_bill">
                <Button className="btn_payment" onClick={() => requirementPay(pane)}>
                    Y/c Thanh Toán
                </Button>
                <Button
                    className="btn_payment"
                    disabled={!pane.status && !active}
                    onClick={() => paymentSuccess(pane)}
                >
                    Thanh Toán
                </Button>
            </div>
        </div>
    );
};

export default ButtonGroupBill;
