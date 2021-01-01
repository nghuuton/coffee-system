import {
    ADD_NEW_TAB,
    ADD_PRODUCT,
    CHANGE_TAB_TABLE,
    CLEAR_NOTE_PRODUCT,
    DECREMENT_PRODUCT,
    DELETE_PRODUCT,
    ENABLE_STATUS_NOTE,
    GET_INVOICE_NOT_PAYMENT,
    INCREMENT_PRODUCT,
    NOTE_PRODUCT,
    REMOVE_TAB,
    REQUIREMENT_PAYMENT,
    UPDATE_STATUS_KITCHEN_TAB,
    UPDATE_STATUS_PRODUCT,
} from "../actions/types";
import { generatorListInvoice } from "../utils/helpers";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = { panes: [] }, action) {
    switch (action.type) {
        case ADD_NEW_TAB:
            return {
                ...state,
                panes: [...state.panes, { ...action.payload, statusKitchen: true }],
            };
        case REMOVE_TAB:
            return { ...state, panes: action.payload };
        case CHANGE_TAB_TABLE:
            return { ...state, activeKey: action.payload };
        case ADD_PRODUCT:
            const result = state.panes.find(
                (item) => item.table._id === action.payload.activeKey
            );
            const idx = state.panes.findIndex(
                (item) => item.table._id === action.payload.activeKey
            );
            return {
                ...state,
                panes: [
                    ...state.panes.slice(0, idx),
                    {
                        ...result,
                        statusKitchen: false,
                        content: [
                            ...result.content,
                            { ...action.payload.product, quantity: 1, status: false },
                        ],
                    },
                    ...state.panes.slice(idx + 1),
                ],
            };
        case INCREMENT_PRODUCT:
            const { activeKey, product } = action.payload;
            const pane = state.panes.find((item) => item.table._id === activeKey);
            const indexPane = state.panes.indexOf(pane);
            const indexProduct = pane.content.findIndex(
                (item) => item._id === product._id
            );
            const newContent = [
                ...pane.content.slice(0, indexProduct),
                {
                    ...product,
                    quantity: pane.content[indexProduct].quantity + 1,
                    status: false,
                },
                ...pane.content.slice(indexProduct + 1),
            ];

            return {
                ...state,
                panes: [
                    ...state.panes.slice(0, indexPane),
                    {
                        ...pane,
                        statusKitchen: false,
                        content: [...newContent],
                    },
                    ...state.panes.slice(indexPane + 1),
                ],
            };
        case DECREMENT_PRODUCT:
            const { activeKey: atv, product: p } = action.payload;
            const paneObj = state.panes.find((item) => item.table._id === atv);
            const idxPane = state.panes.indexOf(paneObj);
            const idxP = paneObj.content.indexOf(p);
            const newContentResult = [
                ...paneObj.content.slice(0, idxP),
                { ...p, quantity: p.quantity - 1 },
                ...paneObj.content.slice(idxP + 1),
            ];
            return {
                ...state,
                panes: [
                    ...state.panes.slice(0, idxPane),
                    {
                        ...paneObj,
                        content: [...newContentResult],
                        statusKitchen: false,
                    },
                    ...state.panes.slice(idxPane + 1),
                ],
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                panes: state.panes.map((item) =>
                    item.table._id === action.payload.activeKey
                        ? {
                              ...item,
                              content: item.content.filter(
                                  (p) => p._id !== action.payload.product._id
                              ),
                              statusKitchen: false,
                          }
                        : item
                ),
            };
        // * Danh sách hoá đơn chưa trả
        case GET_INVOICE_NOT_PAYMENT:
            const { invoice, detailInvoice } = action.payload;
            const newPanes = generatorListInvoice(invoice, detailInvoice);
            return {
                ...state,
                panes: newPanes,
                activeKey: newPanes.length !== 0 ? newPanes[0].table._id : "",
            };
        case REQUIREMENT_PAYMENT:
            return {
                ...state,
                panes: [
                    ...state.panes.map((item) =>
                        item.table._id !== action.payload.tableId
                            ? { ...item }
                            : {
                                  ...item,
                                  status: true,
                                  moneyPay: action.payload.moneyPay,
                                  payment: action.payload.payment,
                                  userId: action.payload.userId,
                              }
                    ),
                ],
            };
        case UPDATE_STATUS_KITCHEN_TAB:
            return {
                ...state,
                panes: state.panes.map((item) =>
                    item.table._id === action.payload
                        ? { ...item, statusKitchen: true }
                        : item
                ),
            };
        case ENABLE_STATUS_NOTE:
            return {
                ...state,
                panes: state.panes.map((item) =>
                    item.table._id === action.payload.tableId
                        ? {
                              ...item,
                              content: item.content.map((p) =>
                                  p._id === action.payload.product._id
                                      ? { ...action.payload.product }
                                      : { ...p }
                              ),
                          }
                        : item
                ),
            };
        case NOTE_PRODUCT:
            return {
                ...state,
                panes: state.panes.map((item) =>
                    item.table._id === action.payload.tableId
                        ? {
                              ...item,
                              content: item.content.map((p) =>
                                  p._id === action.payload.product._id
                                      ? { ...action.payload.product }
                                      : { ...p }
                              ),
                          }
                        : item
                ),
            };
        case UPDATE_STATUS_PRODUCT:
            return {
                ...state,
                panes: state.panes.map((item) =>
                    item.table._id === action.payload
                        ? {
                              ...item,
                              content: item.content.map((item) => {
                                  return { ...item, status: true };
                              }),
                          }
                        : item
                ),
            };
        case CLEAR_NOTE_PRODUCT:
            return {
                ...state,
                panes: state.panes.map((item) =>
                    item.table._id === action.payload
                        ? {
                              ...item,
                              content: item.content.map((p) => {
                                  return { ...p, note: "" };
                              }),
                          }
                        : item
                ),
            };
        default:
            return state;
    }
}
