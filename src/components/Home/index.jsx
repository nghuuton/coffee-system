import { Button, Col, Layout, Row } from "antd";
import React, { Component } from "react";
import TabsHoaDon from "../Tabs";
import axios from "axios";

const { Content } = Layout;

const initialPanes = [];

class Home extends Component {
    state = {};
    newTabIndex = 0;

    state = { panes: initialPanes };

    onChange = (activeKey) => {
        this.setState({ activeKey });
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    add = async (name) => {
        const { panes } = this.state;
        const newPanes = [...panes];

        const panesExist = newPanes.find((item) => item.title === name);

        if (panesExist) {
            return;
        }
        const activeKey = `${this.newTabIndex++}`;

        const { data } = await axios.get(
            `https://jsonplaceholder.typicode.com/todos/${Number(activeKey) + 1}`
        );

        newPanes.push({
            title: `${name}`,
            content: `${data.title}`,
            key: activeKey,
        });
        this.setState({
            panes: newPanes,
            activeKey,
        });
    };

    remove = (targetKey) => {
        const { panes, activeKey } = this.state;
        let newActiveKey = activeKey;
        let lastIndex;

        panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = panes.filter((pane) => pane.key !== targetKey);

        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }

        this.setState({
            panes: newPanes,
            activeKey: newActiveKey,
        });
    };

    render() {
        return (
            <Layout>
                <Content>
                    <Row gutter={24}>
                        <Col span={14}>
                            <div>
                                <Button style={{ margin: "5px" }}>Tất cả</Button>
                                <Button style={{ margin: "5px" }}>Bàn trống</Button>
                                <Button style={{ margin: "5px" }}>Đã thanh toán</Button>
                                <Button style={{ margin: "5px" }}>Chưa thanh toán</Button>
                            </div>
                            <div>
                                <div style={{ marginBottom: 16 }}>
                                    <Button onClick={() => this.add("Bàn 1")}>
                                        Bàn 1
                                    </Button>
                                    <Button onClick={() => this.add("Bàn 2")}>
                                        Bàn 2
                                    </Button>
                                    <Button onClick={() => this.add("Bàn 3")}>
                                        Bàn 3
                                    </Button>
                                </div>
                            </div>
                        </Col>
                        <Col span={10} style={{ minHeight: 500 }}>
                            <TabsHoaDon
                                panes={this.state.panes}
                                onChange={this.onChange}
                                onEdit={this.onEdit}
                            />
                        </Col>
                    </Row>
                </Content>
            </Layout>
        );
    }
}

export default Home;
