import { Divider, Input } from "antd";
import React, { useState } from "react";

import { formatMoney } from "../../utils/formatNumber";

const Payment = ({
    pane,
    product,
    total,
    caculator,
    moneyPay,
    percent,
    setPercent,
    setPayment,
}) => {
    return (
        <div className="payment_group">
            <p className="payment_money">
                Tổng tiền <span>{`${formatMoney(total(product))} VNĐ`}</span>
            </p>
            <div className="input_group">
                <label htmlFor="giamgia">Giảm giá(%)</label>
                <Input
                    id="giamgia"
                    name="price_percent"
                    value={percent}
                    onChange={(e) => setPercent(e.currentTarget.value)}
                />
            </div>
            <p className="payment_money">
                Khách cần trả
                <span className="payment_money_user">{`${formatMoney(
                    caculator()
                )} VNĐ`}</span>
            </p>
            <div className="input_group">
                <label htmlFor="money">Tiền khách đưa </label>
                <Input
                    id="money"
                    name="money"
                    onChange={(e) => setPayment(e.currentTarget.value)}
                />
                <span>(Mệnh giá 1 = 1000 VNĐ)</span>
            </div>
            <Divider />
            <p className="payment_money">
                Tiền khách phải trả
                <span>{moneyPay() < 0 ? "0 VNĐ" : `${formatMoney(moneyPay())} VNĐ`}</span>
            </p>
        </div>
    );
};

export default Payment;
