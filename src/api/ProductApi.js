import axiosClient from "./axiosClient";

const ProductApi = {
    getListProduct: (params) => {
        const url = "/product";
        return axiosClient.get(url, { params });
    },
};

export default ProductApi;
