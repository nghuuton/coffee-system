import { combineReducers } from "redux";
import tabs from "./tabReducer";
import tables from "./tableReducer";

const rootReducer = combineReducers({ tabs, tables });

export default rootReducer;
