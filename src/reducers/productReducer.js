import { GET_LIST_PRODUCT } from "../actions/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
    switch (action.type) {
        case GET_LIST_PRODUCT:
            return { ...state, listProduct: action.payload };
        default:
            return state;
    }
}
