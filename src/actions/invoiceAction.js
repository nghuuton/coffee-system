import { GET_INVOICE_PRODUCT, REMOVE_INVOICE_PRODUCT } from "./types";

export function getInvoiceProduct(item) {
    return {
        type: GET_INVOICE_PRODUCT,
        payload: item,
    };
}

export function deleteRequirement() {
    return {
        type: REMOVE_INVOICE_PRODUCT,
    };
}
