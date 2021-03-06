import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTab, changeTab, getInvoice } from "../../actions/tabActions";
import { getListTable } from "../../actions/tableActions";
import TableApi from "../../api/TableApi";
import TableRadio from "../../components/Table";

const Home = () => {
    const dispatch = useDispatch();
    const { listTable } = useSelector((state) => state.tables);
    const { panes } = useSelector((state) => state.tabs);
    const [byStatus, setByStatus] = useState("");

    useEffect(() => {
        dispatch(getListTable({ byStatus }));
        if (panes && panes.length === 0) {
            dispatch(getInvoice());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [byStatus, dispatch]);

    const add = async (table) => {
        const newPanes = [...panes];
        const panesExist = newPanes.find((item) => item.title === table.name);
        if (panesExist) {
            return dispatch(changeTab(table._id));
        }
        const data = await TableApi.getInvoice({ _id: table._id });
        dispatch(addNewTab(table.name, table, data));
        dispatch(changeTab(table._id));
    };

    const getAll = () => {
        dispatch(getListTable("Tất cả"));
        setByStatus("");
    };

    // eslint-disable-next-line no-unused-vars
    const [tool, setTool] = useState([
        { name: "Tất cả", function: () => getAll() },
        { name: "Bàn trống", function: () => setByStatus("Trống") },
        { name: "Chưa thanh toán", function: () => setByStatus("Chưa thanh toán") },
        {
            name: "Lầu 1",
            function: () => {
                dispatch(getListTable({ skip: 0, limit: 10 }));
            },
        },
        {
            name: "Lầu 2",
            function: () => {
                dispatch(getListTable({ skip: 10, limit: 10 }));
            },
        },
    ]);
    return (
        <>
            <div className="btn_filter_group">
                {tool.map((item, index) => (
                    <Button onClick={item.function} key={index}>
                        {item.name}
                    </Button>
                ))}
            </div>
            <div className="wrapper">
                <div className="wrapper__list">
                    {listTable &&
                        listTable.map((item) => (
                            <TableRadio
                                name={`${item.name}`}
                                table={item}
                                onClick={() => add(item)}
                                key={item._id}
                            />
                        ))}
                </div>
            </div>
        </>
    );
};

export default Home;
