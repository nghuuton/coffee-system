import InvoiceIssuesApi from "../api/InvoiceIssuesApi";
import { ADD_NEW_INVOICES_ISSUES, GET_LIST_INVOICE_ISSUES, IMPORT_STORE } from "./types";

export function getListInvoiceIssues() {
    const request = InvoiceIssuesApi.getListInvoiceIssues();
    return {
        type: GET_LIST_INVOICE_ISSUES,
        payload: request,
    };
}

export function createNewInvoiceIssues(values) {
    const request = InvoiceIssuesApi.createNew(values);
    return {
        type: ADD_NEW_INVOICES_ISSUES,
        payload: request,
    };
}

export function importStore(id) {
    const request = InvoiceIssuesApi.importStore(id);
    return {
        type: IMPORT_STORE,
        payload: request,
    };
}
