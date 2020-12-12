import { combineReducers } from "redux";
import tabs from "./tabReducer";
import tables from "./tableReducer";
import products from "./productReducer";
import account from "./accountReducer";
import invoice from "./invoiceReducer";

const rootReducer = combineReducers({ tabs, tables, products, account, invoice });

export default rootReducer;
