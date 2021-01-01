import React from "react";
import { useSelector } from "react-redux";
import ProductRequirement from "../Product_In_Requirement";

const RightKitchen = ({ handleReport }) => {
    const { detailsInvoice } = useSelector((state) => state.invoice);
    return (
        <div className="sidebar_right">
            <div className="header">
                <p>
                    Thông tin yêu cầu:{" "}
                    {detailsInvoice && detailsInvoice.table && detailsInvoice.table.name}
                </p>
            </div>
            <div className="no-product">
                {detailsInvoice &&
                    detailsInvoice.products &&
                    detailsInvoice.products.map((item) => (
                        <ProductRequirement
                            table={detailsInvoice && detailsInvoice.table.name}
                            userId={detailsInvoice && detailsInvoice.userId}
                            item={item}
                            key={item._id}
                            handleReport={handleReport}
                        />
                    ))}
            </div>
        </div>
    );
};

export default RightKitchen;
