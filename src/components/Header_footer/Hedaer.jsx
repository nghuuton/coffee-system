import { Button, Dropdown, Input, Layout, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import {
    UngroupOutlined,
    CoffeeOutlined,
    UserOutlined,
    DownOutlined,
    ExportOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { accountLogout } from "../../actions/accountAction";

const { Header } = Layout;

const HeaderSystem = (props) => {
    const dispatch = useDispatch();
    const { accountDetail } = useSelector((state) => state.account);

    function handleButtonClick(e) {}

    function handleMenuClick(e) {
        if (e.key === "3") {
            localStorage.setItem("token", "");
            dispatch(accountLogout());
            props.history.push("/login");
        }
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1" icon={<InfoCircleOutlined />}>
                Thông tin
            </Menu.Item>
            <Menu.Item key="3" icon={<ExportOutlined />}>
                Đăng xuất
            </Menu.Item>
        </Menu>
    );

    return (
        <Header className="header">
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1">
                    <Link to="/coffee">
                        <UngroupOutlined />
                        Bàn
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/coffee/menu">
                        <CoffeeOutlined />
                        Thực Đơn
                    </Link>
                </Menu.Item>
            </Menu>
            <Input
                placeholder="Tìm kiếm sản phẩm"
                onChange={(e) => console.log(e.target.value)}
                className="input_search"
            />
            <Dropdown overlay={menu} className="account_dropdown">
                <Button>
                    <UserOutlined /> {accountDetail && accountDetail.lastname}
                    <DownOutlined />
                </Button>
            </Dropdown>
        </Header>
    );
};

export default withRouter(HeaderSystem);
