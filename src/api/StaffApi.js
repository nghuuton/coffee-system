import axiosClient from "./axiosClient";

const StaffApi = {
    getListStaff: () => {
        const url = "/user";
        return axiosClient.get(url);
    },
    updateType: (data) => {
        const url = "/user";
        return axiosClient.post(url, data);
    },
    createNewuser: (data) => {
        const url = "/user/newuser";
        return axiosClient.post(url, data);
    },
    removeUser: (id) => {
        const url = `/user/${id}`;
        return axiosClient.post(url);
    },
    updateStatus: (id) => {
        const url = `user/updateStatus/${id}`;
        return axiosClient.post(url);
    },
};

export default StaffApi;
