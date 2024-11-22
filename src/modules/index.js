import { combineReducers } from "redux";
import userReducer from "./UserModule";
import authReducer from "./AuthModule";

const rootReducer = combineReducers({
	userReducer,
	authReducer,
});

export default rootReducer;
