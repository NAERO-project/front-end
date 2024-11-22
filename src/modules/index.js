import { combineReducers } from "redux";
import userReducer from "./UserModule";
import productReducer from "./ProductModule";
import {largeCategoryReducer, mediumCategoryReducer}  from "./CategoryModule";
import orderReducer from "./OrderModule";

const rootReducer = combineReducers({
	userReducer,
	productReducer,
	largeCategoryReducer,
	mediumCategoryReducer,
	orderReducer
});

export default rootReducer;
