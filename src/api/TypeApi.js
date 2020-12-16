import axiosClient from "./axiosClient";

const TypeApi = {
    getListType: () => {
        const url = "/type";
        return axiosClient.get(url);
    },
    updateType: (id, data) => {
        const url = `/type/${id}`;
        return axiosClient.post(url, data);
    },
    createType: (data) => {
        const url = "/type";
        return axiosClient.post(url, data);
    },
    removeType: (id) => {
        const url = `/type/remove/${id}`;
        return axiosClient.post(url);
    },
};

export default TypeApi;
