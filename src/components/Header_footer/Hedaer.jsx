import { Input, Layout, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { UngroupOutlined, CoffeeOutlined } from "@ant-design/icons";

const { Header } = Layout;

const styleInput = {
    width: "700px",
};

const HeaderSystem = () => {
    return (
        <Header>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1">
                    <Link to="/">
                        <UngroupOutlined />
                        Phòng Bàn
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/menu">
                        <CoffeeOutlined />
                        Thực Đơn
                    </Link>
                </Menu.Item>
                <Menu.Item style={styleInput} key="3">
                    <Input
                        size="middle"
                        placeholder="Tìm kiếm sản phẩm"
                        onChange={(e) => console.log(e.target.value)}
                    />
                </Menu.Item>
            </Menu>
        </Header>
    );
};

export default HeaderSystem;
