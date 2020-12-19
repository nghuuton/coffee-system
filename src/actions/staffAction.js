import StaffApi from "../api/StaffApi";
import { CREATE_NEW_USER, GET_LIST_USER, REMOVE_USER, UPDATE_TYPE_USER } from "./types";

export function getListUser() {
    const request = StaffApi.getListStaff();
    return {
        type: GET_LIST_USER,
        payload: request,
    };
}

export function updateTypeUser(data) {
    const requset = StaffApi.updateType(data);
    return {
        type: UPDATE_TYPE_USER,
        payload: requset,
    };
}

export function createNewUser(data) {
    const request = StaffApi.createNewuser(data);
    return {
        type: CREATE_NEW_USER,
        payload: request,
    };
}

export function deleteUser(id) {
    const request = StaffApi.removeUser(id);
    return {
        type: REMOVE_USER,
        payload: id,
    };
}
