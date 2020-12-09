import { combineReducers } from "redux";
import tabs from "./tabReducer";
import tables from "./tableReducer";
import products from "./productReducer";
import account from "./accountReducer";

const rootReducer = combineReducers({ tabs, tables, products, account });

export default rootReducer;
