import {
    BarChartOutlined,
    CoffeeOutlined,
    DollarCircleOutlined,
    InboxOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../image/coffee-cup.svg";

const { Content, Sider } = Layout;
class LayoutSystemAdmin extends Component {
    state = {
        menuAction: [
            {
                title: "Thống kê",
                icon: <BarChartOutlined />,
                link: "/admin",
                type: [0],
            },
            {
                title: "Quản lý người dùng",
                icon: <UserOutlined />,
                link: "/admin/user",
                type: [0],
            },
            {
                title: "Quản lý thực đơn",
                icon: <CoffeeOutlined />,
                link: "/admin/menu",
                type: [0, 1],
            },
            {
                title: "Quản lý kho",
                icon: <InboxOutlined />,
                link: "/admin/store",
                type: [0, 1],
            },
            {
                title: "Quản lý hoá đơn",
                icon: <DollarCircleOutlined />,
                link: "/admin/invoice",
                type: [0],
            },
        ],
    };

    render() {
        const { accountDetail } = this.props.account;
        const { menuAction } = this.state;
        const type =
            accountDetail &&
            accountDetail.staff &&
            accountDetail.staff.account &&
            accountDetail.staff.account.type;
        return (
            <Layout>
                <Sider
                    style={{
                        overflow: "auto",
                        height: "100vh",
                        position: "fixed",
                        left: 0,
                    }}
                >
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} style={{ width: 30 }} alt="logo" />
                            <span>Rovina Coffee</span>
                        </Link>
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={["0"]}>
                        {menuAction.map(
                            (item, index) =>
                                item.type.includes(type) && (
                                    <Menu.Item key={index} icon={item.icon}>
                                        <Link to={item.link}>{item.title}</Link>
                                    </Menu.Item>
                                )
                        )}
                    </Menu>
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: 200 }}>
                    <Content>
                        <div
                            className="site-layout-background"
                            style={{ padding: 24, textAlign: "center", minHeight: 870 }}
                        >
                            {this.props.children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

function mapStateToProp(state) {
    return {
        account: state.account,
    };
}

export default connect(mapStateToProp)(LayoutSystemAdmin);
