import { Button, notification, Table, Tag } from "antd";
import Column from "antd/lib/table/Column";
import React from "react";

import moment from "moment";
import { formatMoney } from "../../utils/formatNumber";

const TableInvoice = ({ listInvoiceIssues, importStoreInvoice }) => {
    return (
        <Table
            size={"small"}
            dataSource={listInvoiceIssues}
            rowKey="_id"
            pagination={{ defaultPageSize: 3, position: ["bottomCenter"] }}
        >
            <Column
                title="Nhà cung cấp"
                dataIndex="bySupplier"
                key="bySupplier"
                render={(supplier) => <span>{supplier.name}</span>}
            />
            <Column
                title="Hàng hóa / Số lượng"
                dataIndex="comoditys"
                key="comoditys"
                render={(comoditys) =>
                    comoditys.map((item) => (
                        <div key={item._id._id} style={{ margin: 4 }}>
                            <span>
                                {item._id.name} / {item.quantity}
                            </span>
                        </div>
                    ))
                }
            />
            <Column
                title="Người nhập"
                dataIndex="byStaff"
                key="byStaff"
                render={(staff) => <span>{staff.firstname + " " + staff.lastname}</span>}
            />
            <Column
                title="Ngày lập"
                dataIndex="createdAt"
                key="createdAt"
                render={(createdAt) => (
                    <span>{moment(createdAt).format("DD/MM/YYYY")}</span>
                )}
            />
            <Column
                title="Tổng trị giá"
                dataIndex="totalPayment"
                key="totalPayment"
                render={(totalPayment) => (
                    <span>{`${formatMoney(totalPayment)} VNĐ`}</span>
                )}
            />
            <Column
                title="Ngày nhập kho"
                key="updatedAt"
                render={(item) =>
                    item.status ? (
                        <Tag color="green">
                            {moment(item.updatedAt).format("DD/MM/YYYY")}
                        </Tag>
                    ) : (
                        <Tag color="error">Chưa nhập kho</Tag>
                    )
                }
            />
            <Column
                colSpan="2"
                title="Action"
                key="_id"
                render={(item) => (
                    <div className="button_group">
                        <Button
                            type="primary"
                            danger
                            onClick={() =>
                                notification["error"]({
                                    key: `${item._id}`,
                                    message: "Bạn có đồng ý xoá",
                                    btn: (
                                        <Button
                                            type="primary"
                                            size="small"
                                            onClick={() => {
                                                notification.close(item._id);
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
                            onClick={() => importStoreInvoice(item._id)}
                            disabled={item.status}
                        >
                            Nhập kho
                        </Button>
                    </div>
                )}
            />
        </Table>
    );
};

export default TableInvoice;
