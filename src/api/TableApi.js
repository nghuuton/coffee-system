import axiosClient from "./axiosClient";

const TableApi = {
    getListTable: (params) => {
        const url = "/table";
        return axiosClient.get(url, { params });
    },
    getInvoice: (data) => {
        const url = "/table";
        return axiosClient.post(url, data);
    },
};

export default TableApi;
