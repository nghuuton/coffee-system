import { Button } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { addNewTab } from "../../actions/tabActions";
import axios from "axios";
import TableRadio from "../Table";

class Home extends Component {
    add = async (name) => {
        const { panes } = this.props.tabs;
        const newPanes = [...panes];
        const panesExist = newPanes.find((item) => item.title === name);
        if (panesExist) {
            return;
        }
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/todos/1`);

        this.props.dispatch(addNewTab(name, data));
    };

    render() {
        return (
            <>
                <div>
                    <Button style={{ margin: "5px" }}>Tất cả</Button>
                    <Button style={{ margin: "5px" }}>Bàn trống</Button>
                    <Button style={{ margin: "5px" }}>Đã thanh toán</Button>
                    <Button style={{ margin: "5px" }}>Chưa thanh toán</Button>
                </div>
                <div>
                    <div
                        style={{
                            marginBottom: 16,
                            display: "flex",
                            flexFlow: "row",
                            flexWrap: "wrap",
                            width: 1000,
                        }}
                    >
                        <TableRadio name={"Bàn 1"} onClick={() => this.add("Bàn 1")} />
                        <TableRadio name={"Bàn 2"} onClick={() => this.add("Bàn 2")} />
                        <TableRadio name={"Bàn 3"} onClick={() => this.add("Bàn 3")} />
                        <TableRadio name={"Bàn 4"} onClick={() => this.add("Bàn 4")} />
                        <TableRadio name={"Bàn 5"} onClick={() => this.add("Bàn 5")} />
                        <TableRadio name={"Bàn 6"} onClick={() => this.add("Bàn 6")} />
                        <TableRadio name={"Bàn 7"} onClick={() => this.add("Bàn 7")} />
                        <TableRadio name={"Bàn 8"} onClick={() => this.add("Bàn 8")} />
                        <TableRadio name={"Bàn 9"} onClick={() => this.add("Bàn 9")} />
                        <TableRadio name={"Bàn 10"} onClick={() => this.add("Bàn 10")} />
                        <TableRadio name={"Bàn 11"} onClick={() => this.add("Bàn 11")} />
                        <TableRadio name={"Bàn 12"} onClick={() => this.add("Bàn 12")} />
                    </div>
                </div>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        tabs: state.tabs,
    };
}

export default connect(mapStateToProps)(Home);
