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
};

export default InvoiceApi;
