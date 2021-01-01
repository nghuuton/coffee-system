import {
    ADD_NEW_PRODUCT,
    GET_LIST_PRODUCT,
    REMOVE_PRODUCT,
    REMOVE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT,
    UPLOAD_EXCEL_PRODUCT,
} from "../actions/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = { listProduct: [] }, action) {
    switch (action.type) {
        case GET_LIST_PRODUCT:
            return { ...state, listProduct: action.payload };
        case UPDATE_PRODUCT:
            const newListProduct = state.listProduct.map((item) =>
                item._id !== action.payload._id
                    ? { ...item }
                    : { ...item, ...action.payload }
            );
            return {
                ...state,
                listProduct: newListProduct,
            };
        case ADD_NEW_PRODUCT:
            return {
                ...state,
                listProduct: [...state.listProduct, action.payload],
            };
        case REMOVE_PRODUCT:
            return {
                ...state,
                // listProduct: [
                //     ...state.listProduct.filter((item) => item._id !== action.payload),
                // ],
            };
        case REMOVE_PRODUCT_SUCCESS:
            return {
                ...state,
                listProduct: [
                    ...state.listProduct.filter((item) => item._id !== action.payload),
                ],
            };
        case UPLOAD_EXCEL_PRODUCT:
            return {
                ...state,
                listProduct: action.payload,
            };
        default:
            return state;
    }
}
