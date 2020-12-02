import React from "react";

import tableImg from "../../image/simple-table.svg";

const TableRadio = ({ name, onClick }) => {
    const status = true && "#7ee8fa";
    return (
        <div className="table_checkbox_group">
            <input
                type="checkbox"
                name={name}
                id={name}
                onClick={onClick}
                className="table_checkbox_group__checkbox"
            />
            <div className="content">
                <label htmlFor={name}>
                    <div
                        className="table_checkbox_group__status"
                        style={{ backgroundColor: status }}
                    ></div>
                    <img src={tableImg} alt="Table" style={{ width: 100 }} />
                    <span>{name}</span>
                </label>
            </div>
        </div>
    );
};

export default TableRadio;
