import AccountApi from "../api/accountApi";
import { ACCOUNT_AUTH, ACCOUNT_LOGIN, ACCOUNT_LOGOUT } from "./types";

export function accountLogin(data) {
    const request = AccountApi.login(data);
    return {
        type: ACCOUNT_LOGIN,
        payload: request,
    };
}

export function accountAuth() {
    const request = AccountApi.auth();
    return {
        type: ACCOUNT_AUTH,
        payload: request,
    };
}

export function accountLogout() {
    return {
        type: ACCOUNT_LOGOUT,
    };
}
