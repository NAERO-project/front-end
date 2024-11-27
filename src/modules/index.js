import { combineReducers } from "redux";
import userReducer from "./UserModule";
import productReducer from "./ProductModule";
import productProducerReducer from "./ProductProducerModule";
import authReducer from "./AuthModule";
import dashboardReducer from "./DashboardModule";
import couponReducer from "./CouponModule";
import { largeCategoryReducer, mediumCategoryReducer } from "./CategoryModule";
import orderReducer from "./OrderModule";
import bannerReducer from "./BannerModule";
import paymentReducer from "./PaymentModule";
import shippingReducer from "./ShippingModule";

const rootReducer = combineReducers({
  userReducer,
  productReducer,
  largeCategoryReducer,
  mediumCategoryReducer,
  orderReducer,
  couponReducer,
  bannerReducer,
  productProducerReducer,
  authReducer,
  dashboard: dashboardReducer,
  paymentReducer,
  shipping: shippingReducer,
});

export default rootReducer;
