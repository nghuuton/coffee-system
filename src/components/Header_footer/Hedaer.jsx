import {
    CoffeeOutlined,
    DollarCircleOutlined,
    DownOutlined,
    ExportOutlined,
    InboxOutlined,
    InfoCircleOutlined,
    LineChartOutlined,
    UngroupOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { accountLogout } from "../../actions/accountAction";

const { Header } = Layout;

const HeaderSystem = (props) => {
    const dispatch = useDispatch();
    const { accountDetail } = useSelector((state) => state.account);
    const [defaultSelectedKeys, setDefaultSelectedKeys] = useState(["1"]);
    async function logOut(e) {
        localStorage.removeItem("token");
        await dispatch(accountLogout());
        props.history.push("/login");
    }

    const handleClick = (e) => {
        setDefaultSelectedKeys([e.key]);
    };

    useEffect(() => {
        document.addEventListener("keydown", (event) => {
            if (event.keyCode === 112) {
                props.history.push("/coffee");
                setDefaultSelectedKeys(["1"]);
            }
            if (event.keyCode === 113) {
                props.history.push("/coffee/menu");
                setDefaultSelectedKeys(["2"]);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const menuAction = [
        { title: "Thông tin", icon: <InfoCircleOutlined />, action: "", type: "public" },
        {
            title: "Thống kê",
            icon: <LineChartOutlined />,
            action: () => props.history.push("/admin"),
            type: [0],
        },
        {
            title: "Quản lý kho",
            icon: <InboxOutlined />,
            action: () => props.history.push("/admin/store"),
            type: [0, 1],
        },
        {
            title: "Quản lý thực đơn",
            icon: <CoffeeOutlined />,
            action: () => props.history.push("/admin/menu"),
            type: [0, 1],
        },
        {
            title: "Quản lý bếp",
            icon: <CoffeeOutlined />,
            action: () => props.history.push("/kitchen"),
            type: [2],
        },
        {
            title: "Quản lý hóa đơn",
            icon: <DollarCircleOutlined />,
            action: () => props.history.push("/admin/invoice"),
            type: [0, 1],
        },
        { title: "Đăng xuất", icon: <ExportOutlined />, action: logOut, type: "public" },
    ];

    const menu = (
        <Menu>
            {menuAction.map((item, index) =>
                accountDetail &&
                accountDetail.staff &&
                item.type.includes(accountDetail.staff.account.type) === true ? (
                    <Menu.Item key={index} icon={item.icon} onClick={item.action}>
                        {item.title}
                    </Menu.Item>
                ) : (
                    item.type === "public" && (
                        <Menu.Item key={index} icon={item.icon} onClick={item.action}>
                            {item.title}
                        </Menu.Item>
                    )
                )
            )}
        </Menu>
    );

    return (
        <Header className="header">
            <Menu
                theme="dark"
                mode="horizontal"
                onClick={handleClick}
                defaultSelectedKeys={defaultSelectedKeys}
                selectedKeys={defaultSelectedKeys}
            >
                <Menu.Item key="1">
                    <Link to="/coffee">
                        <UngroupOutlined />
                        Bàn (F1)
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/coffee/menu">
                        <CoffeeOutlined />
                        Thực Đơn (F2)
                    </Link>
                </Menu.Item>
            </Menu>
            {/* <Input
                placeholder="Tìm kiếm sản phẩm"
                onChange={(e) => console.log(e.target.value)}
                className="input_search"
            /> */}
            <Dropdown overlay={menu} className="account_dropdown">
                <Button>
                    <UserOutlined />{" "}
                    {accountDetail && accountDetail.staff && accountDetail.staff.lastname}
                    <DownOutlined />
                </Button>
            </Dropdown>
        </Header>
    );
};

export default withRouter(HeaderSystem);
