import { ADD_NEW_TYPE, GET_LIST_TYPE, REMOVE_TYPE, UPDATE_TYPE } from "../actions/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = { listType: [] }, action) {
    switch (action.type) {
        case GET_LIST_TYPE:
            return { ...state, listType: action.payload.listType };
        case UPDATE_TYPE:
            return {
                ...state,
                listType: state.listType.map((item) =>
                    item._id !== action.payload._id
                        ? { ...item }
                        : { ...item, ...action.payload }
                ),
            };
        case ADD_NEW_TYPE:
            return {
                ...state,
                listType: [...state.listType, action.payload],
            };
        case REMOVE_TYPE:
            let newListType = [];
            if (action.payload.success === true) {
                newListType = state.listType.filter(
                    (item) => item._id !== action.payload.id
                );
            } else {
                newListType = [...state.listType];
            }
            return {
                ...state,
                listType: newListType,
            };
        default:
            return state;
    }
}
