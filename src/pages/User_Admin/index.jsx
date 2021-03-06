import { UserAddOutlined } from "@ant-design/icons";
import { Button, Divider, message, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteUser,
    getListUser,
    updateTypeUser,
    updateStatusUser,
} from "../../actions/staffAction";
import FormAddUser from "../../components/Form_Add_User";
import TableUser from "../../components/Table_User";
const { Title } = Typography;

const AdminUser = () => {
    const dispatch = useDispatch();
    const { listStaff } = useSelector((state) => state.staff);
    const { accountDetail } = useSelector((state) => state.account);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        dispatch(getListUser());
    }, [dispatch]);

    const handleCancel = () => {
        setVisible(false);
    };

    // TODO Xóa người dùng

    const removeUser = (id) => {
        dispatch(deleteUser(id)).then((res) => {
            if (res.payload.status === 1)
                message.error({
                    content: "Không xóa được người dùng vì có hóa đơn do người dùng lập",
                    style: {
                        position: "relative",
                        top: 10,
                        right: "-70vh",
                    },
                });
            if (res.payload.status === 2) {
                message.success({
                    content: "Xóa thành công",
                    style: {
                        position: "relative",
                        top: 10,
                        right: "-76vh",
                    },
                });
            }
        });
    };

    // TODO Cập nhật quyền

    const updateType = (id, data) => {
        message.destroy();
        dispatch(updateTypeUser({ id: id, data }));
        message.success({
            content: "Cập nhật thành công",
            style: {
                position: "relative",
                top: 10,
                right: "-76vh",
            },
        });
    };

    // TODO Kích hoạt tài khoản

    const updateStatus = (id) => {
        message.destroy();
        dispatch(updateStatusUser(id));
        message.success({
            content: "Kích hoạt tài khoản thành công",
            style: {
                position: "relative",
                top: 10,
                right: "-76vh",
            },
        });
    };

    const newListStaff = listStaff.filter((item) => item._id !== accountDetail.staff._id);

    return (
        <div>
            <div>
                <Title level={3} style={{ float: "left" }}>
                    Quản lý người dùng
                </Title>
                <Divider />
                <Modal
                    title="Thông tin người dùng"
                    visible={visible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <FormAddUser setVisible={setVisible} />
                </Modal>
                <div className="btn_filter_group" style={{ marginBottom: 20 }}>
                    <Button
                        type="primary"
                        size="middle"
                        icon={<UserAddOutlined />}
                        onClick={() => setVisible(true)}
                    >
                        Thêm người dùng
                    </Button>
                </div>
                <TableUser
                    listStaff={newListStaff}
                    updateType={updateType}
                    removeUser={removeUser}
                    updateStatus={updateStatus}
                />
            </div>
        </div>
    );
};

export default AdminUser;
