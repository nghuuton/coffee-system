import TableApi from "../api/TableApi";
import {
    ADD_NEW_TAB,
    ADD_PRODUCT,
    CHANGE_TAB_TABLE,
    DECREMENT_PRODUCT,
    DELETE_PRODUCT,
    INCREMENT_PRODUCT,
    REMOVE_TAB,
} from "./types";

export function addNewTab(name, table, data) {
    const { detailInvoice, result } = data;
    const { product, totalPayment, intoMoney } = detailInvoice ? detailInvoice : {};
    const content = product ? product : [];
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
