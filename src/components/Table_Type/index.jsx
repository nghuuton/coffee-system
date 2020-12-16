import { Button, notification, Table } from "antd";
import Column from "antd/lib/table/Column";
import React from "react";

const TableType = ({ listType, showModal, deleteType }) => {
    return (
        <Table
            size={"small"}
            className="table_type"
            dataSource={listType}
            rowKey="_id"
            pagination={{ defaultPageSize: 3, position: ["bottomRight"] }}
        >
            <Column title="Tên loại" dataIndex="name" key="name" />
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
                                    message: "Bạn có đồng ý xoá loại này",
                                    btn: (
                                        <Button
                                            type="primary"
                                            size="small"
                                            onClick={() => {
                                                deleteType(_id);
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
                            onClick={() => showModal("Cập nhật loại", _id)}
                        >
                            Cập nhật
                        </Button>
                    </div>
                )}
            />
        </Table>
    );
};

export default TableType;
