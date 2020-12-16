import { Button, Divider, message, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListComodity } from "../../actions/comodityAction";
import { getListProduct, removeProduct } from "../../actions/productAction";
import { getList, removeType } from "../../actions/typeAction";
import FormProductAdd from "../../components/Form_Product_Add";
import FormProductEdit from "../../components/Form_Product_Edit";
import FormTypeEdit from "../../components/Form_Type_Add_Edit";
import ImportExcel from "../../components/ImportExcel";
import TableProduct from "../../components/Table_Product";
import TableType from "../../components/Table_Type";

const { Title } = Typography;

const AdminMenu = () => {
    const dispatch = useDispatch();

    const { listProduct } = useSelector((state) => state.products);
    const { listType } = useSelector((state) => state.types);
    const { listComodity } = useSelector((state) => state.comoditys);
    const newListType =
        listType &&
        listType.map((item) => {
            return {
                value: item._id,
                text: item.name,
            };
        });
    const [typeArray, setTypeArray] = useState([]);
    const [product, setProduct] = useState();
    const [visible, setVisible] = useState(false);
    const [typeModel, setTypeModel] = useState("");
    const [typeCurrent, setTypeCurrent] = useState();

    const showModal = (type, id) => {
        setTypeModel(type);
        if (type === "Cập nhật") {
            const result = listProduct.find((item) => item._id === id);
            const newProduct = {
                ...result,
                type: result.type._id,
                comoditys: result.comoditys.map((item) => item._id),
                image: null,
            };
            setVisible(true);
            setTypeCurrent("");
            return setProduct(newProduct);
        }
        if (type === "Cập nhật loại") {
            const result = listType.find((item) => item._id === id);
            return setTypeCurrent(result);
        }
        setProduct("");
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
        setProduct("");
    };

    useEffect(() => {
        dispatch(getListProduct({ _id: "123" }));
        dispatch(getList());
        dispatch(getListComodity());
        setTypeArray(newListType);
        return () => {
            setProduct("");
        };
    }, [dispatch]);

    const deleteType = (id) => {
        const result = listProduct.find((item) => item.type._id === id);
        if (result) {
            return message.error({
                content: "Không thể xoá vì còn sản phẩm trong loại này",
                style: {
                    position: "relative",
                    top: 10,
                    right: "-76vh",
                },
            });
        }
        dispatch(removeType(id));
    };

    const deleteProduct = (id) => {
        dispatch(removeProduct(id));
        return message.success({
            content: "Xoá thành công",
            style: {
                position: "relative",
                top: 10,
                right: "-76vh",
            },
        });
    };

    return (
        <div>
            <Title level={3} style={{ float: "left" }}>
                Quản lý thực đơn
            </Title>
            <Divider />
            <Modal
                title={`${typeModel}`}
                visible={visible}
                onCancel={handleCancel}
                footer={null}
            >
                {product ? (
                    <FormProductEdit
                        listType={listType}
                        typeModel={typeModel}
                        product={product}
                        listComodity={listComodity}
                        setVisible={setVisible}
                    />
                ) : (
                    <FormProductAdd
                        listType={listType}
                        typeModel={typeModel}
                        listComodity={listComodity}
                        setVisible={setVisible}
                    />
                )}
            </Modal>
            <div className="btn_filter_group" style={{ marginBottom: 20 }}>
                <Button type="primary" size="middle" onClick={() => showModal("Thêm")}>
                    Thêm món
                </Button>
                <ImportExcel />
            </div>
            <div className="type_table">
                <TableType
                    listType={listType}
                    showModal={showModal}
                    deleteType={deleteType}
                />
                {typeCurrent ? (
                    <FormTypeEdit
                        typeCurrent={typeCurrent}
                        setTypeCurrent={setTypeCurrent}
                    />
                ) : (
                    <FormTypeEdit
                        typeCurrent={{ name: "" }}
                        setTypeCurrent={setTypeCurrent}
                    />
                )}
            </div>
            <Divider />
            <TableProduct
                listProduct={listProduct}
                typeArray={typeArray}
                showModal={showModal}
                deleteProduct={deleteProduct}
            />
        </div>
    );
};

export default AdminMenu;
