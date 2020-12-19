import { GET_LIST_TABLE, UPDATE_STATUS_TABLE } from "../actions/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = { listTable: [] }, action) {
    switch (action.type) {
        case GET_LIST_TABLE:
            return { ...state, listTable: action.payload };
        case UPDATE_STATUS_TABLE:
            return {
                ...state,
                listTable: state.listTable.map((item) =>
                    item._id === action.payload
                        ? { ...item, status: "Trống" }
                        : { ...item }
                ),
            };
        default:
            return state;
    }
}
