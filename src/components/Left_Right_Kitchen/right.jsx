import React from "react";
import { useSelector } from "react-redux";
import ProductRequirement from "../Product_In_Requirement";

const RightKitchen = () => {
    const { detailsInvoice } = useSelector((state) => state.invoice);

    return (
        <div className="sidebar_right">
            <div className="header">
                <p>Thông tin yêu cầu</p>
            </div>
            <div className="no-product">
                {detailsInvoice.map((item) => (
                    <ProductRequirement item={item} key={item._id} />
                ))}
            </div>
        </div>
    );
};

export default RightKitchen;
