import { combineReducers } from "redux";
import userReducer from "./UserModule";
import productReducer from "./ProductModule";
import questionReducer from "./QuestionModule";
import answerReducer from "./AnswerModule";

const rootReducer = combineReducers({
	userReducer,
	productReducer,
	questionReducer,
	answerReducer
});

export default rootReducer;