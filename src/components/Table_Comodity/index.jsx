import { Button, notification, Table } from "antd";
import Column from "antd/lib/table/Column";
import React from "react";
import { formatMoney } from "../../utils/formatNumber";

const TableComodity = ({ listComodity, showModal, deleteComodity }) => {
    return (
        <Table
            size={"small"}
            className="table_type"
            dataSource={listComodity}
            rowKey="_id"
            pagination={{ defaultPageSize: 4, position: ["bottomCenter"] }}
        >
            <Column title="Tên hàng hoá" dataIndex="name" key="name" />
            <Column
                title="Đơn giá"
                dataIndex="price"
                key="price"
                render={(price) => <span>{`${formatMoney(price)} VNĐ`}</span>}
            />
            <Column
                title="Số lượng"
                key="quantity"
                render={(item) => {
                    return item && item.unit && item.unit.unit !== null ? (
                        <span>{Math.floor(item.unit.unit * item.quantity)}</span>
                    ) : (
                        <span>{item.quantity}</span>
                    );
                }}
            />
            <Column
                title="Đơn vị quy ước"
                dataIndex="unit"
                key="unit"
                render={(item) => {
                    return item && item.unit !== null ? (
                        <span>{item.unitMath}</span>
                    ) : (
                        <span>Chưa có</span>
                    );
                }}
            />
            <Column
                title="Nhà cung cấp"
                dataIndex="bySupplier"
                key="unit"
                render={(item) => <span>{item.name}</span>}
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
                                                deleteComodity(_id);
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
                            onClick={() => showModal("Cập nhật hàng hoá", _id)}
                        >
                            Cập nhật
                        </Button>
                    </div>
                )}
            />
        </Table>
    );
};

export default TableComodity;
