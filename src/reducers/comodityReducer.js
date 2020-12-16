import {
    ADD_NEW_INVOICES_ISSUES,
    GET_LIST_COMODITY,
    IMPORT_STORE,
    REMOVE_COMODITY,
    UPDATE_COMODITY,
} from "../actions/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = { listComodity: [] }, action) {
    switch (action.type) {
        case GET_LIST_COMODITY:
            return { ...state, listComodity: action.payload };
        case ADD_NEW_INVOICES_ISSUES:
            return { ...state, listComodity: action.payload.listComodity };
        case UPDATE_COMODITY:
            return { ...state, listComodity: action.payload };
        case REMOVE_COMODITY:
            return {
                ...state,
                listComodity: state.listComodity.filter(
                    (item) => item._id !== action.payload
                ),
            };
        case IMPORT_STORE:
            return {
                ...state,
                listComodity: action.payload.listComodity,
            };
        default:
            return state;
    }
}
