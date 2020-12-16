import axiosClient from "./axiosClient";

const ProductApi = {
    getListProduct: (params) => {
        const url = "/product";
        return axiosClient.get(url, { params });
    },
    getInformation: (id) => {
        const url = `product/${id}`;
        return axiosClient.get(url);
    },
    removeProduct: (id) => {
        const url = `product/remove/${id}`;
        return axiosClient.post(url);
    },
    createProduct: (data) => {
        const url = "/product";
        const { name, price, image, type, comoditys } = data;
        const formData = new FormData();
        formData.append("image", image);
        formData.append("name", name);
        formData.append("price", price);
        formData.append("type", type);
        formData.append("comoditys", comoditys);
        return axiosClient.post(url, formData);
    },
    updateProduct: (id, data) => {
        const url = `/product/${id}`;
        const { name, price, image, type, comoditys } = data;
        const formData = new FormData();
        formData.append("image", image);
        formData.append("name", name);
        formData.append("price", price);
        formData.append("type", type);
        formData.append("comoditys", comoditys);
        return axiosClient.post(url, formData);
    },
    uploadExcel: (data) => {
        const url = "/product/uploadFile";
        const { xls } = data;
        const formData = new FormData();
        formData.append("xls", xls);
        return axiosClient.post(url, formData);
    },
};

export default ProductApi;
