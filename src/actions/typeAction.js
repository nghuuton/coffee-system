import TypeApi from "../api/TypeApi";
import { ADD_NEW_TYPE, GET_LIST_TYPE, REMOVE_TYPE, UPDATE_TYPE } from "./types";

export function getList() {
    const request = TypeApi.getListType();
    return {
        type: GET_LIST_TYPE,
        payload: request,
    };
}

export function updateType(id, values) {
    const request = TypeApi.updateType(id, values);
    return {
        type: UPDATE_TYPE,
        payload: request,
    };
}

export function addNewType(values) {
    const request = TypeApi.createType(values);
    return {
        type: ADD_NEW_TYPE,
        payload: request,
    };
}

export function removeType(id) {
    const request = TypeApi.removeType(id);
    return {
        type: REMOVE_TYPE,
        payload: request,
    };
}
