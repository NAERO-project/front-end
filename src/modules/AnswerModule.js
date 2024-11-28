import { createActions, handleActions } from 'redux-actions';

// 초기값
const initialState = {
	answers: [],
	answersDetail: null,
	pageInfo: { pageEnd: 0 },
};

export const GET_ANSWERS = "GET_ANSWERS";
export const GET_ANSWER_DETAIL = "GET_ANSWER_DETAIL";
export const GET_ALL_QUESTIONS = "GET_ALL_QUESTIONS";
export const POST_ANSWER = "POST_ANSWER";
export const PUT_ANSWER = "PUT_ANSWER";
export const DELETE_ANSWER = "DELETE_ANSWER";

const actions = createActions({
    [GET_ANSWERS]: () => {},
    [GET_ALL_QUESTIONS]: () => {},
    [GET_ANSWER_DETAIL]: () => {},
    [POST_ANSWER]: () => {},
    [PUT_ANSWER]: () => {},
    [DELETE_ANSWER]: () => {},
});

// 리듀서
const answerReducer = handleActions(
	{
		[GET_ANSWERS]: (state, { payload }) => {
			return payload;
		},
		[GET_ALL_QUESTIONS]: (state, { payload }) => {
			return payload;
		},
		[GET_ANSWER_DETAIL]: (state, { payload }) => {
			return payload;
		},
		[POST_ANSWER]: (state, { payload }) => {
			return payload;
		},
		[PUT_ANSWER]: (state, { payload }) => {
			return payload;
		},
		[DELETE_ANSWER]: (state, { payload }) => {
			return payload;
		},
	},
	initialState
);

export default answerReducer;
