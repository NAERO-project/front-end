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
import cartReducer from "./CartModule";
import shippingReducer from "./ShippingModule";
import { manageDetailReducer, manageTableReducer } from "./ManageModule";
import questionReducer from "./QuestionModule";
import answerReducer from "./AnswerModule";
import reviewReducer from "./ReviewModule";

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
  cartReducer,
    questionReducer,
    answerReducer,
    reviewReducer,
  shipping: shippingReducer,
    manageTableReducer,
    manageDetailReducer
});

export default rootReducer;
