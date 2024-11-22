import { combineReducers } from "redux";
import userReducer from "./UserModule";
import bannerReducer from "./BannerModule";

const rootReducer = combineReducers({
	userReducer,
	bannerReducer
});

export default rootReducer;
