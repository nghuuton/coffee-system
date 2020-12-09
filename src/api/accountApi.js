import axiosClient from "./axiosClient";

const AccountApi = {
    login: (data) => {
        const url = "/account/login";
        return axiosClient.post(url, data);
    },
    auth: () => {
        const url = "/account/auth";
        return axiosClient.post(url);
    },
};

export default AccountApi;
