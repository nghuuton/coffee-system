import { HomeOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Button, Divider, message, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListComodity, removeComodity } from "../../actions/comodityAction";
import { getListSupplier, removeSuppl } from "../../actions/supplierAction";
import TableComodity from "../../components/Table_Comodity";
import TableInvoice from "../../components/Table_Invoice_Issues";
import TableSupplier from "../../components/Table_Supplier";
import FormInvoiceAdd from "../../components/Form_Invoice_Add";
import { getListInvoiceIssues, importStore } from "../../actions/invoiceIssuesAction";
import FormSupplierEdit from "../../components/Form_Supplier_Edit";
import FormSupplierAdd from "../../components/Form_Add_Supplier";
import FormComodityEdit from "../../components/Form_Comodity_Edit";
const { Title } = Typography;

const AdminStore = () => {
    const dispatch = useDispatch();
    const { listComodity } = useSelector((state) => state.comoditys);
    const { listSupplier } = useSelector((state) => state.supplier);
    const { accountDetail } = useSelector((state) => state.account);
    const { listInvoiceIssues } = useSelector((state) => state.invoiceissues);

    const [typeModel, setTypeModel] = useState("");
    const [supplier, setSupplier] = useState("");
    const [comodity, setComodity] = useState("");

    const [visible, setVisible] = useState(false);

    const showModal = (type, id) => {
        setTypeModel(type);
        if (type === "Cập nhật nhà cung cấp") {
            const sup = listSupplier.find((item) => item._id === id);
            setSupplier(sup);
        }
        if (type === "Cập nhật hàng hoá") {
            const com = listComodity.find((item) => item._id === id);
            setComodity(com);
        }
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const deleteComodity = (id) => {
        const com = listComodity.find((item) => item._id === id);
        if (com.quantity > 0) {
            return message.error({
                content: "Không thể xoá vì hàng hoá chưa hết",
                style: {
                    position: "relative",
                    top: 10,
                    right: "-76vh",
                },
            });
        }
        const listCom = listInvoiceIssues.map((item) => item.comoditys);
        for (const item of listCom) {
            const result = item.find((item) => item._id._id === id);
            if (result)
                return message.error({
                    content: "Không thể xoá vì có đơn nhập",
                    style: {
                        position: "relative",
                        top: 10,
                        right: "-76vh",
                    },
                });
        }
        dispatch(removeComodity(id));
    };

    const removeSup = (id) => {
        const invoiceIssues = listInvoiceIssues.find(
            (item) => item.bySupplier._id === id
        );
        if (invoiceIssues) {
            return message.error({
                content: "Không thể xoá có hàng hoá nhập bởi đơn vị này",
                style: {
                    position: "relative",
                    top: 10,
                    right: "-76vh",
                },
            });
        }
        dispatch(removeSuppl(id));
    };

    const importStoreInvoice = (id) => {
        dispatch(importStore(id));
    };

    useEffect(() => {
        dispatch(getListComodity());
        dispatch(getListSupplier());
        dispatch(getListInvoiceIssues());
    }, []);

    const staffId = accountDetail.staff._id;

    return (
        <div>
            <Title level={3} style={{ float: "left" }}>
                Quản lý kho
            </Title>
            <Divider />
            <Modal
                title={`${typeModel}`}
                visible={visible}
                onCancel={handleCancel}
                footer={null}
            >
                {typeModel === "Tạo hoá đơn nhập" ? (
                    <FormInvoiceAdd
                        typeModel={typeModel}
                        byStaff={staffId}
                        setVisible={setVisible}
                    />
                ) : typeModel === "Cập nhật nhà cung cấp" ? (
                    <FormSupplierEdit supplier={supplier} setVisible={setVisible} />
                ) : typeModel === "Cập nhật hàng hoá" ? (
                    <FormComodityEdit comodity={comodity} setVisible={setVisible} />
                ) : (
                    <FormSupplierAdd setVisible={setVisible} />
                )}
            </Modal>
            <div className="btn_filter_group" style={{ marginBottom: 20 }}>
                <Button
                    type="primary"
                    size="middle"
                    icon={<PlusSquareOutlined />}
                    onClick={() => showModal("Tạo hoá đơn nhập")}
                >
                    Tạo hoá đơn nhập
                </Button>
                <Button
                    type="default"
                    size="middle"
                    icon={<HomeOutlined />}
                    onClick={() => showModal("Thêm nhà cung cấp")}
                >
                    Nhà cung cấp mới
                </Button>
            </div>
            <div className="table_comodity">
                <TableComodity
                    listComodity={listComodity}
                    showModal={showModal}
                    deleteComodity={deleteComodity}
                />
                <span style={{ width: 10 }}></span>
                <TableSupplier
                    listSupplier={listSupplier}
                    showModal={showModal}
                    setVisible={setVisible}
                    removeSup={removeSup}
                />
            </div>
            <Divider />
            <TableInvoice
                listInvoiceIssues={listInvoiceIssues}
                importStoreInvoice={importStoreInvoice}
            />
        </div>
    );
};

export default AdminStore;
