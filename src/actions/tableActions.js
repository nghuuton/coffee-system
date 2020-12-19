import TableApi from "../api/TableApi";
import { GET_LIST_TABLE, UPDATE_STATUS_TABLE } from "./types";

export function getListTable(filterParams) {
    const request =
        filterParams.byStatus !== "Chưa thanh toán"
            ? TableApi.getListTable({ ...filterParams })
            : TableApi.getTableNotPayment();

    return {
        type: GET_LIST_TABLE,
        payload: request,
    };
}

export function updateStatusTable(id) {
    return {
        type: UPDATE_STATUS_TABLE,
        payload: id,
    };
}
