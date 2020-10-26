import React from "react";
import { Button, Col, Layout, Row, Tabs } from "antd";

const { Content } = Layout;
const { TabPane } = Tabs;

const Home = () => {
    return (
        <Layout>
            <Content>
                <Row gutter={24}>
                    <Col span={14}>
                        <div>
                            <Button style={{ margin: "5px" }}>Tất cả</Button>
                            <Button style={{ margin: "5px" }}>Tầng 1</Button>
                            <Button style={{ margin: "5px" }}>Tầng 2</Button>
                            <Button style={{ margin: "5px" }}>Tầng 3</Button>
                        </div>
                        <div>This is content</div>
                    </Col>
                    <Col span={10}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Tab 1" key="1">
                                Content of Tab Pane 1
                            </TabPane>
                            <TabPane tab="Tab 2" key="2">
                                Content of Tab Pane 2
                            </TabPane>
                            <TabPane tab="Tab 3" key="3">
                                Content of Tab Pane 3
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default Home;
