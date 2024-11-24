import { combineReducers } from "redux";
import userReducer from "./UserModule";
import productReducer from "./ProductModule";
import couponReducer from "./CouponModule";
import {largeCategoryReducer, mediumCategoryReducer}  from "./CategoryModule";
import orderReducer from "./OrderModule";
import bannerReducer from "./BannerModule";
import authReducer from "./AuthModule";

const rootReducer = combineReducers({
	userReducer,
	productReducer,
	largeCategoryReducer,
	mediumCategoryReducer,
	orderReducer,
	couponReducer,
	bannerReducer,
    authReducer,
});

export default rootReducer;
