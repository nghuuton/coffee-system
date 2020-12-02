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
                        <Row gutter={24}>
                            <Col span={14}>{this.props.children}</Col>
                            <Col span={10} style={{ minHeight: 500 }}>
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
