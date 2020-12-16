import { GET_INVOICE_PRODUCT, REMOVE_INVOICE_PRODUCT } from "./types";

export function getInvoiceProduct(products) {
    return {
        type: GET_INVOICE_PRODUCT,
        payload: products,
    };
}

export function deleteRequirement() {
    return {
        type: REMOVE_INVOICE_PRODUCT,
    };
}
