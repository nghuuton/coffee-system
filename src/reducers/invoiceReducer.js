import { GET_INVOICE_PRODUCT, REMOVE_INVOICE_PRODUCT } from "../actions/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = { detailsInvoice: [] }, action) {
    switch (action.type) {
        case GET_INVOICE_PRODUCT:
            return { ...state, detailsInvoice: action.payload };
        case REMOVE_INVOICE_PRODUCT:
            return { ...state, detailsInvoice: [] };
        default:
            return state;
    }
}
