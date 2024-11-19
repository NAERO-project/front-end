import { combineReducers } from "redux";
import userReducer from "./UserModule";
import productReducer from "./ProductModule";

const rootReducer = combineReducers({
	userReducer,
	productReducer
});

export default rootReducer;
