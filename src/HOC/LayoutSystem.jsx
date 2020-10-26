import React, { Component } from "react";
import { Layout } from "antd";
import HeaderSystem from "../components/Header_footer/Hedaer";

class LayoutSystem extends Component {
    render() {
        return (
            <Layout theme="light">
                <HeaderSystem />
                <Layout>{this.props.children}</Layout>
            </Layout>
        );
    }
}

export default LayoutSystem;
