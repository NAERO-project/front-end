import { combineReducers } from "redux";
import userReducer from "./UserModule";
import productReducer from "./ProductModule";
import dashboardReducer from "./DashboardModule";

const rootReducer = combineReducers({
  userReducer,
  productReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;
