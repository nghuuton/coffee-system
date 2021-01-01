import InvoiceApi from "../api/InvoiceApi";
import {
    ADD_NEW_TAB,
    ADD_PRODUCT,
    CHANGE_TAB_TABLE,
    CLEAR_NOTE_PRODUCT,
    DECREMENT_PRODUCT,
    DELETE_PRODUCT,
    ENABLE_STATUS_NOTE,
    GET_INVOICE_NOT_PAYMENT,
    INCREMENT_PRODUCT,
    NOTE_PRODUCT,
    REMOVE_TAB,
    REQUIREMENT_PAYMENT,
    UPDATE_STATUS_KITCHEN_TAB,
    UPDATE_STATUS_PRODUCT,
} from "./types";

export function addNewTab(name, table, data) {
    const { detailInvoice, result } = data;
    const { product, totalPayment, intoMoney } = detailInvoice ? detailInvoice : {};
    const newContent =
        product &&
        product.map((item) => {
            return {
                quantity: item.quantity,
                ...item._id,
            };
        });

    const content = product ? newContent : [];

    const newTab = {
        title: name,
        content,
        table,
        totalPayment: totalPayment ? totalPayment : 0,
        intoMoney: intoMoney ? intoMoney : 0,
        result: result ? result : {},
    };
    return {
        type: ADD_NEW_TAB,
        payload: newTab,
    };
}

export function removeTab(tab) {
    return {
        type: REMOVE_TAB,
        payload: tab,
    };
}

export function addProduct(product, activeKey) {
    const result = {
        product,
        activeKey,
    };
    return {
        type: ADD_PRODUCT,
        payload: result,
    };
}

export function incrementProduct(product, activeKey) {
    const result = {
        product,
        activeKey,
    };
    return {
        type: INCREMENT_PRODUCT,
        payload: result,
    };
}

export function decrementProduct(product, activeKey) {
    const result = { product, activeKey };
    return {
        type: DECREMENT_PRODUCT,
        payload: result,
    };
}

export function deleteProduct(product, activeKey) {
    const result = { product, activeKey };
    return {
        type: DELETE_PRODUCT,
        payload: result,
    };
}

export function changeTab(_id) {
    return {
        type: CHANGE_TAB_TABLE,
        payload: _id,
    };
}

export function getInvoice() {
    const request = InvoiceApi.getInvoiceNotPayment();
    return {
        type: GET_INVOICE_NOT_PAYMENT,
        payload: request,
    };
}

export function requirePayment(tableId, moneyPay, payment, userId, percent) {
    return {
        type: REQUIREMENT_PAYMENT,
        payload: { tableId, moneyPay, payment, userId, percent },
    };
}

export function updateStatusKitchenTab(paneId) {
    return {
        type: UPDATE_STATUS_KITCHEN_TAB,
        payload: paneId,
    };
}

export function enableStatusNoteProduct(item, tableId) {
    return {
        type: ENABLE_STATUS_NOTE,
        payload: { product: item, tableId },
    };
}

export function noteProduct(item, tableId) {
    return {
        type: NOTE_PRODUCT,
        payload: { product: item, tableId },
    };
}

export function updateStatusProduct(tableId) {
    return {
        type: UPDATE_STATUS_PRODUCT,
        payload: tableId,
    };
}

export function clearNoteProduct(tableId) {
    return {
        type: CLEAR_NOTE_PRODUCT,
        payload: tableId,
    };
}
