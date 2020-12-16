import {
    ADD_NEW_INVOICES_ISSUES,
    ADD_NEW_SUPPLIER,
    GET_LIST_SUPPLIER,
    REMOVE_SUPPLIER,
    UPDATE_SUPPLIER,
} from "../actions/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = { listSupplier: [] }, action) {
    switch (action.type) {
        case GET_LIST_SUPPLIER:
            return { ...state, listSupplier: action.payload };
        case ADD_NEW_INVOICES_ISSUES:
            return { ...state, listSupplier: action.payload.listSupplier };
        case UPDATE_SUPPLIER:
            return {
                ...state,
                listSupplier: state.listSupplier.map((item) =>
                    item._id === action.payload._id ? { ...action.payload } : { ...item }
                ),
            };
        case ADD_NEW_SUPPLIER:
            return { ...state, listSupplier: [...state.listSupplier, action.payload] };
        case REMOVE_SUPPLIER:
            return {
                ...state,
                listSupplier: state.listSupplier.filter(
                    (item) => item._id !== action.payload
                ),
            };
        default:
            return state;
    }
}
