import { GET_INVOICE_PRODUCT } from "./types";

export function getInvoiceProduct(products) {
    return {
        type: GET_INVOICE_PRODUCT,
        payload: products,
    };
}
