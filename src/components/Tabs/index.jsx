import { Card, Tabs } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { changeTab, removeTab } from "../../actions/tabActions";
import TabContent from "../TabContent";
import io from "socket.io-client";

const { TabPane } = Tabs;

class TabsHoaDon extends Component {
    state = {
        socket: null,
    };

    onChange = (activeKey) => {
        this.props.dispatch(changeTab(activeKey));
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };
    // * Setup socket
    setupSocket = () => {
        const { socket } = this.state;
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
                this.setState({ socket: null });
            });
            this.setState({ socket: newSocket });
        }
    };

    componentDidMount() {
        this.setupSocket();
    }

    componentWillUnmount() {
        this.setState({ socket: null });
    }

    remove = (targetKey) => {
        const { panes, activeKey } = this.props.tabs;
        let newActiveKey = activeKey;
        let lastIndex;
        panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = panes.filter((pane) => pane.table[0]._id !== targetKey);

        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].table._id;
            } else {
                newActiveKey = newPanes[0].table._id;
            }
        }
        this.props.dispatch(removeTab(newPanes));
        this.props.dispatch(changeTab(newActiveKey));
    };

    render() {
        const { panes, activeKey } = this.props.tabs;
        const { socket } = this.state;
        return (
            <Tabs
                type="editable-card"
                onChange={this.onChange}
                onEdit={this.onEdit}
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
    }
}

function mapStateToProps(state) {
    return {
        tabs: state.tabs,
    };
}

export default connect(mapStateToProps)(TabsHoaDon);
