const { default: axiosClient } = require("./axiosClient");

const InvoiceApi = {
    getInvoiceNotPayment: () => {
        const url = "/invoice/notpayment";
        return axiosClient.get(url);
    },
    getChart: (data) => {
        const url = "/invoice/getChart";
        return axiosClient.post(url, data);
    },
    getListInvoice: () => {
        const url = "/invoice";
        return axiosClient.get(url);
    },
    removeinvoice: (id) => {
        const url = `/invoice/${id}`;
        return axiosClient.post(url);
    },
};

export default InvoiceApi;
