import React, { Component } from "react";

import { Card, Tabs } from "antd";
import { changeTab, removeTab } from "../../actions/tabActions";
import { connect } from "react-redux";
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
        const { panes, activeKey } = this.props.tabs;
        let newActiveKey = activeKey;
        let lastIndex;

        panes.forEach((pane, i) => {
            if (pane.table._id === targetKey) {
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
