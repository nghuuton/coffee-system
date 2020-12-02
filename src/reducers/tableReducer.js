import { GET_LIST_TABLE } from "../actions/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
    switch (action.type) {
        case GET_LIST_TABLE:
            return { ...state };

        default:
            return state;
    }
}
