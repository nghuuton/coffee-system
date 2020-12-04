import React from "react";

import tableImg from "../../image/simple-table.svg";

const TableRadio = ({ onClick, table }) => {
    const statusColor = {
        empty: "#46B1C9",
        notEmpty: "#DB162F",
    };
    return (
        <div className="table_checkbox_group">
            <input
                type="checkbox"
                name={table.name}
                id={table._id}
                onClick={onClick}
                className="table_checkbox_group__checkbox"
            />
            <div className="content">
                <label htmlFor={table._id}>
                    <div
                        className="table_checkbox_group__status"
                        style={{
                            backgroundColor:
                                table.status === "Đã có người"
                                    ? statusColor.notEmpty
                                    : statusColor.empty,
                        }}
                    ></div>
                    <img src={tableImg} alt="Table" style={{ width: 100 }} />
                    <span>{table.name}</span>
                </label>
            </div>
        </div>
    );
};

export default TableRadio;
