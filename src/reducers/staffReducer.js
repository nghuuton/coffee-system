import {
    CREATE_NEW_USER,
    GET_LIST_USER,
    REMOVE_USER,
    UPDATE_STATUS_USER,
    UPDATE_TYPE_USER,
} from "../actions/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = { listStaff: [] }, action) {
    switch (action.type) {
        case GET_LIST_USER:
            return { ...state, listStaff: action.payload };
        case UPDATE_TYPE_USER:
            return {
                ...state,
                listStaff: state.listStaff.map((item) =>
                    item._id !== action.payload._id ? { ...item } : { ...action.payload }
                ),
            };
        case CREATE_NEW_USER:
            if (action.payload.name === "Error") return { ...state };
            else {
                return {
                    ...state,
                    listStaff: [...state.listStaff, action.payload],
                };
            }

        case REMOVE_USER:
            return {
                ...state,
                listStaff: action.payload.listStaff,
            };
        case UPDATE_STATUS_USER:
            return {
                ...state,
                listStaff: action.payload,
            };
        default:
            return state;
    }
}
