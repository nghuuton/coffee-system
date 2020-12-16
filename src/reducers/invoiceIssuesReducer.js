import {
    ADD_NEW_INVOICES_ISSUES,
    GET_LIST_INVOICE_ISSUES,
    IMPORT_STORE,
} from "../actions/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = { listInvoiceIssues: [] }, action) {
    switch (action.type) {
        case GET_LIST_INVOICE_ISSUES:
            return { ...state, listInvoiceIssues: action.payload };
        case ADD_NEW_INVOICES_ISSUES:
            return {
                ...state,
                listInvoiceIssues: action.payload.listInvoiceIssues,
            };
        case IMPORT_STORE:
            return {
                ...state,
                listInvoiceIssues: state.listInvoiceIssues.map((item) =>
                    item._id !== action.payload.id
                        ? { ...item }
                        : { ...item, status: true }
                ),
            };
        default:
            return state;
    }
}
