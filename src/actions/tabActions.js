import { ADD_NEW_TAB, REMOVE_TAB } from "./types";

export function addNewTab(name, data) {
    const newTab = {
        title: name,
        content: data.title,
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
