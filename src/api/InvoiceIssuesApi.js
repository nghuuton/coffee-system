import axiosClient from "./axiosClient";

const InvoiceIssuesApi = {
    getListInvoiceIssues: () => {
        const url = "/invoiceissues";
        return axiosClient.get(url);
    },
    createNew: (data) => {
        const url = "/invoiceissues";
        return axiosClient.post(url, data);
    },
    importStore: (id) => {
        const url = `/invoiceissues/${id}`;
        return axiosClient.post(url);
    },
};

export default InvoiceIssuesApi;
