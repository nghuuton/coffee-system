const { default: axiosClient } = require("./axiosClient");

const InvoiceApi = {
    getInvoiceNotPayment: () => {
        const url = "/invoice/notpayment";
        return axiosClient.get(url);
    },
};

export default InvoiceApi;
