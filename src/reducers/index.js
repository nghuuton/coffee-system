import { combineReducers } from "redux";
import tabs from "./tabReducer";
import tables from "./tableReducer";
import products from "./productReducer";
import account from "./accountReducer";
import invoice from "./invoiceReducer";
import types from "./typeReducer";
import comoditys from "./comodityReducer";
import supplier from "./supplierReducer";
import invoiceissues from "./invoiceIssuesReducer";
import staff from "./staffReducer";

const rootReducer = combineReducers({
    tabs,
    tables,
    products,
    account,
    invoice,
    types,
    comoditys,
    supplier,
    invoiceissues,
    staff,
});

export default rootReducer;
