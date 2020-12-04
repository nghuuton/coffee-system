import axiosClient from "./axiosClient";

const TableApi = {
    getListTable: (params) => {
        const url = "/table";
        return axiosClient.get(url, { params });
    },
};

export default TableApi;
