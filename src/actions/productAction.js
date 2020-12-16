import ProductApi from "../api/ProductApi";
import {
    ADD_NEW_PRODUCT,
    GET_LIST_PRODUCT,
    REMOVE_PRODUCT,
    UPDATE_PRODUCT,
    UPLOAD_EXCEL_PRODUCT,
} from "./types";

export function getListProduct(params) {
    const request = ProductApi.getListProduct({ ...params });
    return {
        type: GET_LIST_PRODUCT,
        payload: request,
    };
}

export function upDateProduct(productId, values) {
    const request = ProductApi.updateProduct(productId, values);
    return {
        type: UPDATE_PRODUCT,
        payload: request,
    };
}

export function addNewProduct(values) {
    const request = ProductApi.createProduct(values);
    return {
        type: ADD_NEW_PRODUCT,
        payload: request,
    };
}

export function removeProduct(id) {
    const request = ProductApi.removeProduct(id);
    return {
        type: REMOVE_PRODUCT,
        payload: id,
    };
}

export function uploadExcel(values) {
    const request = ProductApi.uploadExcel(values);
    return {
        type: UPLOAD_EXCEL_PRODUCT,
        payload: request,
    };
}
