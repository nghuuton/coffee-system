import { Col, Layout, Row } from "antd";
import React, { Component } from "react";
import HeaderSystem from "../components/Header_footer/Hedaer";
import TabsHoaDon from "../components/Tabs";
const { Content } = Layout;
class LayoutSystem extends Component {
    render() {
        return (
            <Layout theme="light">
                <HeaderSystem />
                <Layout>
                    <Content>
                        <Row gutter={24} style={{ height: 790 }}>
                            <Col span={12}>{this.props.children}</Col>
                            <Col span={12} style={{ minHeight: 500 }}>
                                <TabsHoaDon />
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default LayoutSystem;
