import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getListProduct } from "../../actions/productAction";
import { addProduct, getInvoice, incrementProduct } from "../../actions/tabActions";

import { Button } from "antd";
import Product from "../../components/Product";

const Menu = () => {
    const dispatch = useDispatch();

    const { activeKey, panes } = useSelector((state) => state.tabs);
    const { listProduct } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getListProduct({ _id: "123" }));
        if (panes && panes.length === 0) {
            dispatch(getInvoice());
        }
    }, [dispatch]);

    const addNewProduct = (product) => {
        const pane = panes.find((item) => item.table._id === activeKey);
        const duplicate = pane && pane.content.find((item) => item._id === product._id);
        if (activeKey && duplicate) {
            return dispatch(incrementProduct(product, activeKey));
        } else if (activeKey) {
            dispatch(addProduct(product, activeKey));
        }
    };

    const [tool, setTool] = useState([{ name: "Bánh" }, { name: "Nước" }]);

    return (
        <>
            <div className="btn_filter_group">
                {tool.map((item, index) => (
                    <Button key={index}>{item.name}</Button>
                ))}
            </div>
            <div className="wrapper">
                <div className="wrapper__list">
                    {listProduct &&
                        listProduct.map((item) => (
                            <Product
                                addNewProduct={addNewProduct}
                                key={item._id}
                                product={item}
                            />
                        ))}
                </div>
            </div>
        </>
    );
};

export default Menu;
