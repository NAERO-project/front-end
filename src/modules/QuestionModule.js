import { createActions, handleActions } from "redux-actions";

// 초기값
const initialState = {
	questions: [],
	questionDetail: null,
	pageInfo: { pageEnd: 0 },
};

export const GET_QUESTIONS = "GET_QUESTIONS";
export const GET_QUESTION_DETAIL = "GET_QUESTION_DETAIL";
export const POST_QUESTION = "POST_QUESTION";
export const PUT_QUESTION = "PUT_QUESTION";
export const DELETE_QUESTION = "DELETE_QUESTION";

const actions = createActions({
	[GET_QUESTIONS]: () => {},
	[GET_QUESTION_DETAIL]: () => {},
	[POST_QUESTION]: () => {},
	[PUT_QUESTION]: () => {},
	[DELETE_QUESTION]: () => {},
});

// 리듀서
const questionReducer = handleActions(
	{
		[GET_QUESTIONS]: (state, { payload }) => {
			return payload;
		},
		[GET_QUESTION_DETAIL]: (state, { payload }) => {
			return payload;
		},
		[POST_QUESTION]: (state, { payload }) => {
			return payload;
		},
		[PUT_QUESTION]: (state, { payload }) => {
			return payload;
		},
		[DELETE_QUESTION]: (state, { payload }) => {
			return payload;
		},
	},
	initialState
);

export default questionReducer;
