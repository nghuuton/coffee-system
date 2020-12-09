import AccountApi from "../api/accountApi";
import { ACCOUNT_AUTH, ACCOUNT_LOGIN } from "./types";

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
