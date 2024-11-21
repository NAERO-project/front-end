import { combineReducers } from "redux";
import userReducer from "./UserModule";
import productReducer from "./ProductModule";
import orderReducer from "./OrderModule";

const rootReducer = combineReducers({
	userReducer,
	productReducer,
	orderReducer
});

export default rootReducer;
