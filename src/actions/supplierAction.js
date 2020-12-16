import SupplierApi from "../api/SupplierApi";
import {
    ADD_NEW_SUPPLIER,
    GET_LIST_SUPPLIER,
    REMOVE_SUPPLIER,
    UPDATE_SUPPLIER,
} from "./types";

export function getListSupplier() {
    const request = SupplierApi.getListSupplier();
    return {
        type: GET_LIST_SUPPLIER,
        payload: request,
    };
}

export function updateSupplier(id, values) {
    const request = SupplierApi.updateSupplier(id, values);
    return {
        type: UPDATE_SUPPLIER,
        payload: request,
    };
}

export function createNewSupplier(values) {
    const request = SupplierApi.createSupplier(values);
    return {
        type: ADD_NEW_SUPPLIER,
        payload: request,
    };
}

export function removeSuppl(id) {
    const request = SupplierApi.removeSupplier(id);
    return {
        type: REMOVE_SUPPLIER,
        payload: id,
    };
}
