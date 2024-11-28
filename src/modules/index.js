import { combineReducers } from "redux";
import userReducer from "./UserModule";
import productReducer from "./ProductModule";
import authReducer from "./AuthModule";
import { manageDetailReducer, manageTableReducer } from "./ManageModule";

const rootReducer = combineReducers({
	userReducer,
	productReducer,
    authReducer,
    manageTableReducer,
    manageDetailReducer
});

export default rootReducer;
