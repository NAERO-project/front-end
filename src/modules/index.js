import { combineReducers } from "redux";
import userReducer from "./UserModule";
import productReducer from "./ProductModule";
import authReducer from "./AuthModule";

const rootReducer = combineReducers({
	userReducer,
	productReducer,
	authReducer,
});

export default rootReducer;
