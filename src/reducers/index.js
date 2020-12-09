import { combineReducers } from "redux";
import tabs from "./tabReducer";
import tables from "./tableReducer";
import products from "./productReducer";

const rootReducer = combineReducers({ tabs, tables, products });

export default rootReducer;
