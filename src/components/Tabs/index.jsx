import { Card, message, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { changeTab, removeTab } from "../../actions/tabActions";
import TabContent from "../TabContent";

const { TabPane } = Tabs;

const TabsHoaDon = () => {
    const [socket, setSocket] = useState(null);
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
    useEffect(() => {
        setupSocket();
        return () => {
            setSocket(null);
        };
    }, []);

    useEffect(() => {
        if (!socket) return;
        socket.on("LISTEN_NOTIFICATION_FROM_KITCHEN", (data) => {
            message.success({
                content: `${data.table.name} đã xong`,
                style: {
                    position: "relative",
                    top: 10,
                    right: "-80vh",
                },
            });
        });
    }, [socket]);

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
            {panes.map((pane) => (
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
                            <TabContent pane={pane} socket={socket} />
                        </div>
                    </Card>
                </TabPane>
            ))}
        </Tabs>
    );
};

export default TabsHoaDon;
