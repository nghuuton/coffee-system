import TableApi from "../api/TableApi";
import { GET_LIST_TABLE } from "./types";

export function getListTable(filterParams) {
    const request = TableApi.getListTable({ ...filterParams });
    return {
        type: GET_LIST_TABLE,
        payload: request,
    };
}
