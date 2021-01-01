import { Button, notification, Table, Tag } from "antd";
import Column from "antd/lib/table/Column";
import moment from "moment";
import React from "react";
import { formatMoney } from "../../utils/formatNumber";
const TableInvoice = ({ listInvoice, deleteInvoice }) => {
    console.log(listInvoice);
    return (
        <Table
            size={"small"}
            dataSource={listInvoice}
            rowKey="_id"
            pagination={{ defaultPageSize: 8, position: ["bottomCenter"] }}
        >
            <Column title="Mã hóa đơn" dataIndex="_id" key="_id" />
            <Column
                title="Hoá đơn bàn"
                dataIndex="ownerTable"
                key="ownerTable"
                render={(table) => <span>{table.name}</span>}
            />
            <Column
                title="Chi tiết hoá đơn"
                dataIndex="product"
                key="product"
                render={(product) =>
                    product.map((item, index) => (
                        <p key={index}>
                            {item._id.name} / {item.quantity}
                        </p>
                    ))
                }
            />
            <Column
                title="Người lập"
                dataIndex="createBy"
                key="createBy"
                render={(createBy) => (
                    <span>{`${createBy.firstname}  ${createBy.lastname}`}</span>
                )}
            />
            <Column
                title="Ngày tạo"
                dataIndex="createdAt"
                key="createdAt"
                render={(createdAt) => (
                    <span>{moment(createdAt).format("DD/MM/YYYY")}</span>
                )}
            />
            <Column
                title="Tổng tiền"
                dataIndex="detailInvoice"
                key="detailInvoice"
                render={(detailInvoice) => (
                    <span>{`${formatMoney(detailInvoice.totalPayment)} VNĐ`}</span>
                )}
            />

            <Column
                title="Trạng thái"
                dataIndex="status"
                key="status"
                render={(status) =>
                    status ? (
                        <Tag color="green">Đã thanh toán</Tag>
                    ) : (
                        <Tag color="red">Chưa thanh toán</Tag>
                    )
                }
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
                                                deleteInvoice(_id);
                                                notification.destroy(_id);
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
                    </div>
                )}
            />
        </Table>
    );
};

export default TableInvoice;
