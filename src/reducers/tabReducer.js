import { ADD_NEW_TAB, REMOVE_TAB } from "../actions/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = { panes: [] }, action) {
    switch (action.type) {
        case ADD_NEW_TAB:
            return { ...state, panes: [...state.panes, action.payload] };
        case REMOVE_TAB:
            return { ...state, panes: action.payload };
        default:
            return state;
    }
}
