import { Card, message, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import {
    changeTab,
    getInvoice,
    removeTab,
    requirePayment,
} from "../../actions/tabActions";
import { getListTable } from "../../actions/tableActions";
import TabContent from "../TabContent";

const { TabPane } = Tabs;

const TabsHoaDon = () => {
    const [socket, setSocket] = useState(null);
    const { accountDetail } = useSelector((state) => state.account);
    const dispatch = useDispatch();
    const { panes, activeKey } = useSelector((state) => state.tabs);
    // * Setup socket
    const setupSocket = () => {
        const token = localStorage.getItem("token");
        if (token && !socket) {
            const newSocket = io("http://localhost:3001", {
                query: {
                    token: `${token}`,
                },
            });

            newSocket.on("connect", () => {
                console.log("Socket Ready");
            });
            newSocket.on("disconnect", () => {
                setSocket(null);
            });
            setSocket(newSocket);
        }
    };

    const remove = (targetKey) => {
        // const { panes, activeKey } = props.tabs;
        let newActiveKey = activeKey;
        let lastIndex;
        panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = panes.filter((pane) => pane.table._id !== targetKey);

        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].table._id;
            } else {
                newActiveKey = newPanes[0].table._id;
            }
        }
        dispatch(removeTab(newPanes));
        dispatch(changeTab(newActiveKey));
    };
    useEffect(() => {
        setupSocket();
        return () => {
            setSocket(null);
        };
    }, []);

    useEffect(() => {
        if (!socket) return;
        if (
            accountDetail &&
            accountDetail.staff &&
            accountDetail.staff.account.type === 3
        ) {
            socket.emit("JOIN_ROOM_THUNGAN");
        }
        socket.on("LISTEN_NOTIFICATION_FROM_KITCHEN", (data) => {
            message.success({
                content: `${data.table.name} đã xong`,
                style: {
                    position: "relative",
                    top: 10,
                    right: "-80vh",
                },
            });
            message.config({ maxCount: 1 });
        });

        socket.on("NOTIFICATION_THU_NGAN_SUCCESS", (data) => {
            dispatch(
                requirePayment(
                    data.pane.table._id,
                    data.moneyPay,
                    data.payment,
                    data.userId
                )
            );
            message.success({
                content: `${data.pane.table.name} yêu cầu thanh toán`,
                style: {
                    position: "relative",
                    top: 10,
                    right: "-80vh",
                },
            });
            message.config({ maxCount: 1 });
        });

        socket.on("LISTEN_FROM_THU_NGAN", (data) => {
            message.success({
                content: `${data.pane.table.name} thanh toán thành công`,
                style: {
                    position: "relative",
                    top: 10,
                    right: "-80vh",
                },
            });
            dispatch(getInvoice());
            dispatch(getListTable("Tất cả"));
        });

        socket.on("NOTIFICATION_THU_NGAN_HAVE_NEW_TAB", () => {
            dispatch(getInvoice());
            dispatch(getListTable("Tất cả"));
        });
    }, [socket, accountDetail]);

    const onChange = (activeKey) => {
        dispatch(changeTab(activeKey));
    };

    const onEdit = (targetKey, action) => {
        if (action === "remove") {
            remove(targetKey);
        }
    };

    return (
        <Tabs
            type="editable-card"
            onChange={onChange}
            onEdit={onEdit}
            activeKey={activeKey}
            hideAdd
        >
            {panes &&
                panes.map((pane) => (
                    <TabPane tab={pane.title} key={pane.table._id} closable>
                        <Card
                            className="content_tab"
                            bordered={false}
                            style={{
                                width: "100%",
                                height: 750,
                            }}
                        >
                            <div className="tab_content">
                                <TabContent pane={pane} socket={socket} remove={remove} />
                            </div>
                        </Card>
                    </TabPane>
                ))}
        </Tabs>
    );
};

export default TabsHoaDon;
