import { Divider, message, Typography } from "antd";
import React, { useEffect, useState } from "react";
import InvoiceApi from "../../api/InvoiceApi";
import TableInvoice from "../../components/Table_Invoice";

const { Title } = Typography;
const AdminInvoice = () => {
    const [invoice, setInvoice] = useState({ listInvoice: [], detailInvoice: [] });

    useEffect(() => {
        const fetchData = async () => {
            const data = await InvoiceApi.getListInvoice();
            setInvoice({
                ...invoice,
                listInvoice: data.listInvoice,
                detailInvoice: data.listDetailInvoice,
            });
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteInvoice = async (id) => {
        const { listInvoice } = invoice;
        const result = listInvoice.find((item) => item._id === id);
        if (!result.status) {
            return message.error({
                content: "Không xóa được vì chưa thanh toán",
                style: {
                    position: "relative",
                    top: 10,
                    right: "-76vh",
                },
            });
        }
        const data = await InvoiceApi.removeinvoice(id);
        setInvoice({
            ...invoice,
            listInvoice: data.listInvoice,
            detailInvoice: data.listDetailInvoice,
        });
        message.success({
            content: "Xóa thành công",
            style: {
                position: "relative",
                top: 10,
                right: "-76vh",
            },
        });
    };

    const newListInvoice = invoice.listInvoice.map((item, index) => {
        return {
            ...item,
            product: invoice.detailInvoice.find(
                (detail) => item.detailInvoice._id === detail._id
            ).product,
        };
    });

    return (
        <div>
            <div>
                <Title level={3} style={{ float: "left" }}>
                    Quản lý hoá đơn
                </Title>
                <Divider />
                <TableInvoice
                    listInvoice={newListInvoice}
                    deleteInvoice={deleteInvoice}
                />
            </div>
        </div>
    );
};

export default AdminInvoice;
