import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getListProduct } from "../../actions/productAction";
import { addProduct, incrementProduct } from "../../actions/tabActions";

import { Button } from "antd";
import Product from "../Product";

const Menu = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getListProduct({ _id: "123" }));
    }, []);

    const { activeKey, panes } = useSelector((state) => state.tabs);
    const { listProduct } = useSelector((state) => state.products);

    const addNewProduct = (product) => {
        const pane = panes.find((item) => item.table._id === activeKey);
        const duplicate = pane && pane.content.find((item) => item.name === product.name);
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
