import {
    ADD_NEW_TAB,
    ADD_PRODUCT,
    CHANGE_TAB_TABLE,
    DECREMENT_PRODUCT,
    DELETE_PRODUCT,
    GET_INVOICE_NOT_PAYMENT,
    INCREMENT_PRODUCT,
    REMOVE_TAB,
} from "../actions/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = { panes: [] }, action) {
    switch (action.type) {
        case ADD_NEW_TAB:
            return { ...state, panes: [...state.panes, action.payload] };
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
                        content: [
                            ...result.content,
                            { ...action.payload.product, quantity: 1 },
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
                { ...product, quantity: pane.content[indexProduct].quantity + 1 },
                ...pane.content.slice(indexProduct + 1),
            ];

            return {
                ...state,
                panes: [
                    ...state.panes.slice(0, indexPane),
                    {
                        ...pane,
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
                    },
                    ...state.panes.slice(idxPane + 1),
                ],
            };
        case DELETE_PRODUCT:
            const { activeKey: activePaneKey, product: productRemove } = action.payload;
            const paneOfProduct = state.panes.find(
                (item) => item.table._id === activePaneKey
            );
            const idxPaneProduct = state.panes.indexOf(paneOfProduct);
            const newContentOfPane = paneOfProduct.content.filter(
                (item) => item._id !== productRemove._id
            );
            return {
                ...state,
                panes: [
                    ...state.panes.slice(0, idxPaneProduct),
                    { ...paneOfProduct, content: [...newContentOfPane] },
                    ...state.panes.slice(idxPaneProduct + 1),
                ],
            };
        // * Danh sách hoá đơn chưa trả
        case GET_INVOICE_NOT_PAYMENT:
            const { invoice, detailInvoice } = action.payload;
            let newPanes = [];
            if (invoice.length !== 0) {
                newPanes = invoice.map((item, index) => {
                    return {
                        title: item.ownerTable.name,
                        content:
                            item.detailInvoice._id === detailInvoice[index]._id
                                ? detailInvoice[index].product.map((item) => {
                                      return {
                                          quantity: item.quantity,
                                          ...item._id,
                                          note: "",
                                      };
                                  })
                                : [],
                        table: item.ownerTable,
                        totalPayment: detailInvoice[index].totalPayment,
                        intoMoney: detailInvoice[index].intoMoney,
                        percent: item.percent,
                    };
                });
            }
            return {
                ...state,
                panes: newPanes,
                activeKey: newPanes.length !== 0 ? newPanes[0].table._id : "",
            };

        default:
            return state;
    }
}
