import { combineReducers } from "redux";
import userReducer from "./UserModule";
import productReducer from "./ProductModule";
<<<<<<<<< Temporary merge branch 1
import couponReducer from "./CouponModule";
import {largeCategoryReducer, mediumCategoryReducer}  from "./CategoryModule";
import orderReducer from "./OrderModule";
import bannerReducer from "./BannerModule";
import productProducerReducer from "./ProductProducerModule";
import authReducer from "./AuthModule";
import dashboardReducer from "./DashboardModule";

const rootReducer = combineReducers({
  userReducer,
  productReducer,
  dashboard: dashboardReducer,
	largeCategoryReducer,
	mediumCategoryReducer,
	orderReducer,
	couponReducer,
	bannerReducer,
	productProducerReducer,
    authReducer,
  	dashboard: dashboardReducer,
});

export default rootReducer;
