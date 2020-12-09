import React, { Component } from "react";
import { connect } from "react-redux";
import { changeTab, removeTab } from "../../actions/tabActions";

import { Card, Tabs } from "antd";
import TabContent from "../TabContent";
const { TabPane } = Tabs;

class TabsHoaDon extends Component {
    onChange = (activeKey) => {
        this.props.dispatch(changeTab(activeKey));
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    remove = (targetKey) => {
        const { panes } = this.props.tabs;

        const index = panes.findIndex((item) => item.table._id === targetKey);
        const newActiveKey = panes.length > 1 ? panes[index + 1].table._id : "";
        const newPanes = panes.filter((pane) => pane.table._id !== targetKey);

        this.props.dispatch(removeTab(newPanes));
        this.props.dispatch(changeTab(newActiveKey));
    };

    render() {
        const { panes, activeKey } = this.props.tabs;
        return (
            <Tabs
                type="editable-card"
                onChange={this.onChange}
                onEdit={this.onEdit}
                activeKey={activeKey}
                hideAdd
            >
                {panes.length > 0 &&
                    panes.map((pane) => (
                        <TabPane
                            tab={pane.title}
                            key={pane.table._id}
                            closable={pane.closable}
                        >
                            <Card
                                className="content_tab"
                                bordered={false}
                                style={{
                                    width: "100%",
                                    height: 750,
                                }}
                            >
                                {pane && pane.content.length > 0 && (
                                    <div className="tab_content">
                                        <TabContent pane={pane} />
                                    </div>
                                )}
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
