import axiosClient from "./axiosClient";

const SupplierApi = {
    getListSupplier: () => {
        const url = "/supplier";
        return axiosClient.get(url);
    },
    createSupplier: (values) => {
        const url = "/supplier";
        return axiosClient.post(url, values);
    },
    updateSupplier: (id, values) => {
        const url = `/supplier/${id}`;
        return axiosClient.post(url, values);
    },
    removeSupplier: (id) => {
        const url = `/supplier/${id}`;
        return axiosClient.delete(url);
    },
};

export default SupplierApi;
