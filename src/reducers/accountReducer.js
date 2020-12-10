import { ACCOUNT_AUTH, ACCOUNT_LOGIN, ACCOUNT_LOGOUT } from "../actions/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
    switch (action.type) {
        case ACCOUNT_LOGIN:
            localStorage.setItem("token", action.payload.token);
            return { ...state, loginSuccess: true };
        case ACCOUNT_AUTH:
            return { ...state, accountDetail: { ...action.payload, loginSuccess: true } };
        case ACCOUNT_LOGOUT:
            return {
                ...state,
                accountDetail: {},
            };
        default:
            return state;
    }
}
