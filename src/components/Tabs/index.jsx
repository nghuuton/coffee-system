import React, { Component } from "react";

import { Card, Tabs } from "antd";
import { removeTab } from "../../actions/tabActions";
import { connect } from "react-redux";
const { TabPane } = Tabs;

class TabsHoaDon extends Component {
    onChange = (activeKey) => {
        this.setState({ activeKey });
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    remove = (targetKey) => {
        const { panes } = this.props.tabs;
        const newPanes = panes.filter((pane) => pane.title !== targetKey);
        this.props.dispatch(removeTab(newPanes));
    };
    render() {
        const { panes } = this.props.tabs;
        return (
            <Tabs
                type="editable-card"
                onChange={this.onChange}
                onEdit={this.onEdit}
                hideAdd
            >
                {panes.length > 0 &&
                    panes.map((pane) => (
                        <TabPane
                            tab={pane.title}
                            key={pane.title}
                            closable={pane.closable}
                        >
                            <Card
                                bordered={false}
                                style={{
                                    width: "100%",
                                    height: 500,
                                }}
                            >
                                {pane.content}
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
