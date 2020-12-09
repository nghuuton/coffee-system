import TableApi from "../api/TableApi";
import { GET_LIST_TABLE } from "./types";

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
