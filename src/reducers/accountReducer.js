import { ACCOUNT_AUTH, ACCOUNT_LOGIN } from "../actions/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
    switch (action.type) {
        case ACCOUNT_LOGIN:
            return { ...state };
        case ACCOUNT_AUTH:
            return { ...state, accountDetail: { ...action.payload, loginSuccess: true } };
        default:
            return state;
    }
}
