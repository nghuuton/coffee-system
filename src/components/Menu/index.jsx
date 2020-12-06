import { Button } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { addProduct } from "../../actions/tabActions";

const Menu = () => {
    const dispatch = useDispatch();
    const { activeKey } = useSelector((state) => state.tabs);
    const addNewProduct = () => {
        const newProduct = {
            quantity: 10,
            _id: { _id: 3, name: "Sting", quantity: 1, price: 10000 },
        };
        dispatch(addProduct(newProduct, activeKey));
    };

    return (
        <div>
            <Button onClick={addNewProduct}>Add</Button>
        </div>
    );
};

export default Menu;
