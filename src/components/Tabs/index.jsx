import React, { Component } from "react";

import { Card, Tabs } from "antd";

const { TabPane } = Tabs;

class TabsHoaDon extends Component {
    render() {
        const { panes, onChange, onEdit } = this.props;
        return (
            <Tabs type="editable-card" onChange={onChange} onEdit={onEdit} hideAdd>
                {panes.length > 0 &&
                    panes.map((pane) => (
                        <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
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

export default TabsHoaDon;
