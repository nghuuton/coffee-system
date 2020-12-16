import axiosClient from "./axiosClient";

const ComodityApi = {
    getListComodity: () => {
        const url = "/comodity";
        return axiosClient.get(url);
    },
    updateComodity: (values, id) => {
        const url = `/comodity/${id}`;
        return axiosClient.post(url, values);
    },
    removeComodity: (id) => {
        const url = `/comodity/${id}`;
        return axiosClient.delete(url);
    },
};

export default ComodityApi;
