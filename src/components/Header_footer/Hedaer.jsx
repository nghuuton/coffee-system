import { Input, Layout, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { UngroupOutlined, CoffeeOutlined } from "@ant-design/icons";

const { Header } = Layout;

const HeaderSystem = () => {
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
        </Header>
    );
};

export default HeaderSystem;
