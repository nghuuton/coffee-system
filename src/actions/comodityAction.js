import ComodityApi from "../api/ComodityApi";
import { GET_LIST_COMODITY, REMOVE_COMODITY, UPDATE_COMODITY } from "./types";

export function getListComodity() {
    const request = ComodityApi.getListComodity();
    return {
        type: GET_LIST_COMODITY,
        payload: request,
    };
}

export function updateComodity(values, id) {
    const request = ComodityApi.updateComodity(values, id);
    return {
        type: UPDATE_COMODITY,
        payload: request,
    };
}

export function removeComodity(id) {
    const request = ComodityApi.removeComodity(id);
    return {
        type: REMOVE_COMODITY,
        payload: id,
    };
}
