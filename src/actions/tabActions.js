import { ADD_NEW_TAB, CHANGE_TAB_TABLE, REMOVE_TAB } from "./types";

export function addNewTab(name, table) {
    const newTab = {
        title: name,
        content: "",
        table,
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

export function changeTab(_id) {
    return {
        type: CHANGE_TAB_TABLE,
        payload: _id,
    };
}
