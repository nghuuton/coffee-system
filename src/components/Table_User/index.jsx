import { Button, notification, Table, Tag } from "antd";
import Column from "antd/lib/table/Column";
import React, { useState } from "react";
import moment from "moment";

import { Select } from "antd";

const { Option } = Select;

const TableUser = ({ listStaff, updateType, removeUser }) => {
    const [type, setType] = useState("");

    const handleChange = (value) => {
        setType(value);
    };

    return (
        <Table
            size={"small"}
            dataSource={listStaff}
            rowKey="_id"
            pagination={{ position: ["bottomRight"] }}
        >
            <Column title="Họ tên" dataIndex="firstname" key="firstname" />
            <Column title="Tên" dataIndex="lastname" key="lastname" />
            <Column
                title="Giới tính"
                dataIndex="sex"
                key="sex"
                render={(sex) =>
                    sex === true ? <Tag color="blue">Nam</Tag> : <Tag color="red">Nữ</Tag>
                }
            />
            <Column
                title="Ngày sinh"
                dataIndex="birthday"
                key="birthday"
                render={(birthday) => (
                    <span>{moment(birthday).format("DD/MM/YYYY")}</span>
                )}
            />
            <Column
                title="Email"
                dataIndex="account"
                key="email"
                render={(account) => <span>{account.email}</span>}
            />
            <Column
                title="Chức vụ"
                dataIndex="account"
                key="email"
                render={(account) => (
                    <Select
                        defaultValue={account.type}
                        onChange={handleChange}
                        className="type"
                    >
                        <Option value={1}>Nhân viên phục vụ</Option>
                        <Option value={2}>Nhân viên quầy</Option>
                        <Option value={3}>Nhân viên thu ngân</Option>
                    </Select>
                )}
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
                                    message: "Bạn có đồng ý xoá loại này",
                                    btn: (
                                        <Button
                                            type="primary"
                                            size="small"
                                            onClick={() => {
                                                removeUser(_id);
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
                        <Button type="primary" onClick={() => updateType(_id, type)}>
                            Cập nhật
                        </Button>
                    </div>
                )}
            />
        </Table>
    );
};

export default TableUser;
