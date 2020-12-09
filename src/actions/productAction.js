import ProductApi from "../api/ProductApi";
import { GET_LIST_PRODUCT } from "./types";

export function getListProduct(params) {
    const request = ProductApi.getListProduct({ ...params });
    return {
        type: GET_LIST_PRODUCT,
        payload: request,
    };
}
