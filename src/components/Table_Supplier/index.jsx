import { Button, notification, Table } from "antd";
import Column from "antd/lib/table/Column";
import React from "react";

const TableSupplier = ({ listSupplier, showModal, removeSup }) => {
    return (
        <Table
            size={"small"}
            className="table_type"
            dataSource={listSupplier}
            rowKey="_id"
            pagination={{ defaultPageSize: 2, position: ["bottomCenter"] }}
        >
            <Column title="Nhà cung cấp" dataIndex="name" key="name" />
            <Column title="Địa chỉ" dataIndex="address" key="address" />
            <Column
                title="SĐT"
                dataIndex="phone"
                key="phone"
                render={(phone) => phone && <span>+84 {phone}</span>}
            />
            <Column
                colSpan="2"
                title="Action"
                dataIndex="_id"
                key="_id"
                render={(_id) => (
                    <div className="button_group">
                        <Button
                            type="primary"
                            danger
                            onClick={() =>
                                notification["error"]({
                                    key: `${_id}`,
                                    message: "Bạn có đồng ý xoá",
                                    btn: (
                                        <Button
                                            type="primary"
                                            size="small"
                                            onClick={() => {
                                                removeSup(_id);
                                                notification.close(_id);
                                            }}
                                        >
                                            Xác nhận
                                        </Button>
                                    ),
                                })
                            }
                        >
                            Xoá
                        </Button>
                        <Button
                            type="primary"
                            onClick={() => {
                                showModal("Cập nhật nhà cung cấp", _id);
                            }}
                        >
                            Cập nhật
                        </Button>
                    </div>
                )}
            />
        </Table>
    );
};

export default TableSupplier;
